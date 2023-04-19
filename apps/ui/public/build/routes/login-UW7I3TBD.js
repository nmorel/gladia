import {
  Form,
  Link,
  useNavigation
} from "/build/_shared/chunk-574LMNZF.js";
import {
  __toESM,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-G2RR7455.js";

// app/routes/login.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var meta = () => {
  return [{ title: "Sign in" }];
};
function SignIn() {
  const transition = useNavigation();
  const isSubmitting = transition.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-screen h-screen max-w-xs mx-auto flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", action: "/login", className: "w-full flex flex-col gap-5", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-center text-3xl mt-5", children: "Sign in to Gladia" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 29,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-control w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "label", htmlFor: "email", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "label-text", children: "Email:" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 33,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "input",
        {
          id: "email",
          name: "email",
          type: "email",
          placeholder: "Enter your email",
          required: true,
          disabled: isSubmitting,
          className: "input input-sm input-accent w-full"
        },
        void 0,
        false,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 35,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 31,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-control w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "label", htmlFor: "password", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "label-text", children: "Password:" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 48,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "input",
        {
          id: "password",
          name: "password",
          type: "password",
          placeholder: "Enter your password",
          required: true,
          disabled: isSubmitting,
          className: "input input-sm input-accent w-full"
        },
        void 0,
        false,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 50,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "btn btn-primary", type: "submit", disabled: isSubmitting, children: "Sign in" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 62,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 61,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "No account?\xA0" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 68,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/register", className: "underline", children: "Create one for free" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 67,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login.tsx",
    lineNumber: 28,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/login.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}
export {
  SignIn as default,
  meta
};
//# sourceMappingURL=/build/routes/login-UW7I3TBD.js.map
