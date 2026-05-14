import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-blue-700/50 uppercase touch-auto flex items-center justify-center gap-2 font-bold px-3 py-1 rounded hover:bg-blue-700 active:hover:bg-blue-700 duration-400 drop-shadow drop-shadow-black/30 ${className}`}
    >
      {children}
    </button>
  );
}
