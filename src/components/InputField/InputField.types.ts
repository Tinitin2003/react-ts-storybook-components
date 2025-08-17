// src/components/InputField/InputField.types.ts
export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Current input value */
  value?: string;

  /** Change handler for controlled component */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Label text displayed above the input */
  label?: string;

  /** Placeholder text */
  placeholder?: string;

  /** Helper text displayed below input when valid */
  helperText?: string;

  /** Error message displayed when invalid */
  errorMessage?: string;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Whether the input is in an invalid state */
  invalid?: boolean;

  /** Whether to show loading spinner */
  loading?: boolean;

  /** Visual variant of the input */
  variant?: 'filled' | 'outlined' | 'ghost';

  /** Size of the input */
  size?: 'sm' | 'md' | 'lg';

  /** Input type */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';

  /** Whether to show a clear button when input has value */
  showClearButton?: boolean;

  /** Whether to show password toggle (only works with type="password") */
  showPasswordToggle?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Whether the field is required */
  required?: boolean;
}