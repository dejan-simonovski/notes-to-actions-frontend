import { Outlet, Link } from "react-router";
import { Home, FileText, CheckSquare } from "lucide-react";
import { ChatbotWidget } from "./ChatbotWidget";
import { useLayout } from "../../hooks/useLayout";
import { AppTitle } from "./AppTitle";

export function Layout() {
  const { location, isActive } = useLayout();

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 items-center flex">
          <AppTitle />
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link
            to="/app"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === "/app"
              ? "bg-indigo-50 text-indigo-600"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/app/new-meeting"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive("/app/new-meeting")
              ? "bg-indigo-50 text-indigo-600"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <FileText size={20} />
            <span>New Meeting</span>
          </Link>

          <Link
            to="/app/action-items"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive("/app/action-items")
              ? "bg-indigo-50 text-indigo-600"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <CheckSquare size={20} />
            <span>Action Items</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto min-h-0">
        <Outlet />
      </main>

      <ChatbotWidget />
    </div>
  );
}