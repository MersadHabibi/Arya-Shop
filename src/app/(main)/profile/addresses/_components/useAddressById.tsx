import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { TAddress } from "@/types/entity";
import { useEffect, useState } from "react";

export const useAddressByName = ({ id }: { id: number }) => {
  const [addressByName, setAddressByName] = useState<TAddress>();

  useEffect(() => {
    const getAddressByName = async () => {
      try {
        // Refresh token
        refreshTokenAction();

        const res = await fetch(
          jst(env.NEXT_PUBLIC_BACKEND_URL, `/api/accounts/user-address/${id}`),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken("access")}`,
            },
          },
        );

        if (!res?.ok) return null;

        const json: TAddress = await res.json();

        setAddressByName(json);

        return json;
      } catch (error) {
        setAddressByName(undefined);

        return null;
      }
    };

    getAddressByName();
  }, [id]);

  return addressByName;
};
