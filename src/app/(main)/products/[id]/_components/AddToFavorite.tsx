"use client";

import { env } from "@/env";
import { cn, getToken, jst } from "@/lib/utils";
import { Product } from "@/types/entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import React from "react";
import toast from "react-hot-toast";

export default function AddToFavorite({
  children,
  className,
  product,
  favorite,
}: {
  children: React.ReactNode;
  className: string;
  product: Product;
  favorite: boolean;
}) {
  const queryClient = useQueryClient();

  const addAndRemoveToFavorite = useMutation({
    mutationFn: async () => {
      console.log(product.Code, favorite);
      const res = await fetch(
        jst(
          env.NEXT_PUBLIC_BACKEND_URL,
          `/api/product/favorite${favorite ? "/" + product.Code : ""}`,
        ),
        {
          method: favorite ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify({
            product: product.Code,
          }),
        },
      );

      // console.log(await res.json());

      const data = await res.json();

      if (!res?.ok) {
        toast.error(data.detail);

        return false;
      }

      toast.success(data.detail);

      queryClient.invalidateQueries({
        queryKey: ["favorites", "products", "cart"],
        refetchType: "all",
      });

      revalidatePath(`/products/${product.Name}`);

      return true;
    },
  });

  return (
    <button
      className={cn(className)}
      onClick={(event) => {
        event.stopPropagation();
        addAndRemoveToFavorite.mutate();
      }}>
      {children}
    </button>

    // <button className="btn btn-primary btn-md btn-block !border-none !bg-neutral-500 lg:btn-lg">
    //   افزودن به علاقه مندی ها
    // </button>
  );
}
