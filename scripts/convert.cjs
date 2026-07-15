'use strict';
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = 'D:\\Mostafa Ibrahim';
const TAHSEEL = path.join(BASE, '\u0634\u064a\u062a \u062a\u062d\u0635\u064a\u0644.xlsm');
const INVOICES = path.join(BASE, '\u0628\u064a\u0627\u0646 \u0627\u0633\u0639\u0627\u0631 \u0641\u0648\u0627\u062a\u064a\u0631 \u0627\u0644\u064a\u0648\u0645', '\u0641\u0648\u0627\u062a\u064a\u0631 \u0627\u0644\u064a\u0648\u0645.xlsx');
const OUT = path.join(__dirname, '..', 'public', 'data', 'seed.json');
const DSCRIPT = path.join(__dirname, 'upload-drive.ps1');

function s(v) { return v != null ? String(v).trim() : ''; }
function n(v) { if(v==null||v==='') return 0; const x=typeof v==='number'?v:Number(String(v).replace(/,/g,'')); return isFinite(x)?x:0; }
function norm(t) { var r=t.replace(/\s+/g,' ').trim(); r=r.replace(/[()\[\]\u060C,]/g,''); r=r.replace(/[\u0623\u0625\u0622]/g,'\u0627'); return r; }
const p2 = function(x) { return String(x+1).padStart(2,'0'); };

function loadMap(wb) {
  const ws=wb.Sheets['Master_Data']; if(!ws) return[{},{}];
  const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
  const c2={},n2={};
  for(var r=1;r<rows.length;r++){var c=s(rows[r][0]),nm=s(rows[r][1]); if(c&&nm&&/^\d+$/.test(c)){c2[c]=nm;n2[norm(nm)]=c;n2[nm]=c;}}
  return[c2,n2];
}

function extractCols(wb,n2,c2) {
  const ws=wb.Sheets['cash flow']; const now=new Date();
  if(!ws) return[{},now.getFullYear(),now.getMonth(),now];
  const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
  var y=now.getFullYear(),m=now.getMonth(),sd=now;
  if(rows[1]&&rows[1][2]){var dv=rows[1][2]; if(dv instanceof Date){sd=dv;y=dv.getFullYear();m=dv.getMonth();} else if(typeof dv==='number'&&dv>40000){var dc=XLSX.SSF.parse_date_code(dv);y=dc.y;m=dc.m-1; sd=new Date(dc.y,dc.m-1,dc.d);}}
  const codes={};
  for(var r=4;r<rows.length;r++){var row=rows[r]; if(!row)continue; var nm2=s(row[2]),pd=n(row[4]); if(!nm2||pd<=0)continue;
    var nn=norm(nm2); var cd=n2[nn]||n2[nm2];
    if(!cd) { var ks=Object.keys(n2); for(var i=0;i<ks.length;i++){var kn=ks[i];if(kn.length>5&&(kn.indexOf(nn)>=0||nn.indexOf(kn)>=0)){cd=n2[kn];break;}} }
    if(!cd){var mx=nn.match(/^(\d{3,5})/);if(mx&&c2[mx[1]])cd=mx[1];}
    if(cd){if(!codes[cd])codes[cd]=Array(12).fill(0);codes[cd][m]+=pd;}
  }
  return[codes,y,m,sd];
}

function extractSales(wb) {
  const ws=wb.Sheets[wb.SheetNames[0]]; const now=new Date();
  if(!ws) return[0,now.getFullYear(),now.getMonth(),0,now];
  const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
  var ds=s(rows[1]?rows[1][0]:''); var y=now.getFullYear(),m=now.getMonth(),sd=now;
  var mx=ds.match(/(\d{4})-(\d{2})-(\d{2})/); if(mx){y=parseInt(mx[1]);m=parseInt(mx[2])-1;sd=new Date(y,m,parseInt(mx[3]));}
  var t=0,it=0;
  for(var r=3;r<rows.length;r++){var row=rows[r]; if(!row||!s(row[0]))continue; t+=(n(row[5])>0?n(row[5])-n(row[6]):n(row[3])*n(row[4])); it++;}
  return[it,y,m,t,sd];
}

