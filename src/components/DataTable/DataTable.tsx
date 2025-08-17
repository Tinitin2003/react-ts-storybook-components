// src/components/DataTable/DataTable.tsx
import React, { useState, useMemo, useCallback } from "react";
import type { DataTableProps, Column, SortDirection, SortConfig } from "./DataTable.types";
import { 
  ChevronUpIcon, 
  ChevronDownIcon,
  ChevronUpDownIcon 
} from "@heroicons/react/24/outline";

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  multiSelect = true,
  onRowSelect,
  emptyMessage = "No data available",
  className = "",
  ...rest
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Handle sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    const { key, direction } = sortConfig;
    const column = columns.find(col => col.key === key);

    return [...data].sort((a, b) => {
      // Use custom sort function if provided
      if (column?.sortFunction) {
        const result = column.sortFunction(a, b);
        return direction === 'desc' ? -result : result;
      }

      // Default sorting logic
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        return direction === 'desc' ? -result : result;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const result = aValue - bValue;
        return direction === 'desc' ? -result : result;
      }

      // Fallback to string comparison
      const result = String(aValue).localeCompare(String(bValue));
      return direction === 'desc' ? -result : result;
    });
  }, [data, sortConfig, columns]);

  // Handle sort click
  const handleSort = useCallback((columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    setSortConfig(prevConfig => {
      if (!prevConfig || prevConfig.key !== columnKey) {
        return { key: columnKey, direction: 'asc' };
      }

      if (prevConfig.direction === 'asc') {
        return { key: columnKey, direction: 'desc' };
      }

      // Reset sorting (remove sort)
      return null;
    });
  }, [columns]);

  // Handle row selection
  const handleRowSelect = useCallback((row: T, isSelected: boolean) => {
    let newSelectedRows: T[];

    if (multiSelect) {
      if (isSelected) {
        newSelectedRows = selectedRows.filter(selectedRow => 
          JSON.stringify(selectedRow) !== JSON.stringify(row)
        );
      } else {
        newSelectedRows = [...selectedRows, row];
      }
    } else {
      newSelectedRows = isSelected ? [] : [row];
    }

    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  }, [selectedRows, multiSelect, onRowSelect]);

  // Handle select all
  const handleSelectAll = useCallback((checked: boolean) => {
    const newSelectedRows = checked ? [...sortedData] : [];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  }, [sortedData, onRowSelect]);

  // Check if row is selected
  const isRowSelected = useCallback((row: T) => {
    return selectedRows.some(selectedRow => 
      JSON.stringify(selectedRow) === JSON.stringify(row)
    );
  }, [selectedRows]);

  // Check if all rows are selected
  const allRowsSelected = sortedData.length > 0 && selectedRows.length === sortedData.length;
  const someRowsSelected = selectedRows.length > 0 && selectedRows.length < sortedData.length;

  // Render sort icon
  const renderSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />;
    }

    return sortConfig.direction === 'asc' 
      ? <ChevronUpIcon className="w-4 h-4 text-blue-600" />
      : <ChevronDownIcon className="w-4 h-4 text-blue-600" />;
  };

  // Render cell content
  const renderCellContent = (row: T, column: Column<T>) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }

    const value = row[column.key];

    if (value === null || value === undefined) {
      return <span className="text-gray-400">—</span>;
    }

    return String(value);
  };

  const tableClasses = [
    "min-w-full divide-y divide-gray-200",
    className
  ].filter(Boolean).join(" ");

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">📋</div>
        <p className="text-gray-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className={tableClasses} {...rest}>
        <thead className="bg-gray-50">
          <tr>
            {/* Select all column */}
            {selectable && multiSelect && (
              <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                <input
                  type="checkbox"
                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = someRowsSelected;
                    }
                  }}
                  checked={allRowsSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="Select all rows"
                />
              </th>
            )}

            {selectable && !multiSelect && (
              <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                <span className="sr-only">Select</span>
              </th>
            )}

            {/* Column headers */}
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer select-none hover:bg-gray-100' : ''
                }`}
                onClick={column.sortable ? () => handleSort(String(column.key)) : undefined}
                aria-sort={
                  sortConfig?.key === column.key 
                    ? sortConfig.direction === 'asc' ? 'ascending' : 'descending'
                    : column.sortable ? 'none' : undefined
                }
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && renderSortIcon(String(column.key))}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => {
            const isSelected = isRowSelected(row);

            return (
              <tr 
                key={rowIndex}
                className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
              >
                {/* Selection column */}
                {selectable && (
                  <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                    <input
                      type={multiSelect ? "checkbox" : "radio"}
                      name={multiSelect ? undefined : "row-selection"}
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                      checked={isSelected}
                      onChange={() => handleRowSelect(row, isSelected)}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}

                {/* Data columns */}
                {columns.map((column) => (
                  <td 
                    key={String(column.key)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {renderCellContent(row, column)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;