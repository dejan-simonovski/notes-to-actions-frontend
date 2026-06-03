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

  const sendMessage = useCallback(async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Convert current messages to history format
      const history = messages
        .filter(msg => msg.id !== "initial") // Skip the initial hardcoded greeting if desired, or keep it. We'll skip it to save tokens.
        .map(msg => ({
          role: msg.sender === "bot" ? "assistant" : "user",
          content: msg.text
        } as const));

      const { chatWithTranscript } = await import("../services/meetingService");
      
      // Call the backend API (without specific meeting context, relying entirely on the Global Context)
      const answer = await chatWithTranscript(userText, undefined, history);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: answer,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMessage: Message = {
        id: `bot-${Date.now()}`,
        text: "Sorry, I am having trouble connecting to the server. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, messages]);

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
