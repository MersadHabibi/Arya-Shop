import { env } from "@/env";
import {
  convertPersianToEnglishDigits,
  formatOrderStatus,
  getPersianMonthName,
  jst,
} from "@/lib/utils";
import { TOrder } from "@/types/entity";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrderProductCard from "./_components/OrderProductCard";

export default async function OrderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const cookieStore = cookies();

  let res: any;

  try {
    res = await fetch(jst(env.BACKEND_URL, `/api/order/${params.id}`), {
      headers: {
        Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
      },
    });
  } catch (error) {
    if (error) return redirect("/profile/orders");
  }

  const order: TOrder = await res.json();

  const createdAt = new Date(order.create_at).toLocaleDateString().split("/");

  return (
    <div className="flex flex-col gap-7 lg:gap-24">
      <div className="flex flex-col gap-7">
        <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
          جزئیات سفارش
        </span>

        <div className="space-y-5">
          <div className="flex w-full flex-col justify-between gap-y-3 rounded-2xl border border-base-300 px-7 py-4 text-base font-medium sm:flex-row sm:items-center sm:text-lg md:text-xl">
            <p>کد پیگیری سفارش: {order.code}</p>
            <p>
              تاریخ ثبت سفارش:{" "}
              <span>
                {createdAt[2]}{" "}
                {getPersianMonthName(
                  convertPersianToEnglishDigits(createdAt[1]),
                )}{" "}
                {createdAt[0]}
              </span>
            </p>
          </div>
          <div className="w-full rounded-2xl border border-base-300 px-7 py-4 text-xl font-medium">
            <p className="text-base text-[#6A6A6A]">آدرس تحویل سفارش</p>
            <p className="mb-2 mt-3 text-xl font-extrabold sm:text-2xl md:text-[28px]/10">
              {order.address_address}
            </p>
            <p className="text-lg font-normal sm:text-xl md:text-2xl">
              {order.address_full_name}
            </p>
          </div>
          <div className="flex w-full flex-col flex-wrap justify-between gap-x-4 gap-y-3 rounded-2xl border border-base-300 px-7 py-4 text-base font-medium sm:flex-row sm:items-center md:text-xl lg:text-base xl:text-xl">
            <div>
              <p>وضعیت: {formatOrderStatus(order.status)}</p>
            </div>
            <div>
              <p>مبلغ کل: {(order.total / 10).toLocaleString("fa-IR")} تومان</p>
            </div>
            <div>
              <p>
                هزینه ارسال: {order.post_way.price.toLocaleString("fa-IR")}{" "}
                تومان
              </p>
            </div>
          </div>
          {order.products.map((product) => (
            <OrderProductCard key={product.product.Code} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