function build(ex,col,cy,cm,sy,sm,st,c2){
  var seed=ex?JSON.parse(JSON.stringify(ex)):{sales:[],collections:[],meta:{}};
  var m2=seed.meta||{}; seed.meta=m2; var yrs=new Set(m2.years||[]);
  var cl={}; (seed.collections||[]).forEach(function(r,i){cl[norm(r.name||'')+'::'+r.year]=i;});
  var codes=Object.keys(col);
  for(var i=0;i<codes.length;i++){var code=codes[i]; var m=col[code];
    var nm=c2[code]||code,nk=norm(nm),k=nk+'::'+cy;
    if(cl.hasOwnProperty(k)){var em=seed.collections[cl[k]].monthly; for(var j=0;j<12;j++)em[j]+=m[j]; seed.collections[cl[k]].total=em.reduce(function(a,b){return a+b;},0);}
    else seed.collections.push({name:nm,nameKey:nk,year:cy,monthly:m,total:m.reduce(function(a,b){return a+b;},0)});
    yrs.add(cy);
  }
  if(st>0){var dc='DAY-'+sy+p2(sm),ms=Array(12).fill(0);ms[sm]=st;
    var sl={}; (seed.sales||[]).forEach(function(r,i){sl[r.code+'::'+r.year]=i;});
    var k2=dc+'::'+sy;
    if(sl.hasOwnProperty(k2)){var em2=seed.sales[sl[k2]].monthly;em2[sm]+=st;seed.sales[sl[k2]].total=em2.reduce(function(a,b){return a+b;},0);}
    else seed.sales.push({code:dc,name:'\u0645\u0628\u064a\u0639\u0627\u062a '+sy+'-'+p2(sm),nameKey:norm('\u0645\u0628\u064a\u0639\u0627\u062a '+sy+'-'+p2(sm)),year:sy,monthly:ms,total:st});
    yrs.add(sy);
  }
  var sry=Array.from(yrs).sort(function(a,b){return a-b;});
  m2.years=sry.length?sry:[2024,2025,2026];
  m2.currentYear=Math.max(new Date().getFullYear(),sry.length?sry[sry.length-1]:2026);
  m2.partialMonths=m2.partialMonths||{}; m2.partialMonths[String(new Date().getFullYear())]=new Date().getMonth()+1;
  m2.lastUpdated=new Date().toISOString().split('T')[0];
  return seed;
}

function main(){
  var t0=Date.now();
  console.log('==================================================');
  console.log('  Excel -> seed.json | READ-ONLY');
  console.log('==================================================');
  if(!fs.existsSync(TAHSEEL)){console.error('ERROR: '+TAHSEEL);process.exit(1);}
  var wb=XLSX.readFile(TAHSEEL,{type:'file'});
  var r1=loadMap(wb); var c2=r1[0],n2=r1[1];
  console.log('  Customers: '+Object.keys(c2).length);
  var r2=extractCols(wb,n2,c2); var col=r2[0],cy=r2[1],cm=r2[2];
  var ct=0; var ck=Object.keys(col); for(var i=0;i<ck.length;i++){var mm=col[ck[i]]; for(var j=0;j<12;j++)ct+=mm[j];}
  console.log('  Cash Flow: '+ck.length+' | '+ct.toLocaleString('en-EG')+' EGP | '+cy+'-'+p2(cm));
  var sy,sm,st;
  if(fs.existsSync(INVOICES)){var wb2=XLSX.readFile(INVOICES,{type:'file'}); var r3=extractSales(wb2); sy=r3[1];sm=r3[2];st=r3[3];
    console.log('  Invoices: '+sy+'-'+p2(sm)+' | '+st.toLocaleString('en-EG')+' EGP');}
  else{sy=new Date().getFullYear();sm=new Date().getMonth();st=0;console.log('  Invoices: not found');}
  var ex=null;
  if(fs.existsSync(OUT)){try{ex=JSON.parse(fs.readFileSync(OUT,'utf-8'));}catch(e){}}
  var seed=build(ex,col,cy,cm,sy,sm,st,c2);
  if(!fs.existsSync(path.dirname(OUT)))fs.mkdirSync(path.dirname(OUT),{recursive:true});
  fs.writeFileSync(OUT,JSON.stringify(seed,null,2),'utf-8');
  console.log('  Output: '+OUT+' ('+(fs.statSync(OUT).size/1024).toFixed(1)+' KB)');
  console.log('  Sales: '+seed.sales.length+' | Collections: '+seed.collections.length);
  try{execSync('powershell -NoProfile -ExecutionPolicy Bypass -File "'+DSCRIPT+'" -FilePath "'+OUT+'"',{stdio:'inherit',timeout:60000});console.log('  Drive: uploaded');}catch(e){console.log('  Drive: rclone N/A');}
  console.log('  Done in '+(Date.now()-t0)+'ms');
  console.log('==================================================');
}
main();
