import { twMerge } from "tailwind-merge";
import { clsx, ClassArray } from "clsx";
import Cookies from "js-cookie";

export const cn = (...inputs: ClassArray) => twMerge(clsx(...inputs));

export const jst = (...inputs: string[]) => inputs.join("");

export const storeToken = (token: string, type: "access" | "refresh") => {
  Cookies.set(type + "Token", token);
};

export const getToken = (type: string) => {
  return Cookies.get(type + "Token");
};

export const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};
