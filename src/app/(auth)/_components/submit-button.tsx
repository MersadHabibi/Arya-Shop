"use client";

import { cn } from "@/lib/utils";

type Props = {
  loading?: boolean;
} & React.ComponentPropsWithoutRef<"button">;

const SubmitButton = ({ children, className, loading, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(
        "btn btn-primary mt-8 !h-10 !min-h-0 w-full rounded-2xl text-base font-normal lg:!h-14",
        className,
      )}
    >
      {children}
      {loading && <span className="loading loading-spinner loading-xs" />}
    </button>
  );
};

export default SubmitButton;
