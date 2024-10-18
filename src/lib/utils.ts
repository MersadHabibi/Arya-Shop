import { twMerge } from "tailwind-merge";
import { clsx, ClassArray } from "clsx";
import Cookies from "js-cookie";
import { TOrderStatus } from "@/types/entity";

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

export function formatOrderStatus(status: TOrderStatus) {
  return status === "New"
    ? "جدید"
    : status === "Accepted"
      ? "تایید سفارش"
      : status === "Preparing"
        ? "آماده سازی سفارش"
        : status === "OutCompany"
          ? "خروج از مرکز پردازش"
          : status === "InPostOffice"
            ? "تحویل به پست "
            : status === "OnShipping"
              ? "مرکز مبادلات پست"
              : status === "Arrive"
                ? "تحویل به مشتری"
                : status === "Canceled"
                  ? "لغو شده"
                  : null;
}

export function convertPersianToEnglishDigits(persianDate: any) {
  return persianDate.replace(/[۰-۹]/g, (d: any) => d.charCodeAt(0) - 1776);
}

const persianMonths = [
  "فروردین", // 1
  "اردیبهشت", // 2
  "خرداد", // 3
  "تیر", // 4
  "مرداد", // 5
  "شهریور", // 6
  "مهر", // 7
  "آبان", // 8
  "آذر", // 9
  "دی", // 10
  "بهمن", // 11
  "اسفند", // 12
];

export function getPersianMonthName(monthNumber: number) {
  if (monthNumber < 1 || monthNumber > 12) {
    return "Invalid month number"; // Error handling
  }
  return persianMonths[monthNumber - 1]; // Adjust for zero-based index
}
