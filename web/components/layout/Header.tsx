import React from "react";

export interface HeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, description, action }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
