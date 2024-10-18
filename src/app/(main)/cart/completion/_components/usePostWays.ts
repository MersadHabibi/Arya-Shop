"use client";

import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export type TPostWay = {
  id: number;
  way: string;
  price: number;
};

export default function usePostWays() {
  const postWays = useQuery({
    queryKey: ["postWays"],
    queryFn: async () => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/order/postways"),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
        },
      );

      if (!res?.ok) return null;

      const data: TPostWay[] = await res.json();

      return data;
    },
  });

  return postWays;
}
