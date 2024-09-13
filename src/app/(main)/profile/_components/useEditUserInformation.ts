import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditUserInformation() {
  const queryClient = useQueryClient();

  const editUserInformationRequest = useMutation({
    mutationFn: async (args: {
      name: string;
      email: string;
      national_code: string;
      birthday_date: Date;
      setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
      // Refresh token
      await refreshTokenAction();

      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/accounts/profile"),
        {
          method: "PUT",
          body: JSON.stringify({
            name: args.name,
            email: args.email,
            national_code: args.national_code,
            birthday_date: args.birthday_date,
          }),
          headers: {
            Authorization: `Bearer ${getToken("access")}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok && "detail" in data && typeof data.detail === "string") {
        toast.error(data.detail);

        throw new Error(data.detail);
      }

      toast.success(data.detail);

      args.setIsOpenModal(false);

      queryClient.invalidateQueries({
        queryKey: ["auth"],
        refetchType: "all",
      });

      return true;
    },
    onSuccess: (success) => {
      if (!success) return true;
    },
  });

  return editUserInformationRequest;
}
