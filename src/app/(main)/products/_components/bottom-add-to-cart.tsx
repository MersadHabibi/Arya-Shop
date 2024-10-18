"use client";

import Icon from "@/components/ui/icon";
import useCart from "@/hooks/use-cart";
import useMounted from "@/hooks/use-mounted";
import { Product } from "@/types/entity";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { RiAddLine, RiDeleteBinLine, RiSubtractLine } from "react-icons/ri";

type Props = {
  product: Product;
};

const BottomAddToCart = ({ product }: Props) => {
  const mounted = useMounted();

  const { cart, addToCart, removeFromCart, increment, decrement, isPending } =
    useCart();

  const inCart = useMemo(() => {
    if (!cart.data) return null;

    return (
      cart.data.carts.filter(
        (item) => product.Code === item.product.Code,
      )?.[0] ?? null
    );
  }, [cart.data, product.Code]);

  if (!mounted) return null;

  if (cart.isLoading)
    return (
      <>
        {createPortal(
          <>
            <div className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-between gap-4 border-t border-base-200 bg-base-100 px-5 lg:hidden">
              <div className="flex h-12 w-full shrink grow-0 rounded-btn bg-base-200"></div>

              <p className="shrink-0 text-xs">
                <span>قیمت کالا: </span>
                <span className="text-primary">
                  {((product.price ?? 0) / 10).toLocaleString()} تومان
                </span>
              </p>
            </div>

            <div className="block h-16 w-full lg:hidden"></div>
          </>,
          window.document?.body,
        )}
      </>
    );

  return (
    <>
      {createPortal(
        <>
          <div className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-between gap-4 border-t border-base-200 bg-base-100 px-5 lg:hidden">
            {!inCart && product.quantity > 0 && (
              <button
                disabled={addToCart.isPending}
                onClick={() => {
                  addToCart.mutate({
                    product_id: product.Code,
                    quantity: 1,
                  });
                }}
                className="btn btn-primary btn-block shrink grow-0">
                افزودن به سبد خرید
                {isPending && <span className="loading" />}
              </button>
            )}

            {inCart && product.quantity > 0 && (
              <div className="flex h-12 w-full shrink grow-0 items-center justify-between rounded-btn border border-base-200 px-5">
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
                  <Icon className="text-primary" icon={RiAddLine} />
                </button>

                {isPending ? (
                  <span className="loading text-primary" />
                ) : (
                  <span>{inCart.quantity}</span>
                )}

                {inCart.quantity > 1 ? (
                  <button
                    onClick={() => {
                      decrement.mutate({
                        id: product.Code,
                      });
                    }}
                    disabled={isPending}
                    className="text-primary">
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
            )}

            {!(product.quantity > 0) && (
              <button
                disabled={isPending}
                className="btn btn-block shrink grow-0">
                موجود نمیباشد
              </button>
            )}

            <p className="shrink-0 text-xs">
              <span>قیمت کالا: </span>
              <span className="text-primary">
                {((product.price ?? 0) / 10).toLocaleString()} تومان
              </span>
            </p>
          </div>

          <div className="block h-16 w-full lg:hidden"></div>
        </>,
        window.document?.body,
      )}
    </>
  );
};

export default BottomAddToCart;
