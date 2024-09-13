"use client";

import { RiArrowRightSLine, RiMenuLine } from "react-icons/ri";
import Icon from "../ui/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Category } from "@/types/entity";
import Link from "next/link";

type Props = {
  categories: Category[];
};

const HeaderProductList = ({ categories }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-3 data-[state=open]:text-secondary">
          <Icon icon={RiMenuLine} className="text-lg" />

          <span className="text-base">لیست محصولات</span>
        </button>
      </PopoverTrigger>

      <PopoverContent dir="inherit" asChild align="start">
        <div
          className={cn(
            "mt-2 flex max-h-96 flex-col gap-6 overflow-y-auto rounded-lg border border-base-200 bg-base-100 p-6",
            "data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-16",
          )}
        >
          {categories.map(({ Name, Code }) => (
            <Link
              href={`/products?category=${Code}`}
              key={Code}
              className="flex w-full items-center justify-between gap-2"
            >
              <span className="text-base text-base-content">{Name}</span>

              <Icon icon={RiArrowRightSLine} />
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderProductList;
