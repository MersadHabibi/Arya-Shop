"use client";

import Icon from "@/components/ui/icon";
import { RiSearchLine } from "react-icons/ri";
import MobileSelect from "./mobile-select";
import DrawerSelect from "./drawer-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Brand, Category } from "@/types/entity";
import { jst } from "@/lib/utils";

type Props = {
  brands: Brand[];
  categories: Category[];
};

const FilterMobile = ({ brands, categories }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <div className="flex items-center gap-3 overflow-x-auto">
        <DrawerSelect
          label="دسته بندی"
          onChange={(v) => {
            if (!v) return;

            const q = new URLSearchParams(Array.from(searchParams.entries()));

            q.set("brand", v.value);

            router.push(jst(pathname, "?", q.toString()));
          }}
          options={categories?.map((v) => ({
            display: v.Name,
            value: String(v.Code),
          }))}
          value={
            searchParams.get("category")
              ? {
                  value: searchParams.get("category")!,
                  display: "",
                }
              : null
          }
        />

        <DrawerSelect
          label="برند"
          onChange={(v) => {
            if (!v) return;

            const q = new URLSearchParams(Array.from(searchParams.entries()));

            q.set("category", v.value);

            router.push(jst(pathname, "?", q.toString()));
          }}
          options={brands?.map((v) => ({
            display: v.Name,
            value: String(v.Code),
          }))}
          value={
            searchParams.get("brand")
              ? {
                  value: searchParams.get("brand")!,
                  display: "",
                }
              : null
          }
        />
      </div>
    </>
  );
};

export default FilterMobile;
