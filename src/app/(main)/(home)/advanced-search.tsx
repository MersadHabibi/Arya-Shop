"use client";

import Select from "@/components/select";
import { jst } from "@/lib/utils";
import { Brand, Category } from "@/types/entity";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  categories: Category[];
  brands: Brand[];
};

const HomeAdvancedSearch = ({ brands, categories }: Props) => {
  const router = useRouter();

  const [brand, setBrand] = useState<{ value: string; display: string } | null>(
    null,
  );
  const [category, setCategory] = useState<{
    value: string;
    display: string;
  } | null>(null);

  const onClick = () => {
    const q = new URLSearchParams();

    if (brand?.value) {
      q.append("brand", brand.value);
    }
    if (category?.value) {
      q.append("category", category.value);
    }

    if (q.size) return;

    router.push(jst("/products?", q.toString()));
  };

  return (
    <div className="z-[1] mx-auto flex h-40 w-full max-w-fit gap-14 rounded-3xl border border-base-200 bg-base-100 px-7 py-9 shadow-lg">
      <div>
        <span className="text-center text-4xl font-extrabold text-secondary">
          جستجو
          <br />
          پیشرفته
        </span>
      </div>

      <span className="relative inset-y-0 w-0.5 bg-base-200" />

      <div className="flex items-center gap-6">
        <Select
          classNames={{
            trigger: "w-72",
          }}
          options={brands.map(({ Code, Name }) => ({
            display: Name,
            value: String(Code),
          }))}
          onChange={(v) => setBrand(v)}
          value={brand}
          label="انتخاب برند"
        />

        <Select
          classNames={{
            trigger: "w-72",
          }}
          options={categories.map(({ Code, Name }) => ({
            display: Name,
            value: String(Code),
          }))}
          onChange={(v) => setCategory(v)}
          value={category}
          label="دسته بندی کالا"
        />

        <button
          onClick={() => onClick()}
          className="btn btn-primary btn-lg rounded-2xl text-2xl font-normal"
        >
          جستجو کنید
        </button>
      </div>
    </div>
  );
};

export default HomeAdvancedSearch;
