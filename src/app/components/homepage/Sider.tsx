import React from "react";

export function Sider() {
  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 hidden md:block">
      <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Sidebar</h3>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li className="hover:text-indigo-600 cursor-pointer">Link 1</li>
        <li className="hover:text-indigo-600 cursor-pointer">Link 2</li>
        <li className="hover:text-indigo-600 cursor-pointer">Link 3</li>
      </ul>
    </aside>
  );
}
