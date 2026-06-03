export type TaskPriority =
  | 'urgent_important'
  | 'important_not_urgent'
  | 'urgent_not_important'
  | 'low_priority';

export type TaskStatus = 'to_do' | 'in_progress' | 'done';

export type ActionItem = {
  description: string;
  assignee_name: string;
  priority: TaskPriority;
  status: TaskStatus;
};

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  transcript?: string;
  question: string;
  history?: ChatMessage[];
  title?: string;
  date?: string;
  summary?: string;
  action_items?: ActionItem[];
}

export interface ChatResponse {
  answer: string;
}

export type AnalyzeResponse = {
  title: string;
  summary: string;
  action_items: ActionItem[];
  key_topics: string[];
  transcript: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type StoredMeeting = AnalyzeResponse & {
  id: string;
  date: string;
};