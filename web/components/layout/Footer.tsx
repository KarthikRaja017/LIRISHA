import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-4">
        Production Boilerplate Template &copy; {new Date().getFullYear()} Next.js + Flask + PostgreSQL
      </div>
    </footer>
  );
};
