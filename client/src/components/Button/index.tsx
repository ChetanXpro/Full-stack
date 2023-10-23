import React from "react";
import { cn } from "../../utils/utils";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  id?: string;
  className?: string;
  type?: any;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  id,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      id={id}
      type={type}
      className={cn(
        "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-bold py-2 px-4 rounded",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
