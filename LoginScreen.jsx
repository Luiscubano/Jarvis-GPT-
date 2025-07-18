import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { USER_PRIMARY_COLOR } from "../constants.js";
const LoginScreen = ({ onLogin, error }) => {
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center h-screen bg-gray-900", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center space-y-2", children: [
      /* @__PURE__ */ jsxDEV("img", { src: "/logo.png", alt: "Jarvis GPT Logo", className: "w-24 h-24 rounded-full" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 17,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-white", children: "Jarvis GPT" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 18,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 16,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "password", className: "text-sm font-medium text-gray-400", children: "Contrase\xF1a Maestra" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 22,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV(LockKeyhole, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 24,
            columnNumber: 28
          }),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              id: "password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: "w-full pl-10 pr-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500",
              placeholder: "Introduce la contrase\xF1a"
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 25,
              columnNumber: 28
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 23,
          columnNumber: 25
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 21,
        columnNumber: 21
      }),
      error && /* @__PURE__ */ jsxDEV("p", { className: "text-red-500 text-sm", children: error }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 36,
        columnNumber: 31
      }),
      /* @__PURE__ */ jsxDEV("button", { type: "submit", className: "w-full px-4 py-2 font-bold text-white rounded-md transition-colors", style: { backgroundColor: USER_PRIMARY_COLOR }, children: "Acceder" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 20,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 15,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 14,
    columnNumber: 9
  });
};
export {
  LoginScreen
};
