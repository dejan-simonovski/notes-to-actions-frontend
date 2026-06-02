import { useState, useRef } from "react";
import { getAllActionItems, ActionItem } from "../../app/data/mockData"

type Status = "To Do" | "In Progress" | "Done";

export function useActionItems() {
    const [actionItems, setActionItems] = useState<ActionItem[]>(getAllActionItems());
    const [dragOverCol, setDragOverCol] = useState<Status | null>(null);
    const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);
    const draggingId = useRef<string | null>(null);

    const getItemsByStatus = (status: Status) =>
        actionItems.filter((item) => item.status === status);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        draggingId.current = id;
        e.dataTransfer.effectAllowed = "move";
        setTimeout(() => {
            const el = document.getElementById(`card-${id}`);
            if (el) el.style.opacity = "0.4";
        }, 0);
    };

    const handleDragEnd = (id: string) => {
        draggingId.current = null;
        setDragOverCol(null);
        setDragOverItemId(null);
        const el = document.getElementById(`card-${id}`);
        if (el) el.style.opacity = "1";
    };

    const handleDropOnColumn = (status: Status) => {
        if (!draggingId.current) return;
        setActionItems((prev) =>
            prev.map((item) =>
                item.id === draggingId.current ? { ...item, status } : item
            )
        );
        setDragOverCol(null);
        setDragOverItemId(null);
    };

    const handleDropOnItem = (e: React.DragEvent, targetId: string, status: Status) => {
        e.stopPropagation();
        if (!draggingId.current || draggingId.current === targetId) return;

        setActionItems((prev) => {
            const updated = prev.map((item) =>
                item.id === draggingId.current ? { ...item, status } : item
            );
            const dragIdx = updated.findIndex((i) => i.id === draggingId.current);
            const targetIdx = updated.findIndex((i) => i.id === targetId);
            if (dragIdx === -1 || targetIdx === -1) return updated;
            const reordered = [...updated];
            const [moved] = reordered.splice(dragIdx, 1);
            reordered.splice(targetIdx, 0, moved);
            return reordered;
        });

        setDragOverCol(null);
        setDragOverItemId(null);
    };

    return {
        actionItems,
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