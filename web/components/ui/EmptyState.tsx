import React from "react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data available",
  description = "There are no items to display at this time.",
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
      <div className="w-12 h-12 text-gray-400 mb-3 flex items-center justify-center rounded-full bg-gray-100">
        &#x1F4C2;
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
