"use client";

import { useAddresses } from "@/hooks/use-addresses";
import useCart from "@/hooks/use-cart";
import { useState } from "react";
import toast from "react-hot-toast";
import CartItem from "../_components/cart-item";
import CompletionSkeleton from "./_components/CompletionSkeleton";
import SelectAddressModal, {
  TOrderAddress,
} from "./_components/SelectAddressModal";
import useCompleteOrder from "./_components/useCompleteOrder";
import usePostWays, { TPostWay } from "./_components/usePostWays";

export default function CompletionPage() {
  const { cart } = useCart();
  const postWays = usePostWays();
  const addresses = useAddresses();
  const completeOrder = useCompleteOrder();

  const [selectedPostWay, setSelectedPostWay] = useState<TPostWay>();
  const [selectedAddress, setSelectedAddress] = useState<TOrderAddress>();

  if (cart.isLoading) return <CompletionSkeleton />;

  const onComplete = () => {
    if (!selectedPostWay) {
      return toast.error("شیوه ارسال را انتخاب کنید.");
    }

    if (!selectedAddress) {
      return toast.error("آدرس را انتخاب کنید.");
    }

    if (!cart.data?.carts.length) {
      return toast.error("محصولی انتخاب نکرده اید.");
    }

    completeOrder.mutate({
      addressId: selectedAddress.id,
      postWayId: selectedPostWay.id,
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-3 px-5 lg:grid lg:grid-cols-[1fr_340px] lg:px-20">
      <div className="flex w-full flex-col gap-x-24 gap-y-16">
        <div className="flex w-full flex-col gap-6">
          <span className="relative block w-fit bg-primary p-4 text-center text-xl font-bold leading-tight text-white max-lg:w-full max-lg:rounded-xl lg:rounded-e-2xl lg:px-16 lg:py-3 xl:text-[40px]">
            <span className="absolute inset-y-0 end-full hidden w-svw bg-primary lg:block" />
            تکمیل سفارش
          </span>

          <div className="w-full rounded-2xl border border-base-200 p-5">
            <div className="flex items-center justify-between">
              <p className="text-base text-[#6A6A6A]">آدرس تحویل سفارش</p>
              <SelectAddressModal
                setSelectedAddress={setSelectedAddress}
                selectedAddress={selectedAddress}
              />
            </div>
            {selectedAddress ? (
              <div className="space-y-2 pt-3">
                <p className="text-[28px]/10 font-extrabold">
                  {selectedAddress.address}
                </p>
                <p className="text-2xl font-normal">
                  {selectedAddress.reciever_name}
                </p>
              </div>
            ) : addresses.data ? (
              <div className="space-y-2 pt-3">
                <p className="text-[28px]/10 font-extrabold">
                  {addresses.data[0].address}
                </p>
                <p className="text-2xl font-normal">
                  {addresses.data[0].reciever_name}
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex w-full flex-col gap-6">
          <span className="relative block w-fit bg-primary p-4 text-center text-xl font-bold leading-tight text-white max-lg:w-full max-lg:rounded-xl lg:rounded-e-2xl lg:px-16 lg:py-3 xl:text-[40px]">
            <span className="absolute inset-y-0 end-full hidden w-svw bg-primary lg:block" />
            سبد خرید نهایی
          </span>

          <div className="flex flex-col gap-3">
            {cart.data?.carts.length ? (
              cart.data?.carts.map((item) => (
                <CartItem key={item.id} data={item} />
              ))
            ) : (
              <div className="py-12">
                <p className="text-center sm:text-2xl">
                  محصولی اضافه نکرده اید
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-6">
          <span className="relative block w-fit bg-primary p-4 text-center text-xl font-bold leading-tight text-white max-lg:w-full max-lg:rounded-xl lg:rounded-e-2xl lg:px-16 lg:py-3 xl:text-[40px]">
            <span className="absolute inset-y-0 end-full hidden w-svw bg-primary lg:block" />
            شیوه ارسال
          </span>
          <div className="w-full space-y-2 rounded-2xl border border-base-200 p-5">
            {postWays.isLoading ? (
              <div className="flex w-full items-center justify-center py-5">
                <span className="loading loading-spinner loading-xs" />
              </div>
            ) : (
              postWays.data?.map((postWay) => (
                <label
                  key={postWay.id}
                  className="flex w-fit cursor-pointer items-center gap-x-3">
                  <input
                    type="radio"
                    name="postWay"
                    className="size-5 checked:bg-blue-500"
                    onChange={() => setSelectedPostWay(postWay)}
                  />
                  <span className="mb-0.5 text-base">{postWay.way}</span>
                </label>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-10 block max-lg:mb-12">
        <div className="sticky top-[calc(var(--header-height)_+_12px)] flex h-fit flex-col gap-6 rounded-2xl border border-base-200 p-4">
          <div className="flex items-center justify-between">
            <span>قیمت کالاها ({cart.data?.carts?.length}):</span>

            <span>
              {((cart.data?.total_price ?? 0) / 10).toLocaleString()} تومان
            </span>
          </div>

          <div className="flex items-center justify-between text-primary">
            <span>هزینه ارسال:</span>

            <span>
              {selectedPostWay
                ? selectedPostWay.price
                  ? `${selectedPostWay.price.toLocaleString()} تومان`
                  : "رایگان"
                : "رایگان"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>مبلغ قابل پرداخت:</span>
            <span>
              {(
                (cart.data?.total_price ?? 0) / 10 +
                (selectedPostWay ? selectedPostWay.price : 0)
              ).toLocaleString()}{" "}
              تومان
            </span>{" "}
          </div>

          <button
            onClick={onComplete}
            disabled={completeOrder.isPending}
            className="btn btn-primary btn-md btn-block">
            ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  );
}
