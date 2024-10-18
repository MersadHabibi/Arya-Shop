"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { SelectValue } from "@/types/entity";
import { useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowLeftLine
} from "react-icons/ri";

type Props = {
  label: string;
  value: SelectValue | null;
  options: SelectValue[];
  onChange: (v: SelectValue | null) => void;
};

export default function QuantityFilter({
  label,
  onChange,
  options,
  value,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex h-9 min-h-9 shrink-0 items-center justify-center gap-2.5 rounded-full border border-primary px-2 text-base font-normal hover:border-primary">
          <span className="shrink-0">{label}</span>

          <Icon icon={RiArrowDownSLine} />
        </button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/50 lg:hidden" />

        <DialogContent className="fixed inset-0 z-50 flex flex-col items-center bg-base-100 lg:hidden">
          <div className="relative flex h-14 w-full items-center px-6">
            <DialogClose asChild>
              <button className="shrink-0">
                <Icon className="text-[24px]" icon={RiArrowLeftLine} />
              </button>
            </DialogClose>
          </div>

          <div className="flex h-full w-full flex-col space-y-2 overflow-y-auto">
            {options.map((item) => (
              <button
                onClick={() => {
                  setOpen(false);

                  if (item.value === value?.value) {
                    onChange(null);
                    return;
                  }

                  onChange(item);
                }}
                type="button"
                className="flex w-full items-center justify-between px-6 py-2 text-lg"
                key={item.value}>
                {item.display}

                <input
                  type="checkbox"
                  checked={item.value === value?.value}
                  className="checkbox-success checkbox"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
