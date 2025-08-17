// src/components/InputField/InputField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# InputField Component

A flexible and accessible input component with validation states, multiple variants, and optional features.

## Features
- ✅ Multiple variants (filled, outlined, ghost)
- ✅ Three sizes (small, medium, large)  
- ✅ Validation states (invalid, loading, disabled)
- ✅ Optional clear button and password toggle
- ✅ Full accessibility support with ARIA attributes
- ✅ Dark/light theme support
- ✅ TypeScript definitions

## Accessibility
- Full keyboard navigation support
- Screen reader compatible with proper ARIA labels
- Focus management and visual indicators
- Semantic HTML structure
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input',
      table: {
        type: { summary: 'filled | outlined | ghost' },
        defaultValue: { summary: 'filled' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: 'boolean', 
      description: 'Whether the input is in an invalid state',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading spinner',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show clear button when input has value',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Whether to show password visibility toggle',
    },
    onChange: { action: 'changed' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text here...',
    onChange: fn(),
  },
};

// Variants
export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled Input',
    placeholder: 'This is a filled input',
    helperText: 'This is helper text for the filled variant',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Input',
    placeholder: 'This is an outlined input',
    helperText: 'This is helper text for the outlined variant',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Input', 
    placeholder: 'This is a ghost input',
    helperText: 'This is helper text for the ghost variant',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size input',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium Input',
    placeholder: 'Medium size input (default)',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size input',
  },
};

// States
export const WithError: Story = {
  args: {
    label: 'Input with Error',
    placeholder: 'Enter valid email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 'Disabled value',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Input',
    placeholder: 'Processing...',
    loading: true,
    value: 'Processing data',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    helperText: 'This field is required for form submission',
  },
};

// Features
export const WithClearButton: Story = {
  args: {
    label: 'Input with Clear Button',
    placeholder: 'Type something to see clear button',
    showClearButton: true,
    value: 'Clear me!',
    helperText: 'Click the X button to clear the input',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password Input',
    type: 'password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
    value: 'secretpassword',
    helperText: 'Click the eye icon to toggle password visibility',
  },
};

// Input types
export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email address',
    helperText: 'We\'ll never share your email with anyone else',
  }
};

export const SearchInput: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search for anything...',
    showClearButton: true,
  },
};

// Complex examples
export const FormExample: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <InputField
        label="First Name"
        placeholder="Enter your first name"
        required
        variant="outlined"
      />
      <InputField
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        required
        variant="outlined"
        helperText="We'll use this to send you important updates"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Create a secure password"
        required
        variant="outlined"
        showPasswordToggle
        helperText="Must be at least 8 characters long"
      />
      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        required
        variant="outlined"
        invalid
        errorMessage="Passwords do not match"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A complete form example showing various input states and types.',
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="space-y-4">
          <InputField variant="filled" label="Filled" placeholder="Filled variant" />
          <InputField variant="outlined" label="Outlined" placeholder="Outlined variant" />
          <InputField variant="ghost" label="Ghost" placeholder="Ghost variant" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="space-y-4">
          <InputField size="sm" label="Small" placeholder="Small size" />
          <InputField size="md" label="Medium" placeholder="Medium size" />
          <InputField size="lg" label="Large" placeholder="Large size" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available variants and sizes.',
      },
    },
  },
};