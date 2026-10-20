/**
 * DropboxSkeleton
 * Animated loading placeholder matching the image grid layout.
 * Displayed while Dropbox folder data is being fetched.
 */

interface DropboxSkeletonProps {
  /** Number of skeleton cards to render (should match expected image count) */
  count?: number;
  /** Tailwind grid column classes */
  gridCols?: string;
}

export function DropboxSkeleton({
  count = 8,
  gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
}: DropboxSkeletonProps) {
  return (
    <div className={`grid ${gridCols} gap-4`} aria-label="Loading images…">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
