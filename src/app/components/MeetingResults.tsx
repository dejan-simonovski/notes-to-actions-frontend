import { useParams, useNavigate } from "react-router";
import { Copy, Download, RefreshCw, CheckCircle, Circle, Clock } from "lucide-react";
import { mockMeetings } from "../data/mockData";
import { toast } from "sonner";

export function MeetingResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = mockMeetings.find(m => m.id === id);

  if (!meeting) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-gray-900 mb-2">Meeting not found</h2>
          <button
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    const content = `Meeting: ${meeting.title}\nDate: ${meeting.date}\n\nSummary:\n${meeting.summary.join('\n')}\n\nKey Decisions:\n${meeting.decisions.join('\n')}\n\nAction Items:\n${meeting.actionItems.map(item => `- ${item.task} (${item.assignedTo}, Due: ${item.deadline})`).join('\n')}`;
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  const handleExport = () => {
    toast.success("Exported to PDF");
  };

  const handleRegenerate = () => {
    toast.info("Regenerating insights...");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return <CheckCircle className="text-green-600" size={20} />;
      case "In Progress":
        return <Clock className="text-amber-600" size={20} />;
      default:
        return <Circle className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">{meeting.title}</h1>
              <p className="text-gray-600">
                {new Date(meeting.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRegenerate}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <RefreshCw size={18} />
                Regenerate
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Download size={18} />
                Export PDF
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Copy size={18} />
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-8 py-6">
          <div className="grid grid-cols-2 gap-6 h-full">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-gray-900">Transcript</h2>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <div className="prose prose-sm max-w-none">
                  {meeting.transcript.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph.split('\n').map((line, lineIdx) => {
                        const [speaker, ...rest] = line.split(': ');
                        if (rest.length > 0) {
                          return (
                            <span key={lineIdx} className="block mb-3">
                              <span className="text-gray-900 font-medium">{speaker}:</span>{' '}
                              <span className="text-gray-700">{rest.join(': ')}</span>
                            </span>
                          );
                        }
                        return <span key={lineIdx}>{line}</span>;
                      })}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-auto">
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-gray-900 mb-4">Meeting Summary</h3>
                  <ul className="space-y-2">
                    {meeting.summary.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-gray-900 mb-4">Key Decisions</h3>
                  <ul className="space-y-2">
                    {meeting.decisions.map((decision, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-gray-700">{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-gray-900 mb-4">Action Items</h3>
                  <div className="space-y-3">
                    {meeting.actionItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        {getStatusIcon(item.status)}
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-900 mb-1">{item.task}</div>
                          <div className="flex items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-1">
                              <span>Assigned to:</span>
                              <span className="text-gray-900">{item.assignedTo}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span>Due:</span>
                              <span className="text-gray-900">
                                {new Date(item.deadline).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                            item.status === "Done"
                              ? "bg-green-100 text-green-700"
                              : item.status === "In Progress"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-gray-900 mb-4">Key Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {meeting.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
