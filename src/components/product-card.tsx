"use client";

import AddToFavorite from "@/app/(main)/products/[id]/_components/AddToFavorite";
import { cn, getToken, jst } from "@/lib/utils";
import { Product } from "@/types/entity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiHeartFill, RiHeartLine, RiImage2Line } from "react-icons/ri";
import AddToCartButton from "./add-to-cart-button";
import Icon from "./ui/icon";
import { env } from "@/env";

type Props = {
  className?: string;
  data: Product;
};

const ProductCard = ({ className, data }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [favoriteTransition, setFavoriteTransition] = useState(data.favorite);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <article
      className={cn(
        "relative flex h-80 w-[220px] flex-col gap-2 rounded-xl bg-base-100 p-4 [direction:var(--direction)] lg:h-96 lg:w-[290px]",
        className,
      )}>
      {getToken("access") && isClient ? (
        <AddToFavorite
          className={cn(
            "btn absolute right-6 top-6 z-20 !size-fit !min-h-0 !min-w-0 rounded-lg border border-base-200 bg-white p-1.5 text-red-500",
            data.favorite && "text-red-500",
          )}
          favoriteTransition={favoriteTransition}
          product={data}
          setFavoriteTransition={setFavoriteTransition}>
          {favoriteTransition ? (
            <RiHeartFill className="text-2xl" />
          ) : (
            <RiHeartLine className="text-2xl" />
          )}
        </AddToFavorite>
      ) : null}
      <Link
        href={jst(
          "/products/",
          data!.Name.replaceAll(" ", "-"),
          "-",
          String(data!.Code),
        )}
        className="relative aspect-[268/200] w-full overflow-hidden rounded-lg">
        {data?.galleries?.image ? (
          <Image
            alt={data.Name}
            src={env.NEXT_PUBLIC_IMAGE_URL + data.galleries.image}
            className="object-contain"
            fill
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-base-200">
            <Icon
              icon={RiImage2Line}
              className="m-auto text-[48px] text-base-300"
            />
          </div>
        )}
      </Link>

      <p
        // title={data?.Name}
        className="mb-0.5 line-clamp-1 text-base font-bold  lg:text-xl xl:pb-1.5 2xl:pb-1">
        {data?.Name}
      </p>

      <p className="mb-1 mt-auto text-base text-primary">
        موجودی: {data.quantity}
      </p>

      <div className="flex justify-between max-lg:flex-col lg:items-center">
        <span className="text-xl font-black text-secondary">
          {(data?.price || 0) / 10} تومان
        </span>
      </div>

      <AddToCartButton product={data!} />
    </article>
  );
};

export default ProductCard;
