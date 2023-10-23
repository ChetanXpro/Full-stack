import React, { useState, useRef, useEffect, ReactNode } from "react";
import ErrorMessage from "../ErrorMessage";

interface CustomDropdownProps {
  options: { label: string; value: string }[];
  onSelect: (option: { label: string; value: string }) => void;
  label: string;
  defaultOption: string;
  isRequired?: boolean;
  error?: String;
  selectedOption?: String;
  setSelectedOption?: any;
}

const CustomDropdown = ({
  options,
  onSelect,
  label,
  error,
  defaultOption,
  isRequired,
  selectedOption,
  setSelectedOption,
}: CustomDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: { label: string; value: string }) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  const handleClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  //   // Attach click outside event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 font-semibold text-md ">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div
        className="bg-gray-300 cursor-pointer hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg focus:outline-none w-full"
        onClick={toggleDropdown}
      >
        {selectedOption || "Select " + label}
        <span className="absolute right-2 top-9">
          <svg
            className={`h-4 w-4 ${isOpen ? "transform rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg">
          <ul>
            {options.map((option: { label: string; value: string }, index) => (
              <li
                key={index}
                onClick={() => {
                  handleOptionClick(option);
                }}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default CustomDropdown;
