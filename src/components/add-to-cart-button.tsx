"use client";

import useCart from "@/hooks/use-cart";
import { Product } from "@/types/entity";
import { useMemo } from "react";
import { RiAddLine, RiDeleteBinLine, RiSubtractLine } from "react-icons/ri";
import Icon from "./ui/icon";
import toast from "react-hot-toast";

type Props = {
  product: Product;
};

const AddToCartButton = ({ product }: Props) => {
  const { cart, addToCart, removeFromCart, increment, decrement, isPending } =
    useCart();

  const inCart = useMemo(() => {
    if (!cart.data) return false;

    return (
      cart.data.carts.find((item) => {
        return product.Code == item.product.Code;
      }) || false
    );
  }, [cart, product]);

  if ((product.quantity ?? 0) < 1)
    return (
      <button
        disabled
        className="btn btn-disabled btn-md btn-block border border-base-200 lg:btn-lg">
        موجود نمیباشد
      </button>
    );

  if (cart.isLoading)
    return (
      <div className="flex h-12 w-full animate-pulse items-center justify-between rounded-btn bg-base-200 px-5 text-lg lg:h-16 lg:px-6" />
    );

  if (inCart) {
    return (
      <div className="flex h-12 w-full items-center justify-between rounded-btn border border-base-200 px-5 text-lg lg:h-16 lg:px-6">
        <button
          onClick={() => {
            if (inCart.quantity >= product.quantity)
              return toast.error("محصول بیشتری موجود نیست!");
            increment.mutate({
              id: product.Code,
            });
          }}
          disabled={isPending || inCart.quantity >= product.quantity}
          className="disabled:opacity-70">
          <Icon className="text-[28px] text-primary" icon={RiAddLine} />
        </button>

        {isPending ? (
          <span className="loading loading-spinner text-primary" />
        ) : (
          <span className="text-lg">{inCart.quantity}</span>
        )}

        {inCart.quantity > 1 ? (
          <button
            onClick={() => {
              decrement.mutate({
                id: product.Code,
              });
            }}
            disabled={isPending}
            className="text-[28px] text-primary">
            <Icon icon={RiSubtractLine} />
          </button>
        ) : (
          <button
            onClick={() => {
              removeFromCart.mutate({
                id: inCart.id,
              });
            }}
            disabled={isPending}
            className="text-[28px] text-error">
            <Icon icon={RiDeleteBinLine} />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      disabled={addToCart.isPending}
      onClick={() => {
        addToCart.mutate({
          product_id: product.Code,
          quantity: 1,
        });
      }}
      className="btn btn-primary btn-md btn-block lg:btn-lg">
      افزودن به سبد خرید
      {addToCart.isPending && <span className="loading loading-spinner" />}
    </button>
  );
};

export default AddToCartButton;
