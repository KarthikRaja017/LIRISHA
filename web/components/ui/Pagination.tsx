import React from "react";
import { Button } from "./Button";
import { PaginationMeta } from "@/types/pagination";

export interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ meta, onPageChange }) => {
  const { page, total_pages, total, page_size } = meta;
  const startItem = total === 0 ? 0 : (page - 1) * page_size + 1;
  const endItem = Math.min(page * page_size, total);

  if (total_pages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-2 border-t border-gray-200 text-sm text-gray-700">
      <div>
        Showing <span className="font-medium text-gray-900">{startItem}</span> to{" "}
        <span className="font-medium text-gray-900">{endItem}</span> of{" "}
        <span className="font-medium text-gray-900">{total}</span> results
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <span className="text-sm font-medium px-2">
          Page {page} of {total_pages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= total_pages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
