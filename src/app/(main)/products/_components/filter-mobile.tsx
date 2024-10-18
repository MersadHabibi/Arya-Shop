"use client";

import { jst } from "@/lib/utils";
import { Brand, Category } from "@/types/entity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DrawerSelect from "./drawer-select";
import PriceRange from "./PriceRange";
import QuantityFilter from "./QuantityFilter";

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

            q.set("category", v.value);

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

            q.set("brand", v.value);

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

        <QuantityFilter
          label="موجودی"
          onChange={(v) => {
            if (!v) return;

            if (v.value === "0") {
              const q = new URLSearchParams(Array.from(searchParams.entries()));

              q.set("quantity", v.value);

              router.push(jst(pathname, "?", q.toString()));
            } else {
              const q = new URLSearchParams(Array.from(searchParams.entries()));

              q.delete("quantity");

              router.push(jst(pathname, "?", q.toString()));
            }
          }}
          options={[
            {
              display: "فقط کالاهای موجود",
              value: "0",
            },
            {
              display: "همه کالاها",
              value: "",
            },
          ]}
          value={
            searchParams.get("quantity")
              ? {
                  display: "فقط کالاهای موجود",
                  value: "0",
                }
              : {
                  display: "همه کالاها",
                  value: "",
                }
          }
        />

        <PriceRange />
      </div>
    </>
  );
};

export default FilterMobile;
