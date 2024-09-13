"use client";

import { RiSearchLine } from "react-icons/ri";
import Icon from "../ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "../ui/popover";
import { useCallback, useEffect, useMemo } from "react";
import { Category } from "@/types/entity";
import { useField } from "@/hooks/use-field";
import { jst } from "@/lib/utils";
import Link from "next/link";
import { env } from "@/env";
import { useRouter } from "next/navigation";

type Props = {
  categories: Category[];
};

const HeaderSearch = ({ categories }: Props) => {
  const router = useRouter();

  // const search = useField({});

  const focusForm = useCallback((node: HTMLInputElement | null) => {
    if (!node) return;

    node.focus();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = e.currentTarget.query?.value as string | undefined;

    if (!query) return;

    router.push(jst("/products?query=", encodeURIComponent(query)));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-12 w-full max-w-md items-center justify-between rounded-lg bg-base-200 px-4">
          <span className="text-base text-base-300">جستجو</span>

          <Icon icon={RiSearchLine} className="!scale-100 text-base-300" />
        </button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent asChild>
          <div className="z-50 -mt-[var(--radix-popover-trigger-height)] hidden w-[var(--radix-popover-trigger-width)] flex-col gap-4 rounded-lg bg-base-200 px-4 pb-3 pt-3 shadow-lg lg:flex">
            <form onSubmit={onSubmit} className="flex items-center">
              <input
                // {...search.register()}
                name="query"
                ref={focusForm}
                className="w-full shrink bg-transparent text-base text-base-content outline-none"
              />

              <Icon
                icon={RiSearchLine}
                className="shrink-0 !scale-100 text-base-300"
              />
            </form>

            {/* <div className="flex w-full flex-col gap-4">
              <span className="text-base text-base-300">جستجوهای اخیر</span>

              <div className="flex gap-3">
                {["خرید عمده", "لوازم جانبی موبایل", "گارانتی کالا"].map(
                  (title, idx) => (
                    <button
                      className="h-12 rounded-full border border-base-300 bg-transparent p-4 leading-none text-base-300"
                      key={idx}
                    >
                      {title}
                    </button>
                  ),
                )}
              </div>
            </div> */}

            {/* <div className="flex max-h-60 w-full  flex-col overflow-y-scroll">
              {results?.map((v) => (
                <Link
                  href={`/products?group=${v.Code}`}
                  key={jst(String(v.Code), v.Name)}
                  className="border-t border-base-300/60 py-4 text-start text-base leading-[1.2] last:pb-0"
                >
                  {v.Name}
                </Link>
              ))}
            </div> */}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};

export default HeaderSearch;
