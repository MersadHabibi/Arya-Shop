import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { Profile } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const data = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        // Refresh token
        await refreshTokenAction();

        // Get profile
        const res = await fetch(
          jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/accounts/profile"),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken("access")}`,
            },
          },
        );

        if (!res?.ok) return null;

        const json: Profile = await res.json();

        return json;
      } catch (error) {
        return null;
      }
    },
    // refetchInterval: 3000,
    refetchOnWindowFocus: false,
  });

  return data;
};
