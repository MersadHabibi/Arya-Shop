"use client";

import Link from "next/link";
import useOrders from "./useOrders";
import Pagination from "@/components/pagination";
import { formatOrderStatus } from "@/lib/utils";
import { Suspense } from "react";

export default function OrdersList() {
  const orders = useOrders();

  return (
    <div className="space-y-5">
      {orders.data?.results.length ? (
        <div className="flex w-full items-center justify-between rounded-2xl border border-base-300 px-7 py-3">
          <p className="w-full text-start text-xl font-bold text-secondary">
            کد سفارش
          </p>
          <p className="w-full text-center text-xl font-bold text-secondary">
            وضعیت
          </p>
          <p className="w-full"></p>
        </div>
      ) : null}

      {orders.isLoading ? (
        new Array(4)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="skeleton h-14 w-full rounded-2xl opacity-30"></div>
          ))
      ) : orders.data?.results.length ? (
        orders.data.results.map((order) => (
          <div
            key={order.code}
            className="flex w-full items-center justify-between rounded-2xl border border-base-300 px-7 py-3">
            <p className="w-full text-start text-lg font-medium">
              {order.code}
            </p>
            <p className="w-full text-center text-lg font-medium">
              {formatOrderStatus(order.status)}
            </p>
            <Link
              href={`/profile/orders/${order.code}`}
              className="w-full text-end text-lg font-medium text-primary">
              مشاهده
            </Link>
          </div>
        ))
      ) : (
        <p className="py-12 text-center text-xl font-bold">
          شما سفارشی ثبت نکرده اید.
        </p>
      )}

      {!!orders.data?.results.length ? (
        <div className="flex w-full items-center justify-center pt-4">
          <Suspense>
            <Pagination
              pageKey="page"
              pageSize={8}
              count={orders.data?.count}
              next={orders.data?.next}
              previous={orders.data?.previous}
            />
          </Suspense>
        </div>
      ) : null}
    </div>
  );
}
