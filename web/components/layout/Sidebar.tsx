import React from "react";
import Link from "next/link";

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-50 border-r border-gray-200 min-h-[calc(100vh-4rem)] p-4 hidden lg:block">
      <div className="space-y-1">
        <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Modules
        </span>
        <nav className="mt-2 space-y-1">
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-blue-700 bg-blue-50"
          >
            Users Feature
          </Link>
        </nav>
      </div>
    </aside>
  );
};
