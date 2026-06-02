import { Link } from "react-router";
import { Calendar, CheckCircle, Clock, Plus } from "lucide-react";

import { useDashboard } from "../../hooks/useDashboard";
import { formatDate } from "../../utils/dateUtils";
import { StatusBadge } from "../ui/StatusBadge";

export function Dashboard() {
  const {
    meetings,
    totalMeetings,
    openActionItems,
    completedTasks,
  } = useDashboard();

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-gray-900 mb-1 sm:mb-2">Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Track your meeting insights and action items
            </p>
          </div>

          <Link
            to="/app/new-meeting"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700"
          >
            <Plus size={18} />
            New Meeting
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">

          <div className="bg-white rounded-xl p-6 border">
            <Calendar className="text-indigo-600" size={22} />
            <div className="text-3xl font-semibold">{totalMeetings}</div>
            <div className="text-gray-600">Total Meetings</div>
          </div>

          <div className="bg-white rounded-xl p-6 border">
            <Clock className="text-amber-600" size={22} />
            <div className="text-3xl font-semibold">{openActionItems}</div>
            <div className="text-gray-600">Open Action Items</div>
          </div>

          <div className="bg-white rounded-xl p-6 border">
            <CheckCircle className="text-green-600" size={22} />
            <div className="text-3xl font-semibold">{completedTasks}</div>
            <div className="text-gray-600">Completed Tasks</div>
          </div>

        </div>

        <div className="bg-white rounded-xl border shadow-sm">

          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Meetings</h2>
          </div>

          <div className="divide-y">
            {meetings.map((meeting) => (
              <Link
                key={meeting.id}
                to={`/app/meeting/${meeting.id}`}
                className="block p-6 hover:bg-gray-50"
              >
                <div className="flex justify-between">

                  <div className="flex-1">
                    <h3 className="font-medium mb-2">
                      {meeting.title}
                    </h3>

                    <div className="text-sm text-gray-600 flex gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(meeting.date)}
                      </div>

                      <div className="flex items-center gap-1">
                        <CheckCircle size={14} />
                        {meeting.completedCount}/{meeting.actionItemsCount} tasks
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={meeting.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}