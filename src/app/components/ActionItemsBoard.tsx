import { useState } from "react";
import { Calendar, User } from "lucide-react";
import { getAllActionItems, ActionItem } from "../data/mockData";

export function ActionItemsBoard() {
  const allItems = getAllActionItems();
  const [actionItems] = useState<ActionItem[]>(allItems);

  const columns = [
    { id: "To Do", title: "To Do", color: "border-gray-300" },
    { id: "In Progress", title: "In Progress", color: "border-amber-300" },
    { id: "Done", title: "Done", color: "border-green-300" }
  ];

  const getItemsByStatus = (status: string) => {
    return actionItems.filter(item => item.status === status);
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Action Items Board</h1>
          <p className="text-gray-600">Track and manage all action items across meetings</p>
        </div>

        <div className="grid grid-cols-3 gap-6 flex-1 overflow-hidden">
          {columns.map((column) => {
            const items = getItemsByStatus(column.id);
            return (
              <div
                key={column.id}
                className="bg-gray-50 rounded-xl p-4 flex flex-col border-2 border-gray-200"
              >
                <div className="mb-4 pb-4 border-b border-gray-300">
                  <div className="flex items-center justify-between">
                    <h2 className="text-gray-900">{column.title}</h2>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                      {items.length}
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-auto space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <h4 className="text-gray-900 mb-3">{item.task}</h4>

                      <div className="space-y-2 text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <span>{item.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span>
                            {new Date(item.deadline).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <span className="text-gray-500">
                          {item.meetingTitle}
                        </span>
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No items
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
