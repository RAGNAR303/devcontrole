"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // register: UseFormRegister<any>;
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, name, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm md:text-xl font-bold">{label}</label>
        )}

        <input
          {...rest}
          ref={ref}
          name={name}
          id={name}
          className={`py-1 px-3 bg-slate-700/35 rounded outline-0 border border-slate-500/50 focus:ring
           ${error && "border-red-500 focus:ring-red-500 "}`}
        />
        {error && <p className="text-red-500 my-1 text-sm ">{error}</p>}
      </div>
    );
  },
);


