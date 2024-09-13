"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { useField } from "@/hooks/use-field";
import { useMemo } from "react";
import { RiArrowDownSLine, RiCheckLine, RiSearch2Line } from "react-icons/ri";

type Value = { value: string; display: string };

type Props = {
  options: Value[];
  label: string;
  value: Value | null;
  onChange: (v: Value | null) => void;
};

const AccordionSelect = ({ label, onChange, options, value }: Props) => {
  const search = useField({});

  const result = useMemo(() => {
    if (!search.value) return options;

    return options.filter((v) => v.display.includes(search.value)) || null;
  }, [search.value, options]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="val">
        <AccordionTrigger className="flex w-full items-center justify-between border-b border-base-200 py-1 text-base">
          <span>{label}</span>

          <Icon icon={RiArrowDownSLine} className="text-[24px]" />
        </AccordionTrigger>

        <AccordionContent className="mt-2 flex h-fit max-h-80 flex-col gap-2 overflow-auto">
          <div className="sticky top-0 w-full">
            <Icon
              icon={RiSearch2Line}
              className="absolute inset-y-0 start-0 my-auto"
            />
            <input
              {...search.register()}
              className="w-full pb-3 ps-8 pt-1 outline-none"
              placeholder="جستجو"
            />
          </div>
          {result.map((option) => {
            return (
              <button
                type="button"
                onClick={() => {
                  if (value?.value === option.value) {
                    onChange(null);
                    return;
                  }

                  onChange(option);
                }}
                className="flex w-full items-center justify-between text-start text-base"
                key={option.value}
              >
                {option.display}

                {value?.value === option.value && (
                  <Icon
                    icon={RiCheckLine}
                    className="!scale-x-100 text-[21px]"
                  />
                )}
              </button>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionSelect;
