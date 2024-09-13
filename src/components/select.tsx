"use client";

import { RiArrowDownSLine, RiCheckLine, RiSearchLine } from "react-icons/ri";
import { Dropdown, DropdownContent, DropdownTrigger } from "./ui/dropdown-menu";
import Icon from "./ui/icon";
import { useMemo, useState } from "react";
import { useField } from "@/hooks/use-field";
import { cn } from "@/lib/utils";

type Value = { value: string; display: string };

type Props = {
  options: Value[];
  label: string;
  value: Value | null;
  onChange: (v: Value | null) => void;
  classNames?: {
    trigger?: string;
  };
};

const Select = ({ label, options, classNames, onChange, value }: Props) => {
  const [open, setOpen] = useState(false);

  const search = useField({});

  const result = useMemo(() => {
    if (!search.value) return options;

    return options.filter((v) => v.display.includes(search.value)) || null;
  }, [search.value, options]);

  return (
    <Dropdown open={open} onOpenChange={setOpen} modal={false}>
      <DropdownTrigger asChild>
        <button
          className={cn(
            "btn btn-lg justify-start rounded-2xl !text-2xl font-normal outline-none",
            classNames?.trigger,
          )}
        >
          {!value || !value.display ? label : value.display}
          <Icon icon={RiArrowDownSLine} className="ms-auto text-[28px]" />
        </button>
      </DropdownTrigger>

      <DropdownContent asChild align="center">
        <div
          dir="rtl"
          className="group relative flex w-[var(--radix-dropdown-menu-trigger-width)] max-w-[--radix-dropdown-menu-trigger-width] flex-col rounded-2xl bg-base-200"
        >
          <div className="relative flex items-center">
            <Icon
              icon={RiSearchLine}
              className="absolute inset-y-0 start-4 my-auto text-[21px]"
            />
            <input
              {...search.register()}
              className="h-14 w-full bg-transparent ps-12 text-lg outline-none"
              placeholder="جستجو..."
            />
          </div>
          {result?.length ? (
            <div className="flex max-h-72 w-full flex-col gap-4 overflow-y-scroll px-6 py-4">
              {result.map((option) => (
                <button
                  onClick={() => {
                    if (value?.value === option.value) {
                      onChange(null);
                      return;
                    }

                    onChange(option);
                  }}
                  title={option.display}
                  key={option.value}
                  className="flex w-full items-center justify-between gap-2.5 text-start text-2xl"
                >
                  <span>{option.display}</span>

                  {value?.value === option.value && (
                    <Icon
                      icon={RiCheckLine}
                      className="!scale-x-100 text-[21px]"
                    />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-col gap-4 px-6 py-8">
              <span className="text-lg">نتیجه ای یافت نشد</span>
            </div>
          )}
        </div>
      </DropdownContent>
    </Dropdown>
  );
};

export default Select;
