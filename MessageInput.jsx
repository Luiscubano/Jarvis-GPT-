import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useRef } from "react";
import { Paperclip, Mic, ImageIcon, SendHorizontal, X } from "lucide-react";
import { VOICE_RECORDING_COLOR } from "../constants.js";
const MessageInput = ({
  input,
  setInput,
  handleSend,
  handleGenerateImage,
  handleListen,
  isListening,
  isLoading,
  uploadedFile,
  setUploadedFile,
  handleFileUpload
}) => {
  const fileInputRef = useRef(null);
  return /* @__PURE__ */ jsxDEV("footer", { className: "p-4 bg-gray-800 border-t border-gray-700", children: [
    uploadedFile && /* @__PURE__ */ jsxDEV("div", { className: "max-w-4xl mx-auto mb-2", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gray-600 px-3 py-1.5 rounded-lg flex items-center justify-between text-sm", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-gray-300", children: [
        "Archivo adjunto: ",
        /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-white", children: uploadedFile.name }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 24,
          columnNumber: 74
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 24,
        columnNumber: 25
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: () => setUploadedFile(null), className: "p-1 rounded-full hover:bg-gray-500", children: /* @__PURE__ */ jsxDEV(X, { size: 16 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 26,
        columnNumber: 29
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 26
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 23,
      columnNumber: 21
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 22,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center max-w-4xl mx-auto bg-gray-700 rounded-xl p-2", children: [
      /* @__PURE__ */ jsxDEV("input", { type: "file", ref: fileInputRef, onChange: handleFileUpload, className: "hidden" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 32,
        columnNumber: 18
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: () => fileInputRef.current.click(), disabled: isLoading || uploadedFile, className: "p-2 text-white rounded-full hover:bg-gray-600 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors", children: /* @__PURE__ */ jsxDEV(Paperclip, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 34,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 33,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: handleListen, className: "p-2 text-white rounded-full hover:bg-gray-600 transition-colors", style: { color: isListening ? VOICE_RECORDING_COLOR : "white" }, children: /* @__PURE__ */ jsxDEV(Mic, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 36,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV(
        "textarea",
        {
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          },
          placeholder: "Escribe tu mensaje a Jarvis...",
          className: "flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none p-2",
          rows: "1"
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 39,
          columnNumber: 17
        }
      ),
      /* @__PURE__ */ jsxDEV("button", { onClick: handleGenerateImage, disabled: isLoading || !input, className: "p-2 text-white rounded-full hover:bg-gray-600 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors", children: /* @__PURE__ */ jsxDEV(ImageIcon, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 48,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 47,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: handleSend, disabled: isLoading || !input && !uploadedFile, className: "p-2 text-white rounded-full hover:bg-gray-600 disabled:text-gray-500 disabled:hover:bg-transparent transition-colors", children: /* @__PURE__ */ jsxDEV(SendHorizontal, { size: 20 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 51,
        columnNumber: 22
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 50,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 31,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 20,
    columnNumber: 9
  });
};
export {
  MessageInput
};
