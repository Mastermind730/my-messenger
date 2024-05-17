"use client";
import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text", // Default type is "text"
  required = false, // Default required to false
  register,
  errors,
  disabled = false, // Default disabled to false
}) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="text-left">
        <label className="block text-left text-md font-semibold " htmlFor={id}>
          {label}
        </label>
      </div>
      <div>
        <input
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(`
          my-3
          form-input
          block
          max-w-full
           w-full
          rounded-md
          border-0
          py-1.5
          text-gray-900
          shadow-sm
          ring-1
          ring-inset
          ring-gray-300
          placeholder:text-gray-400
          focus:ring-2
          focus:ring-inset
          focus:ring-sky-600
          sm:text-sm
          sm:leading-6
          `,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
