import { Copy, Download, RefreshCw } from 'lucide-react';
import { useMeetingResults } from '../../hooks/useMeetingResults';
import { StatusBadge } from '../ui/StatusBadge';
import { formatDate } from '../../../utils/dateUtils';

const PRIORITY_LABELS: Record<string, string> = {
  urgent_important: 'Urgent & Important',
  important_not_urgent: 'Important',
  urgent_not_important: 'Urgent',
  low_priority: 'Low Priority',
};

export function MeetingResults() {
  const {
    meeting,
    handleCopy,
    handleExport,
    handleRegenerate,
    goBack,
  } = useMeetingResults();

  if (!meeting) {
    return (
      <div className="p-4 sm:p-8">
        <div className="text-center">
          <h2 className="text-gray-900 mb-2">Meeting not found</h2>
          <button
            onClick={goBack}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-gray-900 mb-1 text-lg sm:text-xl md:text-2xl">
              {meeting.title}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {formatDate(meeting.date)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm"
            >
              <RefreshCw size={16} />
              Regenerate
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm"
            >
              <Download size={16} />
              Export PDF
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
            >
              <Copy size={16} />
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                <h3 className="text-gray-900 mb-3 font-semibold">
                  Meeting Summary
                </h3>
                <p className="text-gray-700 leading-relaxed">{meeting.summary}</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                <h3 className="text-gray-900 mb-3 font-semibold">
                  Key Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {meeting.key_topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <h3 className="text-gray-900 mb-3 font-semibold">Action Items</h3>

              <div className="space-y-3">
                {meeting.action_items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <StatusBadge status={item.status} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-gray-900 mb-1">
                        {item.description}
                      </div>

                      <div className="text-gray-600 text-xs sm:text-sm flex flex-wrap gap-x-4 gap-y-1">
                        <span>
                          Assigned to{' '}
                          <span className="text-gray-900">
                            {item.assignee_name}
                          </span>
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
          </div>
        </div>
      </div>
    </div>
  );
}