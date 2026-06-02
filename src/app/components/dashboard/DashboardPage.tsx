import { Link } from "react-router";
import { Calendar, CheckCircle, Clock, Plus } from "lucide-react";
import { mockMeetings, getAllActionItems } from "../../data/mockData";

export function Dashboard() {
  const allActionItems = getAllActionItems();
  const openActionItems = allActionItems.filter(item => item.status !== "Done").length;
  const completedTasks = allActionItems.filter(item => item.status === "Done").length;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-gray-900 mb-1 sm:mb-2">Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Track your meeting insights and action items</p>
          </div>
          <Link
            to="/app/new-meeting"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            <Plus size={18} />
            New Meeting
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-indigo-100 p-2.5 sm:p-3 rounded-lg">
                <Calendar className="text-indigo-600" size={22} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">{mockMeetings.length}</div>
            <div className="text-gray-600 text-sm sm:text-base">Total Meetings</div>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-amber-100 p-2.5 sm:p-3 rounded-lg">
                <Clock className="text-amber-600" size={22} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">{openActionItems}</div>
            <div className="text-gray-600 text-sm sm:text-base">Open Action Items</div>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="bg-green-100 p-2.5 sm:p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={22} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">{completedTasks}</div>
            <div className="text-gray-600 text-sm sm:text-base">Completed Tasks</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-gray-900 text-base sm:text-lg font-semibold">Recent Meetings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {mockMeetings.map((meeting) => (
              <Link
                key={meeting.id}
                to={`/meeting/${meeting.id}`}
                className="block p-4 sm:p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 font-medium mb-2 truncate">{meeting.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{new Date(meeting.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle size={14} />
                        <span>
                          {meeting.completedCount}/{meeting.actionItemsCount} tasks completed
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="self-start sm:self-auto shrink-0">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${meeting.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                        }`}
                    >
                      {meeting.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}