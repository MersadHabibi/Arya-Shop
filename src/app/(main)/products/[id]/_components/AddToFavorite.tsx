"use client";

import { cn, getToken } from "@/lib/utils";
import { Product } from "@/types/entity";
import React from "react";
import useFavorite from "./use-favorite";
import toast from "react-hot-toast";

export default function AddToFavorite({
  children,
  className,
  product,
  favoriteTransition,
  setFavoriteTransition,
}: {
  children: React.ReactNode;
  className: string;
  product: Product;
  favoriteTransition: boolean;
  setFavoriteTransition: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const { addToFavorite, removeFavorite } = useFavorite();

  return (
    <button
      className={cn(className)}
      onClick={async (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (!getToken("access")) return toast.error("شما لاگین نیستید.");

        if (favoriteTransition) {
          const res = removeFavorite.mutate(
            {
              productId: product.Code,
            },
            {
              onSuccess: (res) => {
                res && setFavoriteTransition(false);
              },
            },
          );

        } else {
          const res = addToFavorite.mutate(
            {
              productId: product.Code,
            },
            {
              onSuccess: (res) => {
                res && setFavoriteTransition(true);
              },
            },
          );

        }
      }}>
      {children}
    </button>

    // <button className="btn btn-primary btn-md btn-block !border-none !bg-neutral-500 lg:btn-lg">
    //   افزودن به علاقه مندی ها
    // </button>
  );
}
