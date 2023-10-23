import React from "react";
import { cn } from "../../utils/utils";

import ErrorMessage from "../ErrorMessage";

interface InputProps {
  label: string;
  placeholder: string;
  value?: string;
  isRequired?: boolean;
  type?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  error?: String;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  isRequired,
  value,
  onChange,
  type,
  className,

  error,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label
        aria-required={isRequired}
        className="mb-2 font-semibold text-md "
        htmlFor={label}
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        className={cn(
          "px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
        name={label}
        type={type}
        id={label}
        required={isRequired}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Input;
