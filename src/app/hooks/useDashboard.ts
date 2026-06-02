import { useAppSelector } from '../store/hooks';

type Status = 'to_do' | 'in_progress' | 'done';

export function useDashboard() {
  const meetings = useAppSelector((state) => state.meetings.meetings);
  const allActionItems = meetings.flatMap((m) => m.action_items);

  const openActionItems = allActionItems.filter((item) => item.status !== 'done').length;
  const completedTasks = allActionItems.filter((item) => item.status === 'done').length;

  const enrichedMeetings = meetings.map((m) => {
    const actionItemsCount = m.action_items.length;
    const completedCount = m.action_items.filter((i) => i.status === 'done').length;
    const hasOpen = m.action_items.some((i) => i.status !== 'done');
    const status: Status = actionItemsCount === 0 || hasOpen ? 'in_progress' : 'done';
    return { ...m, actionItemsCount, completedCount, status };
  });

  return {
    meetings: enrichedMeetings,
    totalMeetings: meetings.length,
    openActionItems,
    completedTasks,
  };
}