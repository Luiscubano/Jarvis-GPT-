import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Menu, LogOut } from "lucide-react";
const Header = ({ onToggleSidebar, onLogout }) => {
  return /* @__PURE__ */ jsxDEV("header", { className: "flex items-center p-4 bg-gray-800 border-b border-gray-700 shadow-md flex-shrink-0", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onToggleSidebar, className: "p-2 mr-2 rounded-full hover:bg-gray-700 md:hidden", children: /* @__PURE__ */ jsxDEV(Menu, { size: 24 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 8,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 7,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("img", { src: "/logo.png", alt: "Logo", className: "w-10 h-10 rounded-full mr-4" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 10,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("h1", { className: "text-xl font-bold", children: "Jarvis GPT" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 11,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-grow" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 12,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("button", { onClick: onLogout, title: "Salir", className: "p-2 rounded-full hover:bg-gray-700", children: /* @__PURE__ */ jsxDEV(LogOut, { size: 22 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 14,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 13,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 6,
    columnNumber: 9
  });
};
export {
  Header
};
