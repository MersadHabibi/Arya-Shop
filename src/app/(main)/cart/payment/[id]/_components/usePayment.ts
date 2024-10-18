import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function usePayment() {
  const queryClient = useQueryClient();

  const payByWallet = useMutation({
    mutationFn: async (args: { orderId: string }) => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/finance/pay-wallet"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify({
            order_id: args.orderId,
          }),
        },
      );

      if (!res?.ok) {
        const data = await res.json();
        toast.error(data.detail);
        return false;
      }

      const data = await res.json();

      queryClient.invalidateQueries({
        queryKey: ["wallet", "orders"],
        refetchType: "all",
      });

      toast.success(data.detail);

      return true;
    },
  });

  const payByGateway = useMutation({
    mutationFn: async (args: { orderId: string }) => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/finance/pay-gateway"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify({
            order_id: args.orderId,
          }),
        },
      );

      if (!res?.ok) {
        toast.error("مشکلی در پرداخت به وجود آمده! بعدا امتحان کنید.");

        return false;
      }

      const data = await res.json();

      redirect(data.url);

      return true;
    },
  });

  return { payByWallet, payByGateway };
}
