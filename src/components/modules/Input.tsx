"use client";

import { cn } from "@/lib/utils";
import { FieldError, UseFormRegister } from "react-hook-form";

export default function Input({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
  value,
  defaultValue,
  onInput,
  // hasHideShowBtn,
  onChange,
  onClick,
}: {
  type?: string;
  placeholder: string;
  name: string;
  register?: UseFormRegister<any>;
  error?:
    | FieldError
    | undefined
    | {
        message: string;
      };
  valueAsNumber?: boolean;
  className?: string;
  value?: string;
  defaultValue?: any;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  // hasHideShowBtn?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}) {
  if (register) {
    return (
      <div className="w-full">
        <div className="relative w-full">
          <input
            type={type || "text"}
            id={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={cn(
              "input w-full rounded-lg !border border-neutral-500 bg-transparent px-0 font-medium !outline-none",
              className,
              error && "!border-red-500",
            )}
            value={value}
            onClick={onClick}
            onInput={(event) => onInput && onInput(event)}
            // onChange={(event) => onChange && onChange(event)}
            {...register(name as any, { valueAsNumber })}
          />
        </div>
        {error ? (
          <p className="pt-1 text-start text-xs text-red-500">
            {error?.message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type={type || "text"}
          id={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(
            "input w-full rounded-lg !border border-neutral-500 bg-transparent px-0 font-medium !outline-none",
            className,
            error && "!border-red-500",
          )}
          onClick={onClick}
          value={value}
          onInput={(event) => onInput && onInput(event)}
          onChange={(event) => onChange && onChange(event)}
        />
      </div>
      {error ? (
        <p className="pt-1 text-start text-xs text-red-500">{error?.message}</p>
      ) : null}
    </div>
  );
}
