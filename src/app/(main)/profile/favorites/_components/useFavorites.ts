import { env } from "@/env";
import { getToken, jst } from "@/lib/utils";
import { PaginatedResponse, Product } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";

export default function useFavorites({ page }: { page: number }) {
  const favorites = useQuery({
    queryKey: ["favorites", page],
    queryFn: async () => {
      console.log("page", page);
      try {
        // Refresh token
        // await refreshTokenAction();

        // Get profile
        const res = await fetch(
          jst(
            env.NEXT_PUBLIC_BACKEND_URL,
            `/api/product/favorite?page=${page || 1}&page_size=10`,
          ),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken("access")}`,
            },
          },
        );

        console.log(res);

        if (!res?.ok) return null;

        const json: PaginatedResponse<Product> = await res.json();

        return json;
      } catch (error) {
        return null;
      }
    },
    // refetchInterval: 3000,
    refetchOnWindowFocus: false,
  });

  return favorites;
}
