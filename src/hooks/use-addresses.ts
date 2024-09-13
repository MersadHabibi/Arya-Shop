import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { TAddress } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";

export const useAddresses = () => {
  const addresses = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      try {
        // Refresh token
        await refreshTokenAction();

        // Get profile
        const res = await fetch(
          jst(
            env.NEXT_PUBLIC_BACKEND_URL,
            "/api/accounts/user-address?page=1&page_size=10",
          ),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken("access")}`,
            },
          },
        );

        if (!res?.ok) return null;

        const json: Pick<
          TAddress & { id: number },
          "title" | "address" | "call_number" | "reciever_name" | "id"
        >[] = await res.json();

        return json;
      } catch (error) {
        return null;
      }
    },
  });

  return addresses;
};
