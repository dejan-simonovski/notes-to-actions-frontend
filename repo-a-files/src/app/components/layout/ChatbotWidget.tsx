import React, { useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";
import { useChatbot } from "../../hooks/useChatbot";

export function ChatbotWidget() {
  const {
    isOpen,
    toggleOpen,
    inputValue,
    handleInputChange,
    messages,
    isTyping,
    sendMessage,
  } = useChatbot();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans pointer-events-none">
      {isOpen && (
        <div className="mb-4 w-96 h-[500px] bg-white border border-gray-150 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto">
          <div className="bg-indigo-600 text-white px-5 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight text-white m-0">
                  Meeting Assistant
                </h3>
                <span className="flex items-center gap-1.5 text-xs text-indigo-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>

            <button
              onClick={toggleOpen}
              className="text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${msg.sender === "user"
                  ? "ml-auto flex-row-reverse"
                  : "mr-auto"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                    <Bot size={15} className="text-indigo-600" />
                  </div>
                )}

                <div>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white text-gray-850 border border-gray-100 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span
                    className={`text-[10px] text-gray-400 mt-1 block px-1 ${msg.sender === "user"
                      ? "text-right"
                      : "text-left"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Bot size={15} className="text-indigo-600" />
                </div>

                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                  <Loader2
                    size={14}
                    className="text-indigo-500 animate-spin"
                  />
                  <span className="text-xs text-gray-500 font-medium">
                    Assistant is thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={sendMessage}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-400 text-gray-800"
            />

            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-100 disabled:text-gray-400 text-white p-2 rounded-xl transition-all shadow-sm hover:shadow active:scale-95 shrink-0 cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={toggleOpen}
        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all hover:rotate-3 cursor-pointer border border-indigo-500/20 pointer-events-auto"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}