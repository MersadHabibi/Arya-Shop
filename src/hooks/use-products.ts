import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { Product } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";

export default function useProduct({ id }: { id: number }) {
  const product = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/product/", id.toString()),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
        },
      );

      if (!res?.ok) return null;

      const data: Product = await res.json();

      return data;
    },
  });

  return product;
}
