import React from "react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  isLoading?: boolean;
}

export function Table<T>({ columns, data, keyExtractor, isLoading }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-medium">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                Loading table data...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                No records found.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={keyExtractor(row)} className="hover:bg-gray-50">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 text-gray-900 whitespace-nowrap">
                    {col.cell
                      ? col.cell(row)
                      : col.accessorKey
                      ? (row[col.accessorKey] as React.ReactNode)
                      : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
