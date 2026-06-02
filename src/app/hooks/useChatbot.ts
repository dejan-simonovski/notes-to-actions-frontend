import { useState, useCallback, type ChangeEvent, type FormEvent } from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Hi! I am your AI Meeting Assistant. I can help you summarize your meetings, create action items, or navigate the application. What can I do for you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes("action") || text.includes("board") || text.includes("todo") || text.includes("task")) {
      return "The Action Items Board displays all tasks extracted from your meetings. You can mark items as complete, filter by priority, or assign deadlines. Click 'Action Items' in the sidebar to view it.";
    }

    if (text.includes("new") || text.includes("create") || text.includes("upload") || text.includes("record") || text.includes("meeting")) {
      return "To analyze a new meeting, select 'New Meeting' in the sidebar. You can upload an audio file, write or paste a transcript, and our AI will automatically extract action items, key decisions, and a concise summary.";
    }

    if (text.includes("dashboard") || text.includes("home") || text.includes("overview")) {
      return "The Dashboard shows your recent meeting summaries, quick stats, and pending high-priority actions. Click 'Dashboard' in the sidebar to return to the home screen.";
    }

    if (text.includes("hello") || text.includes("hi ") || text === "hi" || text.includes("hey")) {
      return "Hello! Hope you are having a productive day. How can I help you with your meetings or action items?";
    }

    if (text.includes("thank") || text.includes("thanks")) {
      return "You're very welcome! Let me know if you need anything else.";
    }

    return "I can help you navigate this app and manage your meeting notes. Try asking me how to create a 'new meeting', check the 'action items', or explore the 'dashboard'.";
  };

  const sendMessage = useCallback((e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(userMessage.text),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  }, [inputValue]);

  return {
    isOpen,
    toggleOpen,
    inputValue,
    handleInputChange,
    messages,
    isTyping,
    sendMessage,
  };
}
