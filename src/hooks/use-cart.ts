"use client";

import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { CartResponse } from "@/types/entity";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import toast from "react-hot-toast";

const useCart = () => {
  const queryClient = useQueryClient();

  const cart = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/order/cart"),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
        },
      );

      if (!res?.ok) return null;

      const data: CartResponse = await res.json();

      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  const addToCart = useMutation({
    mutationFn: async (args: { product_id: number; quantity: number }) => {
      // Refresh token
      await refreshTokenAction();

      if (!getToken("access"))
        return toast.error("لطفا وارد حساب کاربری خود شوید.");

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/order/cart"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify(args),
        },
      );

      if (!res?.ok) return false;

      queryClient.invalidateQueries({
        queryKey: ["cart", "products"],
        refetchType: "all",
      });

      return true;
    },
    onSuccess: () => {
      cart.refetch();
    },
  });

  const removeFromCart = useMutation({
    mutationFn: async (args: { id: number }) => {
      // Refresh token
      await refreshTokenAction();

      const req = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/order/cart/", String(args.id)),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
        },
      );

      if (!req?.ok) return false;

      queryClient.invalidateQueries({
        queryKey: ["cart", "products"],
        refetchType: "all",
      });

      return true;
    },
    onSuccess: () => {
      cart.refetch();
    },
  });

  const increment = useMutation({
    mutationFn: async (args: { id: number }) => {
      // Refresh token
      await refreshTokenAction();

      const req = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/order/cart"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify({
            product_id: args.id,
            quantity: 1,
          }),
        },
      );

      if (!req?.ok) return false;

      queryClient.invalidateQueries({
        queryKey: ["cart", "products"],
        refetchType: "all",
      });

      return true;
    },
    onSuccess: () => {
      cart.refetch();
    },
  });

  const decrement = useMutation({
    mutationFn: async (args: { id: number }) => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/order/cart"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify({
            product_id: args.id,
            quantity: -1,
          }),
        },
      );

      if (!res?.ok) return false;

      queryClient.invalidateQueries({
        queryKey: ["cart", "products"],
        refetchType: "all",
      });

      return true;
    },
    onSuccess: () => {
      cart.refetch();
    },
  });

  const isPending = useMemo(() => {
    return (
      cart.isLoading ||
      addToCart.isPending ||
      removeFromCart.isPending ||
      increment.isPending ||
      decrement.isPending
    );
  }, [
    cart.isLoading,
    addToCart.isPending,
    removeFromCart.isPending,
    increment.isPending,
    decrement.isPending,
  ]);

  return { cart, addToCart, removeFromCart, increment, decrement, isPending };
};

export default useCart;
