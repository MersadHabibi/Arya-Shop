import { Suspense } from "react";
import OrdersList from "./_components/OrdersList";

export default function LastOrdersPage() {
  return (
    <div className="flex flex-col gap-7 lg:gap-24">
      <div className="flex flex-col gap-7">
        <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
          سفارش‌های شما
        </span>

        <Suspense>
          <OrdersList />
        </Suspense>
      </div>
    </div>
  );
}
