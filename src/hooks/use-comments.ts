import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { revalidatePath, revalidateTag } from "next/cache";
import toast from "react-hot-toast";

export default function useComments() {
  const newComment = useMutation({
    mutationFn: async (args: {
      product?: {
        id: number;
        name: string;
      };
      title: string;
      text: string;
      callback: () => void;
    }) => {
      if (!getToken("access"))
        return toast.error("لطفا وارد حساب کاربری خود شوید.");

      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/product/comment"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
          body: JSON.stringify({
            product: args.product?.id,
            title: args.title,
            text: args.text,
          }),
        },
      );

      const data = await res.json();

      if (!res?.ok) return false;

      toast.success(data.detail);

      args.callback();

      revalidateTag("comments");
      revalidatePath(`/products/${args.product?.name}`);

      // queryClient.invalidateQueries({
      //   queryKey: ["products"],
      //   refetchType: "all",
      // });

      return true;
    },
    onSuccess: () => {
      return true;
    },
  });

  return { newComment };
}
