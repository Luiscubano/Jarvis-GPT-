import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { X, Plus, Trash2, FolderPlus } from "lucide-react";
import { SIDEBAR_BG_COLOR, ACTIVE_ITEM_BG_COLOR } from "../constants.js";
const ConversationsSidebar = ({
  isOpen,
  onClose,
  conversations,
  onLoad,
  onDelete,
  onNew,
  onSave,
  currentId
}) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-40 md:z-auto", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black opacity-50 md:hidden", onClick: onClose }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 20,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: `fixed top-0 left-0 z-50 flex flex-col h-full w-72 text-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
        style: { backgroundColor: SIDEBAR_BG_COLOR },
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-gray-700 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-semibold", children: "Conversaciones" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 28,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("button", { onClick: onClose, className: "p-1 rounded-full hover:bg-gray-700 md:hidden", children: /* @__PURE__ */ jsxDEV(X, { size: 20 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 30,
              columnNumber: 25
            }) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 29,
              columnNumber: 22
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 27,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "p-2 space-y-2 border-b border-gray-700", children: [
            /* @__PURE__ */ jsxDEV("button", { onClick: onNew, className: "w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md hover:bg-gray-700 transition-colors", children: [
              /* @__PURE__ */ jsxDEV(Plus, { size: 18 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 35,
                columnNumber: 25
              }),
              "Nueva Conversaci\xF3n"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 34,
              columnNumber: 21
            }),
            /* @__PURE__ */ jsxDEV("button", { onClick: onSave, className: "w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-md hover:bg-gray-700 transition-colors", children: [
              /* @__PURE__ */ jsxDEV(FolderPlus, { size: 18 }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 39,
                columnNumber: 25
              }),
              "Guardar Conversaci\xF3n"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 38,
              columnNumber: 21
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 33,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("nav", { className: "flex-1 overflow-y-auto custom-scrollbar p-2", children: conversations.slice().reverse().map((conv) => /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: `group flex items-center justify-between p-2 rounded-md cursor-pointer text-sm my-1`,
              style: { backgroundColor: conv.id === currentId ? ACTIVE_ITEM_BG_COLOR : "transparent" },
              onClick: () => onLoad(conv.id),
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "truncate flex-1 hover:text-gray-200", children: conv.title }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 49,
                  columnNumber: 29
                }),
                /* @__PURE__ */ jsxDEV("button", { onClick: (e) => {
                  e.stopPropagation();
                  onDelete(conv.id);
                }, className: "opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/50 transition-opacity ml-2", children: /* @__PURE__ */ jsxDEV(Trash2, { size: 16 }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 51,
                  columnNumber: 33
                }) }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 50,
                  columnNumber: 29
                })
              ]
            },
            conv.id,
            true,
            {
              fileName: "<stdin>",
              lineNumber: 45,
              columnNumber: 25
            }
          )) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 43,
            columnNumber: 17
          })
        ]
      },
      void 0,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 23,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 18,
    columnNumber: 9
  });
};
export {
  ConversationsSidebar
};
