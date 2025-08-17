// src/components/DataTable/DataTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import DataTable from './DataTable';
import type{ Column } from './DataTable.types';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  avatar?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample data
const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer',
    status: 'inactive',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Editor',
    status: 'pending',
    joinDate: '2023-04-05',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-05-12',
  },
];

const products: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 45, rating: 4.8 },
  { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 120, rating: 4.2 },
  { id: 3, name: 'Office Chair', category: 'Furniture', price: 299.99, stock: 8, rating: 4.5 },
  { id: 4, name: 'Desk Lamp', category: 'Furniture', price: 89.99, stock: 25, rating: 4.0 },
  { id: 5, name: 'Coffee Maker', category: 'Appliances', price: 199.99, stock: 0, rating: 4.7 },
];

// Column definitions
const userColumns: Column<Record<string, any>>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Admin' ? 'bg-purple-100 text-purple-800' :
        value === 'Editor' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'active' ? 'bg-green-100 text-green-800' :
        value === 'inactive' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'joinDate',
    header: 'Join Date',
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString(),
  },
];

const productColumns: Column<Record<string, any>>[] = [
  {
    key: 'name',
    header: 'Product Name',
    sortable: true,
  },
  {
    key: 'category',
    header: 'Category',
    sortable: true,
  },
  {
    key: 'price',
    header: 'Price',
    sortable: true,
    render: (value) => `$${value.toFixed(2)}`,
  },
  {
    key: 'stock',
    header: 'Stock',
    sortable: true,
    render: (value) => (
      <span className={`font-medium ${
        value === 0 ? 'text-red-600' :
        value < 10 ? 'text-yellow-600' :
        'text-green-600'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'rating',
    header: 'Rating',
    sortable: true,
    render: (value) => (
      <div className="flex items-center">
        <span className="text-yellow-400">★</span>
        <span className="ml-1">{value}</span>
      </div>
    ),
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DataTable Component

A comprehensive data table component with sorting, selection, and loading states.

## Features
- ✅ Column sorting with custom sort functions
- ✅ Row selection (single or multiple)
- ✅ Loading and empty states
- ✅ Custom cell rendering
- ✅ Full accessibility support
- ✅ Responsive design
- ✅ TypeScript generic support

## Accessibility
- Full keyboard navigation support
- Screen reader compatible with proper ARIA attributes
- Focus management and visual indicators
- Semantic table structure with proper roles
        `,
      },
    },
  },
  argTypes: {
    data: {
      description: 'Array of data objects to display',
      control: false,
    },
    columns: {
      description: 'Column configuration array',
      control: false,
    },
    loading: {
      control: 'boolean',
      description: 'Whether the table is in loading state',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether rows can be selected',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether multiple rows can be selected',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when no data is available',
    },
    onRowSelect: { action: 'row-selected' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    data: users,
    columns: userColumns,
    onRowSelect: action('row-selected'),
  },
};

export const WithSelection: Story = {
  args: {
    data: users,
    columns: userColumns,
    selectable: true,
    multiSelect: true,
    onRowSelect: action('row-selected'),
  },
};

export const SingleSelection: Story = {
  args: {
    data: users,
    columns: userColumns,
    selectable: true,
    multiSelect: false,
    onRowSelect: action('row-selected'),
  },
};

export const LoadingState: Story = {
  args: {
    data: users,
    columns: userColumns,
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: 'No users found. Try adjusting your search criteria.',
  },
};

// Different data types
export const ProductsTable: Story = {
  args: {
    data: products,
    columns: productColumns,
    selectable: true,
    onRowSelect: action('product-selected'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with different data type showing custom rendering and sorting.',
      },
    },
  },
};

// Custom sorting example
export const CustomSorting: Story = {
  args: {
    data: users,
    columns: [
      ...userColumns.slice(0, -1),
      {
        key: 'joinDate',
        header: 'Join Date',
        sortable: true,
        sortFunction: (a: Record<string, any>, b: Record<string, any>) => {
          return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        },
        render: (value: string) => new Date(value).toLocaleDateString(),
      },
    ] as Column<User>[],
    onRowSelect: action('row-selected'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom sort function for date columns.',
      },
    },
  },
};

// Complex rendering
export const ComplexRendering: StoryObj<typeof DataTable<User>> = {
  args: {
    data: users,
    columns: [
      {
        key: 'name',
        header: 'User',
        sortable: true,
        render: (value: string, row: User) => (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {value.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{row.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'role',
        header: 'Role & Status',
        render: (value: string, row: User) => (
          <div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block mb-1 ${
              value === 'Admin' ? 'bg-purple-100 text-purple-800' :
              value === 'Editor' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {value}
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ml-1 ${
              row.status === 'active' ? 'bg-green-100 text-green-800' :
              row.status === 'inactive' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {row.status}
            </div>
          </div>
        ),
      },
      {
        key: 'joinDate',
        header: 'Member Since',
        sortable: true,
        render: (value: string) => (
          <div>
            <div className="text-sm text-gray-900">
              {new Date(value).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500">
              {Math.floor((Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24))} days ago
            </div>
          </div>
        ),
      },
    ] as Column<User>[],
    selectable: true,
    onRowSelect: action('row-selected'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with complex custom cell rendering including avatars and multiple data points.',
      },
    },
  },
};

// Large dataset example
export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      status: ['active', 'inactive', 'pending'][i % 3] as User['status'],
      joinDate: new Date(2023, i % 12, (i % 28) + 1).toISOString().split('T')[0],
    })),
    columns: userColumns,
    selectable: true,
    multiSelect: true,
    onRowSelect: action('row-selected'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with a larger dataset to test performance and scrolling.',
      },
    },
  },
};

// Responsive example
export const ResponsiveTable: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-medium mb-4">Responsive DataTable</h3>
      <DataTable
        data={products}
        columns={productColumns}
        selectable={true}
        onRowSelect={action('row-selected')}
        className="text-sm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing responsive behavior of the DataTable component.',
      },
    },
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};