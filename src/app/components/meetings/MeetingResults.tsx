import { Copy, Download, RefreshCw } from 'lucide-react';
import { useMeetingResults } from '../../hooks/useMeetingResults';
import { TranscriptPanel } from './components/TranscriptPanel';
import { MeetingSummary } from './components/MeetingSummary';
import { KeyTopics } from './components/KeyTopics';
import { ActionItems } from './components/ActionItems';
import { EisenhowerFlow } from './components/EisenhowerFlow';
import { formatDate } from '../../../utils/dateUtils';

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
      <div className="border-b border-gray-200 bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex-shrink-0">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:items-stretch">

            <TranscriptPanel transcript={meeting.transcript} />

            <div className="space-y-4 sm:space-y-6">
              <MeetingSummary summary={meeting.summary} />
              <ActionItems items={meeting.action_items} />
              <KeyTopics topics={meeting.key_topics} />
            </div>
          </div>

          <EisenhowerFlow actionItems={meeting.action_items} />

        </div>
      </div>
    </div>
  );
}