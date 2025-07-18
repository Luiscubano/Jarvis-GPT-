import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import JSZip from "jszip";
import { LoginScreen } from "./components/LoginScreen.jsx";
import { ConversationsSidebar } from "./components/ConversationsSidebar.jsx";
import { Header } from "./components/Header.jsx";
import { ChatMessages } from "./components/ChatMessages.jsx";
import { MessageInput } from "./components/MessageInput.jsx";
import { CORRECT_PASSWORD, systemPrompt } from "./constants.js";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savedConversations, setSavedConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedConversations") || "[]");
    setSavedConversations(stored);
  }, []);
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "es-ES";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
    };
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    recognitionRef.current = recognition;
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, isLoading]);
  const handleLogin = (password) => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
      handleNewChat();
    } else {
      setLoginError("Contrase\xF1a incorrecta. Int\xE9ntalo de nuevo.");
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginError("");
    setMessages([]);
    setInput("");
    setUploadedFile(null);
    setCurrentConversationId(null);
    setIsSidebarOpen(false);
  };
  const handleNewChat = () => {
    setCurrentConversationId(null);
    setMessages([{
      role: "assistant",
      content: "Bienvenido, Luis. Soy Jarvis. \xBFC\xF3mo puedo ayudarte hoy?"
    }]);
    setIsSidebarOpen(false);
  };
  const handleSaveConversation = () => {
    if (messages.length <= 1) return;
    let updatedConversations;
    if (currentConversationId) {
      updatedConversations = savedConversations.map(
        (conv) => conv.id === currentConversationId ? { ...conv, messages } : conv
      );
    } else {
      const newId = Date.now();
      const title = messages.find((m) => m.role === "user")?.content.substring(0, 40) + "..." || "Nueva Conversaci\xF3n";
      const newConversation = { id: newId, title, messages };
      updatedConversations = [...savedConversations, newConversation];
      setCurrentConversationId(newId);
    }
    setSavedConversations(updatedConversations);
    localStorage.setItem("savedConversations", JSON.stringify(updatedConversations));
  };
  const handleLoadConversation = (id) => {
    const conversation = savedConversations.find((conv) => conv.id === id);
    if (conversation) {
      setMessages(conversation.messages);
      setCurrentConversationId(id);
      setIsSidebarOpen(false);
    }
  };
  const handleDeleteConversation = (id) => {
    const updatedConversations = savedConversations.filter((conv) => conv.id !== id);
    setSavedConversations(updatedConversations);
    localStorage.setItem("savedConversations", JSON.stringify(updatedConversations));
    if (currentConversationId === id) {
      handleNewChat();
    }
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsLoading(true);
    try {
      const url = await websim.upload(file);
      setUploadedFile({ name: file.name, url });
    } catch (error) {
      console.error("File upload error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Lo siento, ha ocurrido un error al subir el archivo." }]);
    } finally {
      setIsLoading(false);
      event.target.value = null;
    }
  };
  const sendMessage = async (messageContent, type = "text") => {
    if (!messageContent.trim() && !uploadedFile) return;
    let contentToSend = messageContent;
    if (uploadedFile) {
      contentToSend = `User has uploaded a file named "${uploadedFile.name}". It is available at this URL: ${uploadedFile.url}

User's message: ${messageContent}`;
      setUploadedFile(null);
    }
    const userMessage = { role: "user", content: contentToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    setInput("");
    let aiResponse;
    try {
      if (type === "text") {
        const conversationHistory = newMessages.slice(-10).map((msg) => ({
          role: msg.role,
          content: msg.content
        }));
        const completion = await websim.chat.completions.create({
          messages: [{ role: "system", content: systemPrompt }, ...conversationHistory]
        });
        const assistantResponseContent = completion.content;
        const jsonMatch = assistantResponseContent.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          try {
            const jsonData = JSON.parse(jsonMatch[1]);
            if (jsonData.action === "generate_zip") {
              const zip = new JSZip();
              jsonData.files.forEach((file) => {
                zip.file(file.name, file.content);
              });
              const blob = await zip.generateAsync({ type: "blob" });
              const url = URL.createObjectURL(blob);
              aiResponse = { role: "assistant", content: { url, filename: jsonData.filename }, type: "download" };
            } else {
              aiResponse = { role: "assistant", content: assistantResponseContent };
            }
          } catch (e) {
            console.error("Failed to parse or handle JSON from AI", e);
            aiResponse = { role: "assistant", content: assistantResponseContent };
          }
        } else {
          aiResponse = { role: "assistant", content: assistantResponseContent };
        }
      } else if (type === "image") {
        const imageResult = await websim.imageGen({ prompt: messageContent });
        aiResponse = { role: "assistant", content: imageResult.url, type: "image" };
      }
    } catch (error) {
      console.error("API Error:", error);
      aiResponse = { role: "assistant", content: "Lo siento, ha ocurrido un error al procesar tu solicitud." };
    } finally {
      setIsLoading(false);
      if (aiResponse) {
        const finalMessages = [...newMessages, aiResponse];
        setMessages(finalMessages);
        if (currentConversationId) {
          const updatedConversations = savedConversations.map(
            (conv) => conv.id === currentConversationId ? { ...conv, messages: finalMessages } : conv
          );
          setSavedConversations(updatedConversations);
          localStorage.setItem("savedConversations", JSON.stringify(updatedConversations));
        }
      }
    }
  };
  const handleSend = () => sendMessage(input, "text");
  const handleGenerateImage = () => sendMessage(input, "image");
  const handleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxDEV(LoginScreen, { onLogin: handleLogin, error: loginError }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 236,
      columnNumber: 16
    });
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "flex h-screen bg-gray-900 overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV(
      ConversationsSidebar,
      {
        isOpen: isSidebarOpen,
        onClose: () => setIsSidebarOpen(false),
        conversations: savedConversations,
        onLoad: handleLoadConversation,
        onDelete: handleDeleteConversation,
        onNew: handleNewChat,
        onSave: handleSaveConversation,
        currentId: currentConversationId
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 241,
        columnNumber: 14
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: `flex flex-col flex-1 h-screen transition-all duration-300 md:ml-0 ${isSidebarOpen ? "md:ml-72" : ""}`, children: [
      /* @__PURE__ */ jsxDEV(
        Header,
        {
          onToggleSidebar: () => setIsSidebarOpen(true),
          onLogout: handleLogout
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 252,
          columnNumber: 17
        }
      ),
      /* @__PURE__ */ jsxDEV(
        ChatMessages,
        {
          messages,
          isLoading,
          messagesEndRef
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 257,
          columnNumber: 17
        }
      ),
      /* @__PURE__ */ jsxDEV(
        MessageInput,
        {
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
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 263,
          columnNumber: 17
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 251,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 240,
    columnNumber: 9
  });
};
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 281,
  columnNumber: 13
}));
