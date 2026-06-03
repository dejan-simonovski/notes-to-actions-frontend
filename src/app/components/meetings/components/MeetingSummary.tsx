interface MeetingSummaryProps {
    summary: string;
}

export function MeetingSummary({ summary }: MeetingSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 flex flex-col max-h-64">
      <h3 className="text-gray-900 mb-3 font-semibold flex-shrink-0">Meeting Summary</h3>
      <div className="overflow-y-auto flex-1 min-h-0">
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}