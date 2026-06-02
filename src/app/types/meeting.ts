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

export type AnalyzeResponse = {
  title: string;
  summary: string;
  action_items: ActionItem[];
};

export type ChatRequest = {
  transcript: string;
  question: string;
};

export type ChatResponse = {
  answer: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};
