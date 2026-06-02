import { Link } from "react-router";
import { Calendar, CheckCircle, Clock, Plus } from "lucide-react";
import { mockMeetings, getAllActionItems } from "../data/mockData";

export function Dashboard() {
  const allActionItems = getAllActionItems();
  const openActionItems = allActionItems.filter(item => item.status !== "Done").length;
  const completedTasks = allActionItems.filter(item => item.status === "Done").length;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Track your meeting insights and action items</p>
          </div>
          <Link
            to="/new-meeting"
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            New Meeting
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Calendar className="text-indigo-600" size={24} />
              </div>
            </div>
            <div className="text-gray-900 mb-1">{mockMeetings.length}</div>
            <div className="text-gray-600">Total Meetings</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Clock className="text-amber-600" size={24} />
              </div>
            </div>
            <div className="text-gray-900 mb-1">{openActionItems}</div>
            <div className="text-gray-600">Open Action Items</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
            <div className="text-gray-900 mb-1">{completedTasks}</div>
            <div className="text-gray-600">Completed Tasks</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Recent Meetings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {mockMeetings.map((meeting) => (
              <Link
                key={meeting.id}
                to={`/meeting/${meeting.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2">{meeting.title}</h3>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(meeting.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} />
                        <span>
                          {meeting.completedCount}/{meeting.actionItemsCount} tasks completed
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        meeting.status === "Completed"
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
