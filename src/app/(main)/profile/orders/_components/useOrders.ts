import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { PaginatedResponse, TOrderStatus } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export type TOrder = {
  code: string;
  status: TOrderStatus;
};

export default function useOrders() {
  const searchParams = useSearchParams();

  const orders = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(
          env.NEXT_PUBLIC_BACKEND_URL,
          `/api/order?page=${searchParams.get("page") || 1}&page_size=10`,
        ),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
        },
      );

      if (!res?.ok) return null;

      const data: PaginatedResponse<TOrder> = await res.json();

      return data;
    },
  });

  return orders;
}
