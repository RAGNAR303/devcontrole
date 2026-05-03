"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { RegisterOptions, UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
  type: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  label?: string;
  name: string;
  placeholder: string;
}

export function Input({
  placeholder,
  type,
  error,
  label,
  register,
  rules,
  name,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor="" className="text-sm font-bold">
          {label}
        </label>
      )}

      <input
        placeholder={placeholder}
        {...register(name, rules)}
        {...props}
        id={name}
        className={`py-1 px-3 bg-slate-700/35 rounded outline-0 border border-slate-500/50 focus:ring
           ${error && "border-red-500 focus:ring-red-500 "}`}
      />
      {error && <p className="text-red-500 my-1 text-sm ">{error}</p>}
    </div>
  );
}
