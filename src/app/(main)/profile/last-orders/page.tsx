export default function LastOrdersPage() {
  return (
    <div className="flex flex-col gap-7 lg:gap-24">
      <div className="hidden flex-col gap-7 lg:flex">
        <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
          سفارش‌های اخیر شما
        </span>

        <div className="flex flex-col gap-3">
          {Array(3)
            .fill("")
            .map((_, idx) => (
              <div
                key={idx}
                className="grid w-full grid-cols-[80px_1fr] gap-2 overflow-hidden rounded-2xl border border-base-200 p-4 min-[300px]:grid-cols-[200px_1fr]">
                <div className="aspect-square w-full rounded-lg bg-base-200"></div>

                <div className="relative flex justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    <span className="text-[40px] font-bold leading-tight">
                      شرح نام کالا
                    </span>

                    <span className="text-base">
                      توضیحات کالا در این قسمت نوشته شود.
                    </span>

                    <span className="text-base text-base-300">
                      گارانتی اصالت و سلامت فیزیکی کالا
                    </span>

                    <span className="text-base text-base-300">
                      ویژگی: رنگ، مدل
                    </span>

                    <div className="grid w-full">
                      <div className="relative flex items-center justify-between overflow-hidden">
                        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary">
                          {"موجودی: " + "10"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col">
                    <del className="text-base-300 line-through">
                      100.000 تومان
                    </del>

                    <span className="text-base font-black text-secondary">
                      80.000 تومان
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <div className="relative flex w-full flex-col gap-7">
        <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
          بازدیدهای اخیر
        </span>

        <div className="grid w-full">
          <Caruseal length={9} className="w-full">
            <div className="embla__container flex gap-3">
              {Array(9)
                .fill("")
                .map((_, idx) => (
                  <ProductCard
                    key={idx}
                    className="embla__slide shrink-0 select-none border border-base-200"
                  />
                ))}
            </div>
          </Caruseal>
        </div>
      </div> */}

      {/* <div className="flex flex-col gap-7">
        <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
          کالاهای پیشنهادی
        </span>

        <div className="grid w-full">
          <Caruseal length={9} className="w-full">
            <div className="embla__container flex gap-3">
              {Array(9)
                .fill("")
                .map((_, idx) => (
                  <ProductCard
                    key={idx}
                    className="embla__slide shrink-0 select-none border border-base-200"
                  />
                ))}
            </div>
          </Caruseal>
        </div>
      </div> */}
    </div>
  );
}
