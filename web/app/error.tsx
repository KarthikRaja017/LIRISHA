"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorState title="Application Error" message={error.message} onRetry={reset} />;
}
