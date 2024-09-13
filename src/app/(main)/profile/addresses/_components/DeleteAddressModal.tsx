"use client";

import Modal from "@/components/modules/modal/Modal";
import { cn, getToken, jst } from "@/lib/utils";
import { useState } from "react";
import { AddressFormData } from "./NewAddressModalData";
import { RiDeleteBin6Line } from "react-icons/ri";
import Icon from "@/components/ui/icon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "@/env";
import toast from "react-hot-toast";

export default function DeleteAddressModal({
  addressId,
  addressName,
}: {
  addressId: number;
  addressName: string;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const deleteAddress = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        jst(
          env.NEXT_PUBLIC_BACKEND_URL,
          `/api/accounts/user-address/${addressId}`,
        ),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken("access")}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok && "detail" in data && typeof data.detail === "string") {
        toast.error(data.detail);

        throw new Error(data.detail);
      }

      queryClient.invalidateQueries({
        queryKey: ["addresses"],
        refetchType: "all",
      });

      toast.success("آدرس با موفقیت حذف شد.");

      setIsOpenModal(false);

      return true;
    },
    onSuccess: (success) => {
      if (!success) return;
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteAddress.mutate();
  };

  return (
    <>
      <button className="text-red-500" onClick={() => setIsOpenModal(true)}>
        <Icon className="!scale-x-100 text-[24px]" icon={RiDeleteBin6Line} />
      </button>

      <Modal
        isOpen={isOpenModal}
        onSubmit={onSubmit}
        onCloseModal={() => setIsOpenModal(false)}
        onClickOutside={() => setIsOpenModal(false)}
        title={"حذف آدرس"}
        classNames={{
          background: "z-50 lg:px-4",
          box: "!h-fit",
          title: "font-bold text-xl sm:text-2xl",
        }}>
        <div className="px-4 sm:px-6">
          <p className="text-xl">
            آیا از حذف کردن آدرس ({addressName}) مطمئن هستید؟
          </p>
        </div>
        <div className="sticky bottom-0 top-full mt-6 flex w-full items-center justify-end gap-x-4 p-4 !pt-0 sm:p-6">
          <button
            type="button"
            disabled={deleteAddress.isPending}
            className="flex h-12 w-fit items-center justify-center rounded-md bg-neutral-500 px-12 py-3.5 font-bold text-white transition-all hover:brightness-90 disabled:opacity-70"
            onClick={() => setIsOpenModal(false)}>
            لغو
          </button>
          <button
            type="submit"
            disabled={deleteAddress.isPending}
            className="flex h-12 w-fit items-center justify-center rounded-md bg-red-500 px-12 py-3.5 font-bold text-white transition-all hover:brightness-90 disabled:opacity-70">
            {deleteAddress.isPending ? (
              <span className="loading loading-spinner text-white" />
            ) : (
              "حذف"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
}
