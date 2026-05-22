import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

type Variant = "primary" | "cancel";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClass =
    "uppercase  flex items-center justify-center gap-2 font-bold px-3 py-1 rounded duration-400 drop-shadow drop-shadow-black/30 active:scale-95";

  const variantClass = {
    primary: "bg-blue-700/50 hover:bg-blue-700 active:hover:bg-blue-800",
    cancel: "bg-red-700/50 hover:bg-red-700 active:hover:bg-red-800",
  };

  const buttonClass = clsx(baseClass, variantClass[variant], className);

  return (
    <button {...props} className={buttonClass}>
      {children}
    </button>
  );
}
