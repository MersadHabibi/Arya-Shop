"use client";

import useOrder from "@/hooks/use-order";
import { useState } from "react";
import usePayment from "./_components/usePayment";

export default function PaymentPage({ params }: { params: { id: string } }) {
  const order = useOrder({ orderId: params.id });

  const { payByWallet, payByGateway } = usePayment();

  const [selectedPayWay, setSelectedPayWay] = useState<"online" | "wallet">(
    "online",
  );

  const onPayment = () => {
    if (selectedPayWay === "online") {
      payByGateway.mutate({
        orderId: params.id,
      });

      return;
    }

    payByWallet.mutate({
      orderId: params.id,
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-3 px-5 lg:grid lg:grid-cols-[1fr_340px] lg:px-20">
      <div className="flex w-full flex-col gap-x-24 gap-y-5">
        <div className="flex w-full flex-col gap-6">
          <span className="relative block w-fit bg-primary p-4 text-center text-xl font-bold leading-tight text-white max-lg:w-full max-lg:rounded-xl lg:rounded-e-2xl lg:px-16 lg:py-3 xl:text-[40px]">
            <span className="absolute inset-y-0 end-full hidden w-svw bg-primary lg:block" />
            پرداخت
          </span>
        </div>
        <div className="w-full space-y-3 rounded-2xl border border-base-300 p-5">
          <label className="flex w-fit cursor-pointer items-center gap-x-3">
            <input
              type="radio"
              name="payWay"
              className="size-5 checked:bg-blue-500"
              onChange={() => setSelectedPayWay("online")}
              defaultChecked
            />
            <span className="mb-0.5 text-base">پرداخت اینترنتی</span>
          </label>
          <label className="flex w-fit cursor-pointer items-center gap-x-3">
            <input
              type="radio"
              name="payWay"
              className="size-5 checked:bg-blue-500"
              onChange={() => setSelectedPayWay("wallet")}
            />
            <span className="mb-0.5 text-base">کیف پول</span>
          </label>
        </div>
      </div>

      <div className="relative mt-10 block max-lg:mb-12">
        <div className="sticky top-[calc(var(--header-height)_+_12px)] flex h-fit flex-col gap-6 rounded-2xl border border-base-200 p-4">
          <div className="flex items-center justify-between">
            <span>قیمت کالاها ({order.data?.amount}):</span>

            <span>
              {((order.data?.total ?? 0) / 10).toLocaleString("fa-IR")} تومان
            </span>
          </div>

          {/* <div className="flex items-center justify-between text-primary">
            <span>هزینه ارسال:</span>

            <span>
              {order.data?.pay_way
                ? order.data?.pay_way.price
                  ? `${order.data?..price.toLocaleString("fa-IR")} تومان`
                  : "رایگان"
                : "رایگان"}
            </span>
          </div> */}

          <div className="flex items-center justify-between">
            <span>مبلغ قابل پرداخت:</span>
            <span>
              {((order.data?.total ?? 0) / 10).toLocaleString("fa-IR")} تومان
            </span>{" "}
          </div>

          <button
            onClick={onPayment}
            disabled={payByGateway.isPending || payByWallet.isPending}
            className="btn btn-primary btn-md btn-block">
            پرداخت
          </button>
        </div>
      </div>
    </div>
  );
}
