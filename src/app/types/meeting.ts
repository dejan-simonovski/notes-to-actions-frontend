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
  key_topics: string[];
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

/**
 * A meeting as stored in Redux — backend shape plus locally-generated
 * fields that the API does not return.
 */
export type StoredMeeting = AnalyzeResponse & {
  id: string;
  date: string;
};
