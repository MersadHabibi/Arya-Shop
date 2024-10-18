"use client";

import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  const auth = useAuth();

  if (auth.isLoading)
    return (
      <>
        <div className="mx-auto my-36 flex w-full items-center justify-center">
          <span className="loading loading-spinner text-primary" />
        </div>
      </>
    );

  return (
    <div className="flex flex-col gap-y-10">
      <div className="grid grid-cols-1 gap-x-6 rounded-2xl border border-base-200 px-6 py-3 sm:grid-cols-2 sm:px-8 sm:py-5 xl:gap-x-10 xl:px-14">
        <div className="border-b-2 border-base-200 py-4">
          <p className="mb-1 line-clamp-1 text-base font-normal sm:text-lg">
            نام و نام خانوادگی
          </p>
          <p className="line-clamp-1 text-lg font-bold sm:text-xl">
            {auth.data?.name || "-"}
          </p>
        </div>
        <div className="border-b-2 border-base-200 py-4">
          <p className="mb-1 line-clamp-1 text-base font-normal sm:text-lg">
            کد ملی
          </p>
          <p className="line-clamp-1 text-lg font-bold sm:text-xl">
            {auth.data?.national_code || "-"}
          </p>
        </div>
        <div className="border-b-2 border-base-200 py-4">
          <p className="mb-1 line-clamp-1 text-base font-normal sm:text-lg">
            شماره موبایل
          </p>
          <p className="line-clamp-1 text-lg font-bold sm:text-xl">
            {auth.data?.phone_number || "-"}
          </p>
        </div>
        <div className="border-b-2 border-base-200 py-4">
          <p className="mb-1 line-clamp-1 text-base font-normal sm:text-lg">
            ایمیل
          </p>
          <p className="line-clamp-1 text-lg font-bold sm:text-xl">
            {auth.data?.email || "-"}
          </p>
        </div>
        <div className="py-4 sm:border-none">
          <p className="mb-1 line-clamp-1 text-base font-normal sm:text-lg">
            تاریخ تولد
          </p>
          <p className="line-clamp-1 text-lg font-bold sm:text-xl">
            {auth.data?.birthday_date
              ? new Date(auth.data?.birthday_date || "").toLocaleDateString(
                  "fa-IR",
                ) || "-"
              : "-"}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-base-200 px-8 py-7 xl:px-14">
        <p className="text-xl font-bold">اطلاعات حقوقی</p>
        <p className="mt-4 font-normal">
          این گزینه برای کسانی است که نیاز به خرید سازمانی (با فاکتور رسمی و
          گواهی ارزش‌افزوده) دارند.
        </p>
        <button className="mt-5 rounded-md bg-primary px-10 py-3 font-bold text-white">
          ثبت اطلاعات
        </button>
      </div>
    </div>
  );
}
