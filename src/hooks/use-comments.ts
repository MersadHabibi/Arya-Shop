import { env } from "@/env";
import { getToken, jst } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revalidatePath, revalidateTag } from "next/cache";
import toast from "react-hot-toast";

export default function useComments() {
  const queryClient = useQueryClient();

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
