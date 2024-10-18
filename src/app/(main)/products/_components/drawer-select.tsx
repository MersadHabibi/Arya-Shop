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
import { useField } from "@/hooks/use-field";
import { SelectValue } from "@/types/entity";
import { useMemo, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiArrowRightSLine,
} from "react-icons/ri";

type Props = {
  label: string;
  value: SelectValue | null;
  options: SelectValue[];
  onChange: (v: SelectValue | null) => void;
};

const DrawerSelect = ({ label, onChange, options, value }: Props) => {
  const [open, setOpen] = useState(false);
  const search = useField({});

  const result = useMemo(() => {
    if (!search.value) return options;

    return options.filter((v) => v.display.includes(search.value)) || null;
  }, [search.value, options]);

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

            <div className="relative w-full ps-4">
              <input
                {...search.register()}
                placeholder="جستجو..."
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="flex h-full w-full flex-col overflow-y-auto">
            {result.map((item) => (
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

                <Icon icon={RiArrowRightSLine} />
              </button>
            ))}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DrawerSelect;
