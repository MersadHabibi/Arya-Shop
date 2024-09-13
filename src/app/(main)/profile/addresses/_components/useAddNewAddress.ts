import { env } from "@/env";
import { refreshTokenAction } from "@/lib/refreshTokenAction";
import { getToken, jst } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddNewAddress() {
  const queryClient = useQueryClient();

  const addNewAddress = useMutation({
    mutationFn: async (args: {
      title: string;
      zipcode: string;
      address: string;
      city: string;
      state: string;
      plate: number;
      unit: number;
      call_number: string;
      reciever_name: string;
      isEditing?: boolean;
      addressId?: number;
      setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
      callback: () => void;
    }) => {
      // Refresh token
      await refreshTokenAction();

      let res: Response | null = null;

      if (!args.isEditing) {
        res = await fetch(
          jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/accounts/user-address"),
          {
            method: "POST",
            body: JSON.stringify({
              title: args.title,
              zipcode: args.zipcode,
              address: args.address,
              city: args.city,
              state: args.state,
              plate: args.plate,
              unit: args.unit,
              call_number: args.call_number,
              reciever_name: args.reciever_name,
              description: "",
            }),
            headers: {
              Authorization: `Bearer ${getToken("access")}`,
            },
          },
        );
      } else {
        res = await fetch(
          jst(
            env.NEXT_PUBLIC_BACKEND_URL,
            `/api/accounts/user-address/${args.addressId}`,
          ),
          {
            method: "PUT",
            body: JSON.stringify({
              title: args.title,
              zipcode: args.zipcode,
              address: args.address,
              city: args.city,
              state: args.state,
              plate: args.plate,
              unit: args.unit,
              call_number: args.call_number,
              reciever_name: args.reciever_name,
              description: "",
            }),
            headers: {
              Authorization: `Bearer ${getToken("access")}`,
            },
          },
        );
      }

      const data = await res?.json();

      if (!res?.ok && "detail" in data && typeof data.detail === "string") {
        toast.error(data.detail);

        throw new Error(data.detail);
      }

      toast.success(data.detail);

      args.callback();

      args.setIsOpenModal(false);

      queryClient.invalidateQueries({
        queryKey: ["addresses"],
        refetchType: "all",
      });

      return true;
    },
    onSuccess: (success) => {
      if (!success) return false;
    },
  });

  return addNewAddress;
}
