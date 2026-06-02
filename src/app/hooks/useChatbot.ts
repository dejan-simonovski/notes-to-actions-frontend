import { useState, useCallback } from 'react';
import { chatWithTranscript } from '../services/meetingService';
import { useMeetingContext } from '../context/MeetingContext';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const APP_CONTEXT = `
You are an AI assistant embedded inside "AI Meeting Notes", a web application that helps teams manage meeting transcripts, extract action items, and track progress.

Application features:
- Dashboard: Shows recent meetings, stats (total meetings, open action items, completed tasks), and links to each meeting's results.
- New Meeting: Users can paste a raw text transcript or upload a .txt file. Clicking "Generate Insights" sends it to an AI backend which returns an executive summary and a list of action items prioritized by the Eisenhower Matrix (Urgent & Important, Important but Not Urgent, Urgent but Not Important, Low Priority).
- Meeting Results page: Shows the original transcript, an AI-generated summary, key decisions, action items with assignees and deadlines, and key topics.
- Action Items Board: A kanban board with columns for "To Do", "In Progress", and "Done". Shows all tasks extracted across all meetings.
- Meeting Assistant (this chatbot): Answers questions about the app or about the currently open meeting transcript. When a meeting is open, it answers strictly from the transcript context.

The backend is a Python FastAPI server running on http://localhost:8000. It uses OpenAI GPT for structured outputs.
Slack integration: after each analysis the results are automatically posted to a configured Slack webhook.

Answer any question the user has about using this application or about their meetings. Be concise and helpful.
`.trim();

export function useChatbot() {
  const { currentTranscript } = useMeetingContext();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: 'Hi! I am your AI Meeting Assistant powered by OpenAI. Ask me anything — about this app, your meetings, action items, or paste a question about a specific transcript.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const sendMessage = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!inputValue.trim()) return;

      const userText = inputValue.trim();

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        text: userText,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      const context = currentTranscript ?? APP_CONTEXT;

      let botText: string;
      try {
        botText = await chatWithTranscript(context, userText);
      } catch {
        botText =
          'Sorry, I could not reach the AI service right now. Please make sure the backend server is running on http://localhost:8000 and your OPENAI_API_KEY is set in the backend .env file.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text: botText,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);

      setIsTyping(false);
    },
    [inputValue, currentTranscript],
  );

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
