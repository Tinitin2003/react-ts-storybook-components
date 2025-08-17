// src/components/DataTable/DataTable.types.ts
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface Column<T> {
  /** Unique identifier for the column */
  key: keyof T;

  /** Display text for the column header */
  header: string;

  /** Whether this column can be sorted */
  sortable?: boolean;

  /** Custom sort function for complex data types */
  sortFunction?: (a: T, b: T) => number;

  /** Custom render function for the cell content */
  render?: (value: any, row: T) => React.ReactNode;

  /** Additional CSS classes for the column */
  className?: string;

  /** Width of the column */
  width?: string | number;
}

export interface DataTableProps<T> extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'data'> {
  /** Array of data to display in the table */
  data: T[];

  /** Column definitions */
  columns: Column<T>[];

  /** Whether the table is in a loading state */
  loading?: boolean;

  /** Whether rows can be selected */
  selectable?: boolean;

  /** Whether multiple rows can be selected (only applies when selectable=true) */
  multiSelect?: boolean;

  /** Callback fired when row selection changes */
  onRowSelect?: (selectedRows: T[]) => void;

  /** Message to display when no data is available */
  emptyMessage?: string;

  /** Additional CSS classes for the table */
  className?: string;
}