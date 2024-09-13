"use client";

import useCart from "@/hooks/use-cart";
import CartItem from "./cart-item";
import CartSkeleton from "./cart-skeleton";

const Cart = () => {
  const { cart } = useCart();

  if (cart.isLoading) return <CartSkeleton />;

  return (
    <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-3 px-5 lg:grid lg:grid-cols-[1fr_340px] lg:px-20">
      <div className="flex w-full flex-col gap-24">
        <div className="flex w-full flex-col gap-6">
          <span className="relative hidden w-fit bg-primary p-4 text-center text-[40px] font-bold leading-tight text-white max-lg:w-full max-lg:rounded-xl lg:block lg:rounded-e-2xl lg:px-16 lg:py-3">
            <span className="absolute inset-y-0 end-full w-svw bg-primary" />
            سبد خرید شما
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
      </div>

      <div className="relative block max-lg:mb-12">
        <div className="sticky top-[calc(var(--header-height)_+_12px)] flex h-fit flex-col gap-6 rounded-2xl border border-base-200 p-4">
          <div className="flex items-center justify-between">
            <span>قیمت کالاها ({cart.data?.carts?.length}):</span>

            <span>
              {((cart.data?.total_price ?? 0) / 10).toLocaleString()} تومان
            </span>
          </div>
          {/* 
          <div className="flex items-center justify-between">
            <span className="text-primary">تخفیف‌ها:</span>

            <span>10.000.000 تومان</span>
          </div> */}

          <div className="flex items-center justify-between">
            <span>مبلغ قابل پرداخت:</span>
            <span>
              {((cart.data?.total_price ?? 0) / 10).toLocaleString()} تومان
            </span>{" "}
          </div>

          <button className="btn btn-primary btn-md btn-block">
            تکمیل خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
