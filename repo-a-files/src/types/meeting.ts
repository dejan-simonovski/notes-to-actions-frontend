export type TaskPriority =
    | 'urgent_important'
    | 'important_not_urgent'
    | 'urgent_not_important'
    | 'low_priority';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface ActionItem {
    description: string;
    assignee_name: string;
    priority: TaskPriority;
    status: TaskStatus;
}

export interface Meeting {
    id: string;
    title: string;
    date: string;
    summary: string;
    transcript?: string;
    key_topics: string[];
    action_items: ActionItem[];
}