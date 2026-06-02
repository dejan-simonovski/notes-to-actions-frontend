import { Outlet, Link, useLocation } from "react-router";
import { Home, FileText, CheckSquare } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-indigo-600">AI Meeting Notes</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/") && !location.pathname.includes("action-items")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/new-meeting"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/new-meeting")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FileText size={20} />
            <span>New Meeting</span>
          </Link>

          <Link
            to="/action-items"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/action-items")
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <CheckSquare size={20} />
            <span>Action Items</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
