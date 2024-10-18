import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useCompleteOrder() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const completeOrder = useMutation({
    mutationFn: async (args: { addressId: number; postWayId: number }) => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/order/complete"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify({
            customer_address: args.addressId,
            post_way: args.postWayId,
          }),
        },
      );

      if (!res?.ok) {
        toast.error("مشکلی در ثبت سفارش به وجود آمد!");

        return false;
      }

      const data: { code: string } = await res.json();

      toast.success("سفارش با موفقیت ثبت شد.");

      queryClient.invalidateQueries({
        queryKey: ["cart", "orders"],
        refetchType: "all",
      });

      router.replace(`/cart/payment/${data.code}`);

      return true;
    },
  });

  return completeOrder;
}
