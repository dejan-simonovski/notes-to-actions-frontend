import type { ActionItem } from '../../types/meeting';
import { StatusBadge } from '../../ui/StatusBadge';

const PRIORITY_LABELS: Record<string, string> = {
  urgent_important: 'Urgent & Important',
  important_not_urgent: 'Important',
  urgent_not_important: 'Urgent',
  low_priority: 'Low Priority',
};

interface ActionItemsProps {
    items: ActionItem[];
}

export function ActionItems({ items }: ActionItemsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 flex flex-col max-h-96">
      <h3 className="text-gray-900 mb-3 font-semibold flex-shrink-0">Action Items</h3>
      <div className="overflow-y-auto flex-1 min-h-0 space-y-3 pr-1">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300"
          >
            <div className="flex-shrink-0 mt-0.5">
              <StatusBadge status={item.status} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 mb-1">{item.description}</div>
              <div className="text-gray-600 text-xs sm:text-sm flex flex-wrap gap-x-4 gap-y-1">
                <span>
                                    Assigned to{' '}
                  <span className="text-gray-900">{item.assignee_name}</span>
                </span>
                <span className="text-indigo-600">
                  {PRIORITY_LABELS[item.priority] ?? item.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}