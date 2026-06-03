import { User, Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";
import { useActionItems } from "../../hooks/useActionItems";
import type { TaskStatus } from "../../types/meeting";

const columns: { id: TaskStatus; title: string }[] = [
  { id: "to_do", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const columnColors: Record<TaskStatus, string> = {
  to_do: "border-gray-200",
  in_progress: "border-indigo-300",
  done: "border-green-300",
};

const columnDragOver: Record<TaskStatus, string> = {
  to_do: "bg-gray-100 border-gray-400",
  in_progress: "bg-indigo-50 border-indigo-400",
  done: "bg-green-50 border-green-400",
};

function fallbackCopy(text: string) {
  const el = document.createElement("textarea");
  el.value = text;
  el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const write = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(write).catch(() => {
          fallbackCopy(text);
          write();
        });
      } else {
        fallbackCopy(text);
        write();
      }
    },
    [text]
  );

  return (
    <button
      onClick={handleCopy}
      onMouseDown={(e) => e.stopPropagation()}
      title="Copy title"
      className={`flex-shrink-0 p-1 rounded transition-all duration-150
        ${copied
          ? "text-green-500 bg-green-50"
          : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        }`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

export function ActionItemsBoard() {
  const {
    dragOverCol,
    dragOverItemId,
    setDragOverCol,
    setDragOverItemId,
    getItemsByStatus,
    handleDragStart,
    handleDragEnd,
    handleDropOnColumn,
    handleDropOnItem,
  } = useActionItems();

  return (
    <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col min-h-0">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">
        <div className="mb-6 sm:mb-8 flex-shrink-0">
          <h1 className="text-gray-900 mb-1 sm:mb-2">Action Items Board</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track and manage all action items across meetings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 flex-1 min-h-0">
          {columns.map((column) => {
            const items = getItemsByStatus(column.id);
            const isOver = dragOverCol === column.id;

            return (
              <div
                key={column.id}
                className={`rounded-xl p-4 flex flex-col border-2 overflow-hidden min-h-0 transition-colors duration-150
                  ${isOver ? columnDragOver[column.id] : `bg-gray-50 ${columnColors[column.id]}`}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  setDragOverCol(column.id);
                }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setDragOverCol(null);
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  handleDropOnColumn(column.id);
                }}
              >
                <div className="mb-4 pb-4 border-b border-gray-300 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-gray-900 text-sm sm:text-base font-semibold">
                      {column.title}
                    </h2>
                    <span className="bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full text-sm">
                      {items.length}
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0 space-y-3">
                  {items.map((item) => {
                    const isItemOver = dragOverItemId === item.id;
                    return (
                      <div
                        id={`card-${item.id}`}
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onDragEnd={() => handleDragEnd(item.id)}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragOverItemId(item.id);
                        }}
                        onDragLeave={() => setDragOverItemId(null)}
                        onDrop={(e) => handleDropOnItem(e, item.id, column.id)}
                        className={`bg-white p-3 sm:p-4 rounded-lg border shadow-sm cursor-grab active:cursor-grabbing transition-all duration-150 select-none
                          ${isItemOver
                            ? "border-indigo-400 shadow-md -translate-y-0.5 scale-[1.01]"
                            : "border-gray-200 hover:shadow-md"
                          }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h4 className="text-gray-900 text-sm sm:text-base font-medium leading-snug">
                            {item.description}
                          </h4>
                          <CopyButton text={item.description} />
                        </div>

                        <div className="space-y-1.5 text-gray-600 mb-3 text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">{item.assignee_name}</span>
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-gray-200">
                          <span className="text-gray-500 text-xs sm:text-sm truncate block">
                            {item.meetingTitle}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {items.length === 0 && (
                    <div className={`text-center py-8 text-sm rounded-lg border-2 border-dashed transition-colors
                      ${isOver ? "border-indigo-300 text-indigo-400" : "border-gray-200 text-gray-400"}`}>
                      {isOver ? "Drop here" : "No items"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}