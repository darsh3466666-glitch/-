/**
 * Google Apps Script — تشغيل 24 ساعة
 * ==================================
 * يقرأ Excel من Drive → يحوّل لـ seed.json → يحفظ في dashboard-data
 * يعمل على سيرفرات جوجل — مش محتاج جهازك يكون شغّال
 *
 * الإعداد (مرة واحدة):
 *   1. الصق الكود ده في script.google.com > New Project
 *   2. من القائمة: Resources (Services) > + > Drive API (v2) > Add
 *   3. من المنسدلة فوق: اختر updateSeed ثم اضغط ▶️ Run
 *   4. وافق على الأذونات
 *   5. من القائمة اليسرى: Triggers (⏰) > Add Trigger:
 *      - Function: updateSeed
 *      - Time-driven > Hour timer > Every hour
 *      - Save
 */

const FOLDER_NAME = 'dashboard-data';
const SEED_NAME = 'seed.json';

function s(v) { return v != null ? String(v).trim() : ''; }
function n(v) {
  if (v == null || v === '') return 0;
  if (typeof v === 'number') return isNaN(v) ? 0 : v;
  return Number(String(v).replace(/,/g, '')) || 0;
}
function norm(text) {
  let t = text.replace(/\s+/g, ' ').trim();
  t = t.replace(/[()\[\]،,]/g, '');
  t = t.replace(/[أإآ]/g, 'ا');
  return t;
}

// العثور على ملف في Drive
function findFile(name) {
  var files = DriveApp.getFilesByName(name);
  return files.hasNext() ? files.next() : null;
}

// إنشاء/استرجاع مجلد
function getFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}

// تحويل Excel لـ Google Sheets مؤقت
function openAsSheet(file) {
  var blob = file.getBlob();
  var name = '_temp_' + file.getName();
  // Drive API v2: insert spreadsheet
  var resource = { title: name, mimeType: 'application/vnd.google-apps.spreadsheet' };
  var converted = Drive.Files.insert(resource, blob, { convert: true });
  var ss = SpreadsheetApp.openById(converted.id);
  // تنظيف الملف المؤقت بعد الاستخدام
  try { Drive.Files.remove(converted.id); } catch(e) {}
  return ss;
}

// خريطة العملاء من Master_Data
function loadCustomers(sheets) {
  var master = sheets['Master_Data'];
  if (!master) return [{}, {}];
  var data = master.getDataRange().getValues();
  var c2n = {}, n2c = {};
  for (var r = 1; r < data.length; r++) {
    var code = s(data[r][0]), name = s(data[r][1]);
    if (code && name && /^\d+$/.test(code)) {
      c2n[code] = name;
      n2c[norm(name)] = code;
      n2c[name] = code;
    }
  }
  return [c2n, n2c];
}

// استخراج التحصيلات من cash flow
function extractCollections(sheets, n2c, c2n) {
  var cf = sheets['cash flow'];
  if (!cf) return [{}, new Date().getFullYear(), new Date().getMonth()];
  var data = cf.getDataRange().getValues();
  var now = new Date();
  var year = now.getFullYear(), month = now.getMonth();
  
  if (data.length > 1 && data[1].length > 2) {
    var dv = data[1][2];
    if (dv instanceof Date) { year = dv.getFullYear(); month = dv.getMonth(); }
  }
  
  var codes = {};
  for (var r = 4; r < data.length; r++) {
    var row = data[r];
    if (!row || row.length < 4) continue;
    var cname = s(row[2]), paid = n(row[4]);
    if (!cname || paid <= 0) continue;
    
    var nn = norm(cname);
    var code = n2c[nn] || n2c[cname];
    
    if (!code) {
      var keys = Object.keys(n2c);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].length > 5 && (keys[i].indexOf(nn) >= 0 || nn.indexOf(keys[i]) >= 0)) {
          code = n2c[keys[i]]; break;
        }
      }
    }
    if (!code) {
      var m = nn.match(/^(\d{3,5})/);
      if (m && c2n[m[1]]) code = m[1];
    }
    
    if (code) {
      if (!codes[code]) codes[code] = [];
      for (var j = 0; j < 12; j++) codes[code][j] = codes[code][j] || 0;
      codes[code][month] += paid;
    }
  }
  return [codes, year, month];
}

// استخراج المبيعات من فواتير اليوم
function extractSales(ss) {
  var ws = ss.getSheets()[0];
  if (!ws) return [new Date().getFullYear(), new Date().getMonth(), 0];
  var data = ws.getDataRange().getValues();
  var now = new Date();
  var year = now.getFullYear(), month = now.getMonth();
  
  if (data.length > 1) {
    var ds = s(data[1][0]);
    var m = ds.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (m) { year = parseInt(m[1]); month = parseInt(m[2]) - 1; }
  }
  
  var total = 0;
  for (var r = 3; r < data.length; r++) {
    var row = data[r];
    if (!row || !s(row[0])) continue;
    total += (n(row[5]) > 0 ? n(row[5]) - n(row[6]) : n(row[3]) * n(row[4]));
  }
  return [year, month, total];
}

