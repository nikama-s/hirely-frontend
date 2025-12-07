import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  id: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm shadow-sm ${
            error ? "ring-red-500" : ""
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
