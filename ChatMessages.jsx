import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Bot, User, Download } from "lucide-react";
import { USER_PRIMARY_COLOR, AI_BUBBLE_COLOR, DOWNLOAD_BG_COLOR } from "../constants.js";
const ChatMessages = ({ messages, isLoading, messagesEndRef }) => {
  return /* @__PURE__ */ jsxDEV("main", { className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar", children: [
    messages.map((msg, index) => /* @__PURE__ */ jsxDEV("div", { className: `flex items-start gap-4 max-w-4xl mx-auto ${msg.role === "user" ? "justify-end" : "justify-start"}`, children: [
      msg.role === "assistant" && /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", style: { backgroundColor: AI_BUBBLE_COLOR }, children: /* @__PURE__ */ jsxDEV(Bot, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 10,
        columnNumber: 180
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 10,
        columnNumber: 50
      }),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `chat-message p-4 rounded-2xl ${msg.role === "user" ? "rounded-br-none text-white" : "rounded-bl-none text-white"}`,
          style: { backgroundColor: msg.role === "user" ? USER_PRIMARY_COLOR : AI_BUBBLE_COLOR },
          children: msg.type === "image" ? /* @__PURE__ */ jsxDEV("img", { src: msg.content, alt: "Generated image", className: "rounded-lg max-w-sm" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 14,
            columnNumber: 30
          }) : msg.type === "download" ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 p-3 rounded-lg", style: { backgroundColor: DOWNLOAD_BG_COLOR }, children: [
            /* @__PURE__ */ jsxDEV(Download, { size: 24 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 17,
              columnNumber: 33
            }),
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxDEV("a", { href: msg.content.url, download: msg.content.filename, className: "font-medium hover:underline", children: msg.content.filename }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 19,
                columnNumber: 37
              }),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-gray-400", children: "Archivo ZIP listo para descargar" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 22,
                columnNumber: 37
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 18,
              columnNumber: 33
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 16,
            columnNumber: 29
          }) : /* @__PURE__ */ jsxDEV("p", { className: "whitespace-pre-wrap", children: msg.content }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 26,
            columnNumber: 29
          })
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 11,
          columnNumber: 21
        }
      ),
      msg.role === "user" && /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", style: { backgroundColor: USER_PRIMARY_COLOR }, children: /* @__PURE__ */ jsxDEV(User, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 29,
        columnNumber: 178
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 29,
        columnNumber: 45
      })
    ] }, index, true, {
      fileName: "<stdin>",
      lineNumber: 9,
      columnNumber: 17
    })),
    isLoading && /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-4 max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", style: { backgroundColor: AI_BUBBLE_COLOR }, children: /* @__PURE__ */ jsxDEV(Bot, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 35,
        columnNumber: 151
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 35,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl rounded-bl-none", style: { backgroundColor: AI_BUBBLE_COLOR }, children: /* @__PURE__ */ jsxDEV("div", { className: "typing-indicator", children: [
        /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 37,
          columnNumber: 59
        }),
        /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 37,
          columnNumber: 72
        }),
        /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 37,
          columnNumber: 85
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 36,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 34,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { ref: messagesEndRef }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 41,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 7,
    columnNumber: 9
  });
};
export {
  ChatMessages
};
