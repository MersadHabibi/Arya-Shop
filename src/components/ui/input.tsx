"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
};

const Input = React.forwardRef<React.ElementRef<"input">, Props>(
  ({ className, label, ...props }, ref) => (
    <>
      <input
        placeholder=" "
        ref={ref}
        {...props}
        className={cn(
          "peer w-full rounded-2xl bg-base-200 px-5 text-base outline-none lg:text-lg",
          className,
        )}
      />
      <span className="pointer-events-none absolute inset-0 mb-auto ms-5 h-fit text-[8px] leading-[1.6] transition-[margin-top_,_margin-bottom,font-size] peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-xs lg:text-sm lg:peer-placeholder-shown:text-lg">
        {label}
      </span>
    </>
  ),
);

Input.displayName = "input";

export default Input;
