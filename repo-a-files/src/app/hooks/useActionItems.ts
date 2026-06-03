import { useState, useRef, type DragEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateActionItemStatus } from '../store/meetingsSlice';
import type { TaskStatus } from '../types/meeting';

export type FlatActionItem = {
  id: string;
  meetingId: string;
  index: number;
  description: string;
  assignee_name: string;
  priority: string;
  status: TaskStatus;
  meetingTitle: string;
};

export function useActionItems() {
  const dispatch = useAppDispatch();
  const meetings = useAppSelector((state) => state.meetings.meetings);

  const flatItems: FlatActionItem[] = meetings.flatMap((m) =>
    m.action_items.map((item, index) => ({
      id: `${m.id}-${index}`,
      meetingId: m.id,
      index,
      description: item.description,
      assignee_name: item.assignee_name,
      priority: item.priority,
      status: item.status,
      meetingTitle: m.title,
    })),
  );

  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);
  const draggingId = useRef<string | null>(null);

  const getItemsByStatus = (status: TaskStatus) =>
    flatItems.filter((item) => item.status === status);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    draggingId.current = id;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      const el = document.getElementById(`card-${id}`);
      if (el) el.style.opacity = '0.4';
    }, 0);
  };

  const handleDragEnd = (id: string) => {
    draggingId.current = null;
    setDragOverCol(null);
    setDragOverItemId(null);
    const el = document.getElementById(`card-${id}`);
    if (el) el.style.opacity = '1';
  };

  const dispatchStatusUpdate = (cardId: string, status: TaskStatus) => {
    const lastDash = cardId.lastIndexOf('-');
    const meetingId = cardId.substring(0, lastDash);
    const index = Number(cardId.substring(lastDash + 1));
    dispatch(updateActionItemStatus({ meetingId, itemIndex: index, status }));
  };

  const handleDropOnColumn = (status: TaskStatus) => {
    if (!draggingId.current) return;
    dispatchStatusUpdate(draggingId.current, status);
    setDragOverCol(null);
    setDragOverItemId(null);
  };

  const handleDropOnItem = (
    e: DragEvent<HTMLDivElement>,
    targetId: string,
    status: TaskStatus,
  ) => {
    e.stopPropagation();
    if (!draggingId.current || draggingId.current === targetId) return;
    dispatchStatusUpdate(draggingId.current, status);
    setDragOverCol(null);
    setDragOverItemId(null);
  };

  return {
    actionItems: flatItems,
    dragOverCol,
    dragOverItemId,
    setDragOverCol,
    setDragOverItemId,
    getItemsByStatus,
    handleDragStart,
    handleDragEnd,
    handleDropOnColumn,
    handleDropOnItem,
  };
}