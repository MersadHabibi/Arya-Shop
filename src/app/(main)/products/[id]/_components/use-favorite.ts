import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useFavorite() {
  const addToFavorite = useMutation({
    mutationFn: async (args: { productId: number }) => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, `/api/product/favorite`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify({
            product: args.productId,
          }),
        },
      );


      const data = await res.json();

      if (!res?.ok) {
        toast.error(data.detail);

        return false;
      }

      toast.success(data.detail);

      return true;
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (args: { productId: number }) => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(
          env.NEXT_PUBLIC_BACKEND_URL,
          `/api/product/favorite/${args.productId}`,
        ),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
        },
      );


      const data = await res.json();

      if (!res?.ok) {
        toast.error(data.detail);

        return false;
      }

      toast.success(data.detail);

      return true;
    },
  });

  return { addToFavorite, removeFavorite };
}
