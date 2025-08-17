// src/components/InputField/InputField.tsx
import React, { useState, forwardRef } from "react";
import type { InputFieldProps } from "./InputField.types";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    loading = false,
    variant = "filled",
    size = "md",
    type = "text",
    showClearButton = false,
    showPasswordToggle = false,
    className = "",
    id,
    name,
    required = false,
    "aria-describedby": ariaDescribedBy,
    ...rest
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || "");

    // Generate unique IDs for accessibility
    const fieldId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = `${fieldId}-helper`;
    const errorId = `${fieldId}-error`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      if (onChange) {
        onChange(e);
      }
    };

    const handleClear = () => {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;

      setInternalValue("");
      if (onChange) {
        onChange(syntheticEvent);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Base classes for different variants
    const variantClasses = {
      filled: "bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500",
      outlined: "bg-transparent border-gray-300 focus:border-blue-500",
      ghost: "bg-transparent border-transparent focus:border-blue-500 focus:bg-gray-50"
    };

    // Size classes
    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base", 
      lg: "px-5 py-4 text-lg"
    };

    // State classes
    const stateClasses = {
      default: "focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
      invalid: "border-red-500 focus:border-red-500 focus:ring-red-500",
      disabled: "bg-gray-100 text-gray-500 cursor-not-allowed opacity-60"
    };

    const inputClasses = [
      "w-full rounded-lg border transition-colors duration-200 outline-none",
      variantClasses[variant],
      sizeClasses[size],
      invalid ? stateClasses.invalid : stateClasses.default,
      disabled ? stateClasses.disabled : "",
      className
    ].filter(Boolean).join(" ");

    const currentType = showPasswordToggle && !showPassword ? "password" : 
                       showPasswordToggle && showPassword ? "text" : type;

    const describedBy = [
      helperText && !invalid ? helperTextId : "",
      errorMessage && invalid ? errorId : "",
      ariaDescribedBy
    ].filter(Boolean).join(" ");

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label 
            htmlFor={fieldId}
            className={`block text-sm font-medium mb-2 ${
              invalid ? "text-red-700" : "text-gray-700"
            } ${disabled ? "text-gray-500" : ""}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            name={name}
            type={currentType}
            value={value !== undefined ? value : internalValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            aria-invalid={invalid}
            aria-describedby={describedBy || undefined}
            className={inputClasses}
            {...rest}
          />

          {/* Loading Spinner */}
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-500 rounded-full"></div>
            </div>
          )}

          {/* Clear Button */}
          {showClearButton && !loading && internalValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Clear input"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}

          {/* Password Toggle */}
          {showPasswordToggle && !loading && !showClearButton && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {/* Helper Text */}
        {helperText && !invalid && (
          <p id={helperTextId} className="mt-2 text-sm text-gray-600">
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {errorMessage && invalid && (
          <p id={errorId} className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;