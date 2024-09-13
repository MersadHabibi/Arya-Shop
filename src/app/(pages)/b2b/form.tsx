"use client";

import Input from "@/components/ui/input";
import { cn, jst } from "@/lib/utils";
import { Fragment, useId, useState } from "react";

const steps = [
  {
    title: "ثبت نام",
  },
  {
    title: "ارسال مدارک",
  },
  {
    title: "تایید مدارک",
  },
  {
    title: "ثبت سفارش",
  },
];

const B2BForm = () => {
  const [step, setStep] = useState(0);

  const id = useId();

  return (
    <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-7 lg:flex-row lg:gap-24">
      <div className="flex h-fit w-full shrink-0 justify-between lg:w-fit lg:flex-col">
        {steps.map((item, idx, list) => (
          <Fragment key={idx}>
            <div
              className={cn(
                "flex flex-col items-center gap-3  lg:flex-row",
                idx === step ? "text-secondary" : "text-primary",
              )}
            >
              <span
                className={cn(
                  "size-10 rounded-full border-8 lg:size-[54px]",
                  step === idx
                    ? " border-secondary bg-secondary"
                    : " border-primary bg-white",
                )}
              />

              <span className="text-sm max-lg:text-center lg:text-[40px] lg:font-bold">
                {item.title}
              </span>
            </div>

            {idx < list.length - 1 && <Saprator />}
          </Fragment>
        ))}
      </div>

      {step === 0 && (
        <div className="flex w-full flex-col gap-4">
          <div className="grid gap-4">
            <div className="relative">
              <Input
                label="نام شخص یا شرکت:"
                className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-[84px]"
              />
            </div>

            <div className="relative">
              <Input
                label="شماره تماس:"
                className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-[84px]"
              />
            </div>

            <div className="relative">
              <Input
                label="آدرس ایمیل:"
                className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-[84px]"
              />
            </div>

            <div className="relative">
              <Input
                label="نام شرکت:"
                className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-[84px]"
              />
            </div>
          </div>

          <button className="btn btn-primary ms-auto h-12 w-full rounded-lg px-20 text-base lg:w-fit">
            ثبت نام
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="flex w-full flex-col gap-4">
          <div className="grid gap-4">
            <div className="relative h-40 w-full">
              <input type="file" className="hidden" id={jst(id, "file")} />
              <label
                className="flex h-full w-full rounded-xl p-6 shadow-md"
                htmlFor={jst(id, "file")}
              >
                <span className="text-primary">مدارک خود را آپلود کنید</span>
              </label>
            </div>
            <textarea
              placeholder=":توضیحات"
              className="mt-6 h-40 w-full resize-none rounded-xl p-6 shadow-md"
            />
          </div>

          <button className="btn btn-primary ms-auto h-12 w-full rounded-lg px-20 text-base lg:w-fit">
            تایید کنید
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex w-full flex-col gap-4">
          <div className="grid gap-4">
            <div className="grid h-96 w-full place-items-center rounded-xl p-6 shadow-md">
              <span className="text-primary">
                مدارک شما در صف تایید می‌باشند
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Saprator = () => {
  return (
    <div className="relative flex h-10 w-full shrink items-center justify-center lg:h-20 lg:w-[54px]">
      <span className="inline-block h-2 w-[calc(100%_-_(8px_*_2))] rounded-full bg-primary lg:h-[calc(100%_-_(8px_*_2))] lg:w-2" />
    </div>
  );
};

export default B2BForm;
