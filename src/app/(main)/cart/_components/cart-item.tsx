"use client";

import Icon from "@/components/ui/icon";
import { env } from "@/env";
import useCart from "@/hooks/use-cart";
import useProduct from "@/hooks/use-products";
import { jst } from "@/lib/utils";
import { CartResponseItem } from "@/types/entity";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiImage2Line,
  RiSubtractLine,
} from "react-icons/ri";

type Props = {
  data: CartResponseItem;
};

const CartItem = ({ data }: Props) => {
  const { removeFromCart, increment, decrement, isPending } = useCart();

  const product = useProduct({ id: data.product.Code });

  return (
    <div className="grid w-full grid-cols-[80px_1fr] gap-4 overflow-hidden rounded-2xl border border-base-200 p-4 min-[300px]:grid-cols-[104px_1fr] lg:grid-cols-[200px_1fr] lg:gap-4">
      <div className="relative flex h-full w-full flex-col gap-4">
        <Link
          href={jst(
            "/products/",
            data!.product.Name.replaceAll(" ", "-"),
            "-",
            String(data!.product.Code),
          )}
          className="relative aspect-square w-full">
          {data.product?.galleries?.image ? (
            <Image
              fill
              src={env.NEXT_PUBLIC_IMAGE_URL + data.product.galleries.image}
              alt=""
            />
          ) : (
            <div className="grid size-full place-items-center rounded-lg bg-base-200">
              <Icon
                icon={RiImage2Line}
                className="text-[40px] text-base-300 lg:text-[60px]"
              />
            </div>
          )}
        </Link>

        <div className="my-aut grid h-12 grid-cols-3 place-items-center rounded-lg border border-base-200 px-2 text-secondary lg:h-16 lg:px-4">
          <button
            onClick={() => {
              if (data.quantity >= (product.data?.quantity ?? 0))
                return toast.error("محصول بیشتری موجود نیست!");

              increment.mutate({
                id: data.product.Code,
              });
            }}
            disabled={
              isPending || data.quantity >= (product.data?.quantity ?? 0)
            }
            className="disabled:opacity-70">
            <Icon className="lg:text-[28px]" icon={RiAddLine} />
          </button>

          {isPending ? (
            <span className="loading loading-spinner text-primary" />
          ) : (
            <span className="lg:text-lg">{data.quantity}</span>
          )}

          {data.quantity > 1 ? (
            <button
              onClick={() => {
                decrement.mutate({
                  id: data.product.Code,
                });
              }}
              disabled={isPending}>
              <Icon className="lg:text-[28px]" icon={RiSubtractLine} />
            </button>
          ) : (
            <button
              onClick={() => {
                removeFromCart.mutate({
                  id: data.id,
                });
              }}
              disabled={isPending}>
              <Icon
                className="text-error lg:text-[28px]"
                icon={RiDeleteBinLine}
              />
            </button>
          )}
        </div>
      </div>

      <div className="relative flex justify-between gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-xl leading-tight lg:text-2xl lg:font-bold">
            {data.product.Name}
          </span>

          {/* <span className="text-base">
                          توضیحات کالا در این قسمت نوشته شود.
                        </span> */}

          <span className="text-base text-base-300">
            گارانتی اصالت و سلامت فیزیکی کالا
          </span>
          <p className="mb-1 mt-1 text-base text-primary lg:mt-2">
            موجودی: {product.data?.quantity}
          </p>

          <span className="mb-3 mt-auto text-base font-black text-secondary lg:mb-4 lg:text-xl">
            {((data.amount ?? 0) / 10).toLocaleString()} تومان
          </span>
        </div>

        {/* <div className="mt-auto hidden flex-col lg:flex">
          <del className="text-base-300 line-through">100.000 تومان</del>

          <span className="text-base font-black text-secondary">
            80.000 تومان
          </span>

          <div className="grid h-12 grid-cols-3 place-items-center rounded-lg border border-base-200 px-2 text-secondary">
            <button>
              <Icon icon={RiAddLine} />
            </button>

            <span>1</span>

            <button>
              <Icon icon={RiSubtractLine} />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CartItem;
