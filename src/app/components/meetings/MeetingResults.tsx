import {
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  Circle,
} from "lucide-react";

import { useMeetingResults } from "../../hooks/useMeetingResults";
import {
  formatTranscript,
} from "../../utils/meetingUtils";

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

  const getStatusIcon = (status: string) => {
    switch (status) {
    case "Done":
      return <CheckCircle className="text-green-600" size={18} />;
    case "In Progress":
      return <Clock className="text-amber-600" size={18} />;
    default:
      return <Circle className="text-gray-400" size={18} />;
    }
  };

  return (
    <div className="h-full flex flex-col">

      <div className="border-b border-gray-200 bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-gray-900 mb-1 text-lg sm:text-xl md:text-2xl">
              {meeting.title}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {new Date(meeting.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
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

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col lg:max-h-[calc(100vh-200px)]">

              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-gray-900 text-base sm:text-lg font-semibold">
                  Transcript
                </h2>
              </div>

              <div className="flex-1 overflow-auto p-4 sm:p-6">
                {formatTranscript(meeting.transcript).map((block) => (
                  <p key={block.id} className="mb-4 text-gray-700">
                    {block.lines.map((line, idx) => {
                      const [speaker, ...rest] = line.split(": ");

                      if (rest.length > 0) {
                        return (
                          <span key={idx} className="block mb-3">
                            <span className="text-gray-900 font-medium">
                              {speaker}:
                            </span>{" "}
                            <span className="text-gray-700">
                              {rest.join(": ")}
                            </span>
                          </span>
                        );
                      }

                      return <span key={idx}>{line}</span>;
                    })}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                <h3 className="text-gray-900 mb-3 font-semibold">
                  Meeting Summary
                </h3>

                <ul className="space-y-2">
                  {meeting.summary.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DECISIONS */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                <h3 className="text-gray-900 mb-3 font-semibold">
                  Key Decisions
                </h3>

                <ul className="space-y-2">
                  {meeting.decisions.map((decision, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-0.5" size={16} />
                      <span className="text-gray-700">{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">

                <h3 className="text-gray-900 mb-3 font-semibold">
                  Action Items
                </h3>

                <div className="space-y-3">
                  {meeting.actionItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300"
                    >

                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(item.status)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 mb-1">
                          {item.task}
                        </div>

                        <div className="text-gray-600 text-xs sm:text-sm flex flex-wrap gap-x-4 gap-y-1">
                          <span>
                            Assigned to:{" "}
                            <span className="text-gray-900">
                              {item.assignedTo}
                            </span>
                          </span>

                          <span>
                            Due:{" "}
                            <span className="text-gray-900">
                              {new Date(item.deadline).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          </span>
                        </div>
                      </div>

                      <span
<<<<<<< HEAD
                        className={`px-2 py-1 rounded-full text-xs ${item.status === "Done"
=======
                        className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs whitespace-nowrap ${item.status === "Done"
>>>>>>> e9f1a57 (refactor: apply eslint to codebase)
                          ? "bg-green-100 text-green-700"
                          : item.status === "In Progress"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-700"
<<<<<<< HEAD
                          }`}
=======
                        }`}
>>>>>>> e9f1a57 (refactor: apply eslint to codebase)
                      >
                        {item.status}
                      </span>

                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                <h3 className="text-gray-900 mb-3 font-semibold">
                  Key Topics
                </h3>

                <div className="flex flex-wrap gap-2">
                  {meeting.topics.map((topic, idx) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}