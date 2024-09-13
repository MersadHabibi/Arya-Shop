import { env } from "@/env";
import { getToken, jst, storeToken } from "./utils";

export async function refreshTokenAction() {
  const refreshToken = getToken("refresh");

  if (!refreshToken) return false;

  // Refresh token
  const newRefreshTokenRes = await fetch(
    jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/token/refresh"),
    {
      method: "POST",
      body: JSON.stringify({
        refresh: refreshToken,
      }),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!newRefreshTokenRes?.ok) return false;

  const newTokens: {
    access: string;
    refresh: string;
  } = await newRefreshTokenRes.json();

  storeToken(newTokens.access, "access");
  storeToken(newTokens.refresh, "refresh");

  return true;
}