// بناء seed.json
function buildSeed(existing, collections, colYear, colMonth, salYear, salMonth, stot, c2n) {
  var seed = existing || { sales: [], collections: [], meta: {} };
  if (!seed.meta) seed.meta = {};
  var meta = seed.meta;
  var yrs = {};

  // Collections
  var cl = {};
  (seed.collections || []).forEach(function(r, i) { cl[norm(r.name || '') + '::' + r.year] = i; });
  
  var codes = Object.keys(collections);
  codes.forEach(function(code) {
    var monthly = collections[code];
    // ensure 12 elements
    while (monthly.length < 12) monthly.push(0);
    for (var j = 0; j < 12; j++) monthly[j] = monthly[j] || 0;
    
    var name = c2n[code] || code;
    var nk = norm(name), key = nk + '::' + colYear;
    
    if (cl.hasOwnProperty(key)) {
      var em = seed.collections[cl[key]].monthly;
      for (var j = 0; j < 12; j++) em[j] += monthly[j];
      seed.collections[cl[key]].total = em.reduce(function(a,b){return a+b;}, 0);
    } else {
      seed.collections.push({
        name: name, nameKey: nk, year: colYear,
        monthly: monthly,
        total: monthly.reduce(function(a,b){return a+b;}, 0)
      });
    }
    yrs[colYear] = true;
  });

  // Sales
  if (stot > 0) {
    var dc = 'DAY-' + salYear + String(salMonth + 1).padStart(2, '0');
    var ms = [0,0,0,0,0,0,0,0,0,0,0,0];
    ms[salMonth] = stot;
    
    var sl = {};
    (seed.sales || []).forEach(function(r, i) { sl[r.code + '::' + r.year] = i; });
    var k = dc + '::' + salYear;
    
    if (sl.hasOwnProperty(k)) {
      var em = seed.sales[sl[k]].monthly;
      em[salMonth] += stot;
      seed.sales[sl[k]].total = em.reduce(function(a,b){return a+b;}, 0);
    } else {
      seed.sales.push({
        code: dc,
        name: 'مبيعات ' + salYear + '-' + String(salMonth + 1).padStart(2, '0'),
        nameKey: norm('مبيعات ' + salYear + '-' + String(salMonth + 1).padStart(2, '0')),
        year: salYear, monthly: ms, total: stot
      });
    }
    yrs[salYear] = true;
  }

  var ylist = Object.keys(yrs).map(Number).sort(function(a,b){return a-b;});
  meta.years = ylist.length ? ylist : [2024, 2025, 2026];
  meta.currentYear = Math.max(new Date().getFullYear(), ylist.length ? ylist[ylist.length - 1] : 2026);
  meta.partialMonths = meta.partialMonths || {};
  meta.partialMonths[String(new Date().getFullYear())] = new Date().getMonth() + 1;
  meta.lastUpdated = new Date().toISOString().split('T')[0];
  
  return seed;
}

// حفظ seed.json في Drive
function saveSeed(seed, folder) {
  var content = JSON.stringify(seed, null, 2);
  var files = folder.getFilesByName(SEED_NAME);
  if (files.hasNext()) {
    files.next().setContent(content);
  } else {
    folder.createFile(SEED_NAME, content, 'application/json');
  }
}

// الوظيفة الرئيسية — بتشتغل كل ساعة
function updateSeed() {
  try {
    Logger.log('=== START ===');
    
    // 1. العثور على ملفات Excel
    var tf = findFile('شيت تحصيل.xlsm');
    var inf = findFile('فواتير اليوم.xlsx');
    
    if (!tf) {
      // حاول باسم مختلف
      var allFiles = DriveApp.getFilesByType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      while (allFiles.hasNext()) {
        var f = allFiles.next();
        if (f.getName().indexOf('تحصيل') >= 0) { tf = f; break; }
      }
    }
    
    if (!tf) {
      Logger.log('ERROR: شيت تحصيل not found');
      return;
    }
    
    Logger.log('Found: ' + tf.getName());
    
    // 2. تحويل Excel لـ Google Sheets
    var ss = openAsSheet(tf);
    var sheets = {};
    ss.getSheets().forEach(function(sh) { sheets[sh.getName()] = sh; });
    
    var r1 = loadCustomers(sheets);
    var c2n = r1[0], n2c = r1[1];
    Logger.log('Customers: ' + Object.keys(c2n).length);
    
    // 3. استخراج التحصيلات
    var r2 = extractCollections(sheets, n2c, c2n);
    var collections = r2[0], colYear = r2[1], colMonth = r2[2];
    Logger.log('Collections: ' + Object.keys(collections).length + ' customers');
    
    // 4. استخراج المبيعات
    var salYear = new Date().getFullYear(), salMonth = new Date().getMonth(), stot = 0;
    if (inf) {
      var ss2 = openAsSheet(inf);
      var r3 = extractSales(ss2);
      salYear = r3[0]; salMonth = r3[1]; stot = r3[2];
      Logger.log('Sales: ' + stot + ' EGP');
    }
    
    // 5. تحميل seed.json الحالي
    var folder = getFolder(FOLDER_NAME);
    var existing = null;
    var seedFiles = folder.getFilesByName(SEED_NAME);
    if (seedFiles.hasNext()) {
      try {
        existing = JSON.parse(seedFiles.next().getBlob().getDataAsString());
        Logger.log('Existing: ' + (existing.sales || []).length + ' sales');
      } catch(e) {}
    }
    
    // 6. بناء seed محدث
    var seed = buildSeed(existing, collections, colYear, colMonth, salYear, salMonth, stot, c2n);
    
    // 7. حفظ
    saveSeed(seed, folder);
    Logger.log('DONE: ' + seed.sales.length + ' sales, ' + seed.collections.length + ' collections');
    
  } catch(e) {
    Logger.log('ERROR: ' + e.toString());
  }
}
