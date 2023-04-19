import {
  Form,
  Link,
  useNavigation
} from "/build/_shared/chunk-574LMNZF.js";
import {
  __toESM,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-G2RR7455.js";

// app/routes/register.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var meta = () => {
  return [{ title: "Sign up" }];
};
function SignUp() {
  const transition = useNavigation();
  const isSubmitting = transition.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-screen h-screen max-w-xs mx-auto flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", action: "/login", className: "w-full flex flex-col gap-5", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-center text-3xl mt-5", children: "Sign in to Gladia" }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-control w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "label", htmlFor: "email", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "label-text", children: "Email:" }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 23,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 22,
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
          fileName: "app/routes/register.tsx",
          lineNumber: 25,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/routes/register.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-control w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "label", htmlFor: "password", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "label-text", children: "Password:" }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 38,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 37,
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
          fileName: "app/routes/register.tsx",
          lineNumber: 40,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/routes/register.tsx",
      lineNumber: 36,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "btn btn-primary", type: "submit", disabled: isSubmitting, children: "Sign in" }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 52,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/register.tsx",
      lineNumber: 51,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "No account? \xA0" }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/register", children: "Create an account" }, void 0, false, {
        fileName: "app/routes/register.tsx",
        lineNumber: 59,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/register.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/register.tsx",
    lineNumber: 18,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/register.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}
export {
  SignUp as default,
  meta
};
//# sourceMappingURL=/build/routes/register-J7VO7YXT.js.map
