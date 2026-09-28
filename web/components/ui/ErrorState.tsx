import React from "react";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "An unexpected error occurred while loading data.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-red-200 rounded-lg bg-red-50">
      <div className="w-12 h-12 text-red-500 mb-3 flex items-center justify-center rounded-full bg-red-100 font-bold text-xl">
        &#x26A0;
      </div>
      <h3 className="text-base font-semibold text-red-900">{title}</h3>
      <p className="mt-1 text-sm text-red-700 max-w-sm">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button variant="danger" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
