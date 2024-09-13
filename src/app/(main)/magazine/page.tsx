"use client";

import Profits from "@/components/layout/profits";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-24 px-6 lg:px-20">
        <div className="flex flex-col gap-7">
          <div className="relative flex h-14 w-fit items-center justify-center rounded-2xl bg-primary px-6 text-xl font-semibold text-white max-lg:w-full lg:h-[72px] lg:rounded-s-none lg:px-20 lg:text-4xl lg:font-black">
            مقالات محبوب
            <span className="absolute inset-y-0 end-[100%] h-full w-[100vw] bg-primary max-lg:hidden" />
          </div>

          <div className="grid w-full gap-8 lg:grid-cols-2">
            {Array(4)
              .fill("")
              .map((_, idx) => (
                <article
                  key={idx}
                  className="flex h-60 gap-6 rounded-2xl border border-base-200 p-4"
                >
                  <div className="aspect-square h-full shrink-0 rounded-lg bg-base-200"></div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-[40px] font-bold leading-normal">
                      نام مقاله
                    </h3>

                    <p className="line-clamp-3 text-xl leading-normal">
                      مختصری از شرح مقاله در این قسمت نوشته شود. مختصری از شرح
                      مقاله در این قسمت نوشته شود. مختصری از شرح مقاله در این
                      قسمت نوشته شود....
                    </p>

                    <p className="text-base leading-normal text-secondary">
                      نویسنده: نام و نام خانوادگی
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <div className="relative flex h-14 w-fit items-center justify-center rounded-2xl bg-primary px-6 text-xl font-semibold text-white max-lg:w-full lg:h-[72px] lg:rounded-s-none lg:px-20 lg:text-4xl lg:font-black">
            آخرین مقالات
            <span className="absolute inset-y-0 end-[100%] h-full w-[100vw] bg-primary max-lg:hidden" />
          </div>

          <div className="grid w-full grid-cols-[repeat(auto-fit,300px)] justify-center gap-8">
            {Array(12)
              .fill("")
              .map((_, idx) => (
                <article
                  key={idx}
                  className="flex h-fit flex-col gap-2 rounded-2xl border border-base-200 p-4"
                >
                  <div className="aspect-[26/20] w-full shrink-0 rounded-lg bg-base-200"></div>

                  <div className="flex flex-col gap-2">
                    <h3 className="line-clamp-1 text-xl font-bold leading-normal">
                      نام مقاله
                    </h3>

                    <p className="line-clamp-3 text-xl leading-normal">
                      مختصری از شرح مقاله در این قسمت نوشته شود. مختصری از شرح
                      مقاله در این قسمت نوشته شود. مختصری از شرح مقاله در این
                      قسمت نوشته شود....
                    </p>

                    <p className="text-xl leading-normal text-secondary">
                      نویسنده: نام و نام خانوادگی
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-24 w-full">
        <Profits />
      </div>
    </>
  );
};

export default Page;
