import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { TOrder } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";

export default function useOrder({ orderId }: { orderId?: string }) {
  const order = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, `/api/order/${orderId}`),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
        },
      );

      if (!res?.ok) return null;

      const data: TOrder = await res.json();

      return data;
    },
  });

  return order;
}
