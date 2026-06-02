import { useAppSelector } from '../store/hooks';

export function useDashboard() {
  const meetings = useAppSelector((state) => state.meetings.meetings);

  const allActionItems = meetings.flatMap((m) => m.action_items);

  const openActionItems = allActionItems.filter(
    (item) => item.status !== 'done',
  ).length;

  const completedTasks = allActionItems.filter(
    (item) => item.status === 'done',
  ).length;

  return {
    meetings,
    totalMeetings: meetings.length,
    openActionItems,
    completedTasks,
  };
}