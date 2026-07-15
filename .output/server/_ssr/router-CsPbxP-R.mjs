import { c as createRouter$1, a as createRootRouteWithContext, H as HeadContent, S as Scripts, O as Outlet, b as createFileRoute, l as lazyRouteComponent, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { S as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-DLvwonDX.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex min-h-screen items-center justify-center bg-background px-4",
      dir: "rtl",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "الصفحة غير موجودة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/",
            className: "mt-6 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground",
            children: "الرئيسية"
          }
        )
      ] })
    }
  );
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "root" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex min-h-screen items-center justify-center bg-background px-4",
      dir: "rtl",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "حدث خطأ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              router2.invalidate();
              reset();
            },
            className: "mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground",
            children: "إعادة المحاولة"
          }
        )
      ] })
    }
  );
}
const Route$3 = createRootRouteWithContext()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "لوحة التحكم التنفيذية - المبيعات والتحصيل" },
        {
          name: "description",
          content: "لوحة تنفيذية لمتابعة المبيعات والتحصيل اليومي"
        },
        {
          property: "og:title",
          content: "لوحة التحكم التنفيذية - المبيعات والتحصيل"
        },
        {
          name: "twitter:title",
          content: "لوحة التحكم التنفيذية - المبيعات والتحصيل"
        },
        {
          property: "og:description",
          content: "لوحة تنفيذية لمتابعة المبيعات والتحصيل اليومي"
        },
        {
          name: "twitter:description",
          content: "لوحة تنفيذية لمتابعة المبيعات والتحصيل اليومي"
        },
        {
          property: "og:image",
          content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/249baf60-205a-4646-88db-009df4be41db/id-preview-d588764e--f2d6f571-39ff-440d-b006-dd759432e6f6.lovable.app-1781360309720.png"
        },
        {
          name: "twitter:image",
          content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/249baf60-205a-4646-88db-009df4be41db/id-preview-d588764e--f2d6f571-39ff-440d-b006-dd759432e6f6.lovable.app-1781360309720.png"
        },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:type", content: "website" }
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous"
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
        }
      ]
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent
  }
);
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "ar", dir: "rtl", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');}catch(e){}`
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$3.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center", richColors: true })
  ] });
}
const $$splitComponentImporter$2 = () => import("./history-CkOo-JHp.mjs");
const Route$2 = createFileRoute("/history")({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard-D9QrhFwM.mjs");
const Route$1 = createFileRoute("/dashboard")({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  validateSearch: (search) => {
    return {
      reportId: search.reportId
    };
  }
});
const $$splitComponentImporter = () => import("./index-BTU5dmpx.mjs");
const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({
      to: "/dashboard"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const HistoryRoute = Route$2.update({
  id: "/history",
  path: "/history",
  getParentRoute: () => Route$3
});
const DashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$3
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute,
  HistoryRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
function createRouter() {
  const queryClient = new QueryClient();
  return createRouter$1({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent"
  });
}
const getRouter = createRouter;
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRouter,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  router as r
};
