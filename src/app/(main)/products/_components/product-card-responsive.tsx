"use client";

import Icon from "@/components/ui/icon";
import { cn, getToken, jst } from "@/lib/utils";
import { Product } from "@/types/entity";
import Link from "next/link";
import {
  RiAddLine,
  RiHeartFill,
  RiHeartLine,
  RiStarFill,
} from "react-icons/ri";
import AddToFavorite from "../[id]/_components/AddToFavorite";
import { useEffect, useState } from "react";
import Image from "next/image";
import { env } from "@/env";

export default function ProductCardResponsive({ item }: { item: Product }) {
  const [isClient, setIsClient] = useState(false);
  const [favoriteTransition, setFavoriteTransition] = useState(item.favorite);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link
      href={jst(
        "/products/",
        item.Name.replaceAll(" ", "-"),
        "-",
        String(item.Code),
      )}
      className="overflow-hidden py-4 first:pt-0 last:pb-0">
      <div className="grid w-full grid-cols-[80px_1fr] gap-2 overflow-hidden min-[300px]:grid-cols-[104px_1fr]">
        <div
          className={cn(
            "aspect-square size-[104px] overflow-hidden rounded-lg ",
            item.galleries?.image || "bg-base-200",
          )}>
          {item?.galleries?.image ? (
            <Image
              alt={item.Name}
              src={env.NEXT_PUBLIC_IMAGE_URL + item.galleries.image}
              className="!static size-full object-contain"
              fill
            />
          ) : null}
        </div>

        <div className="relative flex flex-col gap-2">
          <span className="text-sm font-bold">{item.Name}</span>

          <div className="grid w-full">
            <div className="relative flex items-center justify-between overflow-hidden">
              <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary">
                {"موجودی: " + item.quantity}
              </span>

              <div className="flex shrink-0 items-center text-xs font-bold">
                4.1
                <Icon icon={RiStarFill} className="text-xs text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-between">
            <div className="flex items-center gap-x-2">
              <button className="mt-auto grid size-5 place-items-center rounded-full bg-secondary text-white">
                <Icon icon={RiAddLine} />
              </button>

              {getToken("access") && isClient ? (
                <AddToFavorite
                  className={cn(
                    "btn z-20 -mb-[1.5px] mt-auto !size-fit !min-h-0 !w-fit !min-w-0 border-none !bg-transparent p-0 text-red-500",
                    item.favorite && "text-red-500",
                  )}
                  favoriteTransition={favoriteTransition}
                  product={item}
                  setFavoriteTransition={setFavoriteTransition}>
                  {favoriteTransition ? (
                    <RiHeartFill className="text-2xl" />
                  ) : (
                    <RiHeartLine className="text-2xl" />
                  )}
                </AddToFavorite>
              ) : null}
            </div>

            <div className="flex flex-col">
              <del className="text-base-300 line-through">100.000 تومان</del>

              <span className="text-base font-black text-secondary">
                {((item.price ?? 0) / 10).toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
