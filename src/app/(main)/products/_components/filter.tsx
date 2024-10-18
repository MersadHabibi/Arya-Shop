"use client";

import Icon from "@/components/ui/icon";

import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import { Switch, SwitchThumb } from "@/components/ui/switch";
import { jst } from "@/lib/utils";
import { Brand, Category } from "@/types/entity";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import AccordionSelect from "./accordion-select";

type Props = {
  brands: Brand[];
  categories: Category[];
};

export const MIN_PRICE = 0;
export const MAX_PRICE = 10_000_000;

enum SWITCHES {
  QUANTITY,
  DISCOUNT,
}

const Filter = ({ brands, categories }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState<string>(searchParams.get("query") ?? "");

  const [brand, setBrand] = useState<{ display: string; value: string } | null>(
    searchParams.get("brand")
      ? {
          display: "",
          value: searchParams.get("brand") ?? "",
        }
      : null,
  );

  const [category, setCategory] = useState<{
    display: string;
    value: string;
  } | null>(
    searchParams.get("category")
      ? {
          display: "",
          value: searchParams.get("category") ?? "",
        }
      : null,
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("min"))
      ? Number(searchParams.get("min"))
      : MIN_PRICE,
    Number(searchParams.get("max"))
      ? Number(searchParams.get("max"))
      : MAX_PRICE,
  ]);

  const [quantity, setQuantity] = useState<number>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sp = new URLSearchParams();

    if (query) {
      sp.set("query", query);
    } else {
      sp.delete("query");
    }

    if (brand?.value) {
      sp.set("brand", brand.value);
    } else {
      sp.delete("brand");
    }

    if (category?.value) {
      sp.set("category", category.value);
    } else {
      sp.delete("category");
    }

    if (priceRange[0] > MIN_PRICE) sp.set("min", priceRange[0].toString());
    else sp.delete("min");

    if (priceRange[1] < MAX_PRICE) sp.set("max", priceRange[1].toString());
    else sp.delete("max");

    if (quantity === 0) sp.set("quantity", quantity.toString());
    else sp.delete("quantity");

    router.push(jst("/products", "?", sp.toString()));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex h-fit w-full flex-col gap-8 rounded-xl border border-base-200 bg-base-100 p-4">
      <span className="text-xl font-bold">جستجوی پیشرفته</span>

      <div className="relative w-full">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.currentTarget.value);
          }}
          placeholder="جستجو کنید"
          className="h-12 w-full rounded-lg bg-base-200 px-4 outline-none placeholder:text-base-300"
          type="text"
        />

        <Icon
          icon={RiSearchLine}
          className="absolute inset-y-0 end-4 my-auto !scale-x-100 text-[21px] text-base-300"
        />
      </div>

      <AccordionSelect
        options={categories.map((v) => ({
          display: v.Name,
          value: String(v.Code),
        }))}
        value={category}
        label="دسته‌بندی"
        onChange={(v) => {
          setCategory(v);
        }}
      />

      <AccordionSelect
        options={brands.map((v) => ({
          display: v.Name,
          value: String(v.Code),
        }))}
        value={brand}
        label="برند"
        onChange={(v) => {
          setBrand(v);
        }}
      />

      <div className="flex w-full flex-col gap-3 text-base">
        <span>محدوده قیمت</span>

        <Slider
          dir="ltr"
          className="relative flex h-5 w-full touch-none select-none items-center"
          defaultValue={[
            Number(searchParams.get("min"))
              ? Number(searchParams.get("min"))
              : MIN_PRICE,
            Number(searchParams.get("max"))
              ? Number(searchParams.get("max"))
              : MAX_PRICE,
          ]}
          step={5_000}
          minStepsBetweenThumbs={10}
          min={MIN_PRICE}
          max={MAX_PRICE}
          onValueChange={(event) => setPriceRange(event as [number, number])}>
          <SliderTrack className="relative h-0.5 w-full grow rounded-full bg-base-300">
            <SliderRange className="absolute h-full rounded-full bg-primary" />
          </SliderTrack>

          <SliderThumb className="block size-2 rounded-full bg-primary shadow-md" />
          <SliderThumb className="block size-2 rounded-full bg-primary shadow-md" />
        </Slider>

        <div dir="ltr" className="flex items-center justify-between text-xs">
          <span>{priceRange[0].toLocaleString("fa-IR")} تومان</span>
          <span>{priceRange[1].toLocaleString("fa-IR")} تومان</span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        {[
          {
            key: SWITCHES.QUANTITY,
            title: "فقط کالاهای موجود",
            value: !!searchParams.get("quantity"),
          },
          {
            key: "",
            title: "فقط کالاهای تخفیف‌دار",
            value: false,
          },
          {
            key: "",
            title: "خرید عمده",
            value: false,
          },
        ].map(({ key, title, value }, idx) => (
          <div key={idx} className="flex items-center gap-4 text-base">
            <Switch
              defaultChecked={value}
              dir="ltr"
              className="flex w-12 items-center rounded-full border-2 border-base-200 data-[state=checked]:border-secondary data-[state=checked]:bg-secondary data-[state=unchecked]:bg-base-200"
              onCheckedChange={(value) => {
                if (SWITCHES.QUANTITY === key) {
                  value ? setQuantity(0) : setQuantity(undefined);
                }
              }}>
              <SwitchThumb className="block size-5 rounded-full bg-white transition-all duration-100 data-[state=checked]:ms-[56%]" />
            </Switch>

            <span>{title}</span>
          </div>
        ))}
      </div>

      {/* <Accordion type="single" collapsible>
        <AccordionItem value="val">
          <AccordionTrigger className="flex w-full items-center justify-between border-b border-base-200 py-1 text-base">
            <span>تعداد جعبه</span>

            <Icon icon={RiArrowDownSLine} className="text-[24px]" />
          </AccordionTrigger>

          <AccordionContent className="mt-2 flex flex-col gap-2">
            {[
              "50 جعبه",
              "50 - 100 جعبه",
              "100 - 200 جعبه",
              "بیش از 200 جعبه",
            ].map((t) => {
              return (
                <button className="w-full text-start text-base" key={t}>
                  {t}
                </button>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}

      <button className="btn btn-secondary rounded-xl">اعمال</button>
    </form>
  );
};

export default Filter;
