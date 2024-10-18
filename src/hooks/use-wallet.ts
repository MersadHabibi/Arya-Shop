import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useWallet = () => {
  const router = useRouter();

  const chargeWallet = useMutation({
    mutationFn: async (args: { amount: string }) => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, `/api/finance/charge-wallet`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify({
            amount: args.amount,
          }),
        },
      );


      const data = await res.json();


      if (!res.ok && "detail" in data && typeof data.detail === "string") {
        toast.error(data.detail);

        throw new Error(data.detail);
      }

      router.push(data.url);

      return true;
    },
    onSuccess: (success) => {
      if (!success) return;
    },
  });

  const wallet = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      try {
        // Refresh token
        await refreshTokenAction();

        // Get profile
        const res = await fetch(
          jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/finance/wallet-balance"),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken("access")}`,
            },
          },
        );

        if (!res?.ok) return null;

        const json: {
          balance: number;
        } = await res.json();

        return json;
      } catch (error) {
        return null;
      }
    },
  });

  return { chargeWallet, wallet };
};
