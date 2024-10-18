import Input from "@/components/modules/Input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import { jst } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowLeftLine
} from "react-icons/ri";
import { MAX_PRICE, MIN_PRICE } from "./filter";

export default function PriceRange() {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("min"))
      ? Number(searchParams.get("min"))
      : MIN_PRICE,
    Number(searchParams.get("max"))
      ? Number(searchParams.get("max"))
      : MAX_PRICE,
  ]);

  const onSubmit = () => {
    const queries = new URLSearchParams(Array.from(searchParams.entries()));

    queries.delete("min");
    queries.delete("max");

    queries.append("min", priceRange[0].toString());
    queries.append("max", priceRange[1].toString());

    router.push(jst("/products", "?", queries.toString()));

    setOpen(false);
  };

  const onRemove = () => {
    const queries = new URLSearchParams(Array.from(searchParams.entries()));

    queries.delete("min");
    queries.delete("max");

    router.push(jst("/products", "?", queries.toString()));

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex h-9 min-h-9 shrink-0 items-center justify-center gap-2.5 rounded-full border border-primary px-2 text-base font-normal hover:border-primary">
          <span className="shrink-0">محدوده قیمت</span>

          <Icon icon={RiArrowDownSLine} />
        </button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/50 lg:hidden" />

        <DialogContent className="fixed inset-0 top-auto z-50 flex h-fit flex-col items-center bg-base-100 lg:hidden">
          <div className="relative flex h-14 w-full items-center px-6">
            <DialogClose asChild>
              <button className="shrink-0">
                <Icon className="text-[24px]" icon={RiArrowLeftLine} />
              </button>
            </DialogClose>
          </div>

          <div className="w-full px-6">
            <div className="flex items-center gap-x-4 pb-6 pt-2">
              <div className="relative w-full">
                <p className="absolute bottom-0 left-3 top-0 m-auto h-fit text-sm text-base-300">
                  تومان
                </p>
                <p className="absolute bottom-0 right-3 top-0 m-auto h-fit text-sm text-base-300">
                  از
                </p>
                <Input
                  name="from"
                  defaultValue={
                    Number(searchParams.get("min"))
                      ? Number(searchParams.get("min"))
                      : MIN_PRICE
                  }
                  value={priceRange[0].toString()}
                  onChange={(event) => {
                    setPriceRange([
                      Number(event.currentTarget.value) > MAX_PRICE
                        ? MAX_PRICE
                        : Number(event.currentTarget.value),
                      priceRange[1],
                    ]);
                  }}
                  placeholder="قیمت"
                  className="h-10 border-base-200 pl-14 pr-8 text-sm"
                  type="number"
                />
              </div>
              <div className="relative w-full">
                <p className="absolute bottom-0 left-3 top-0 m-auto h-fit text-sm text-base-300">
                  تومان
                </p>
                <p className="absolute bottom-0 right-3 top-0 m-auto h-fit text-sm text-base-300">
                  تا
                </p>
                <Input
                  name="to"
                  defaultValue={
                    Number(searchParams.get("max"))
                      ? Number(searchParams.get("max"))
                      : MAX_PRICE
                  }
                  value={priceRange[1].toString()}
                  onChange={(event) => {
                    setPriceRange([
                      priceRange[0],
                      Number(event.currentTarget.value) < priceRange[0]
                        ? priceRange[0]
                        : Number(event.currentTarget.value) > MAX_PRICE
                          ? MAX_PRICE
                          : Number(event.currentTarget.value),
                    ]);
                  }}
                  placeholder="قیمت"
                  className="h-10 border-base-200 pl-14 pr-8 text-sm"
                  type="number"
                />
              </div>
            </div>
            <div className="w-full px-2">
              <Slider
                dir="rtl"
                className="relative flex h-5 w-full touch-none select-none items-center"
                defaultValue={[
                  Number(searchParams.get("min"))
                    ? Number(searchParams.get("min"))
                    : MIN_PRICE,
                  Number(searchParams.get("max"))
                    ? Number(searchParams.get("max"))
                    : MAX_PRICE,
                ]}
                value={[priceRange[0], priceRange[1]]}
                step={5_000}
                minStepsBetweenThumbs={10}
                min={MIN_PRICE}
                max={MAX_PRICE}
                onValueChange={(event) =>
                  setPriceRange(event as [number, number])
                }>
                <SliderTrack className="relative h-0.5 w-full grow rounded-full bg-base-300">
                  <SliderRange className="absolute h-full rounded-full bg-primary" />
                </SliderTrack>

                <SliderThumb className="block size-2 rounded-full bg-primary shadow-md" />
                <SliderThumb className="block size-2 rounded-full bg-primary shadow-md" />
              </Slider>

              <div
                dir="ltr"
                className="flex items-center justify-between text-xs">
                <span>تا {priceRange[1].toLocaleString("fa-IR")} تومان</span>
                <span>از {priceRange[0].toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>
            <div className="flex items-center gap-x-4 py-6">
              <button
                className="h-11 w-full rounded-md bg-primary font-medium text-white"
                onClick={onSubmit}>
                اعمال فیلتر
              </button>
              <button
                className="h-11 w-full rounded-md border border-red-500 font-medium text-red-500"
                onClick={onRemove}>
                حذف فیلتر
              </button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
