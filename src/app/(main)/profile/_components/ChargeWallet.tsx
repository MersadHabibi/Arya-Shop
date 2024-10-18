"use client";

import Input from "@/components/modules/Input";
import Modal from "@/components/modules/modal/Modal";
import { useWallet } from "@/hooks/use-wallet";
import { useState } from "react";

export default function ChargeWallet() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [amount, setAmount] = useState("");

  const { chargeWallet } = useWallet();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!amount) return;

    chargeWallet.mutate({
      amount,
    });
  };

  return (
    <>
      <button
        className="mt-1 font-bold text-primary"
        onClick={() => setIsOpenModal(true)}>
        + افزایش موجودی
      </button>

      <Modal
        isOpen={isOpenModal}
        title="افزودن موجودی"
        classNames={{
          background: "z-50 !px-2 sm:!px-4",
          box: "!max-w-none sm:!max-w-lg !max-h-none sm:!h-fit flex flex-col justify-between sm:rounded-xl",
          title: "font-bold text-xl sm:text-2xl",
        }}
        onSubmit={onSubmit}
        onCloseModal={() => chargeWallet.isPending || setIsOpenModal(false)}
        onClickOutside={() => chargeWallet.isPending || setIsOpenModal(false)}>
        <div className="p-4 sm:p-6 sm:pt-3">
          <p className="mb-5 text-center text-base text-black/70">
            مبلغ مورد نظر جهت افزایش موجودی را وارد کنید
          </p>
          <div className="relative">
            <p className="absolute bottom-0 left-4 top-0 m-auto h-fit text-base font-medium">
              تومان
            </p>
            <Input
              name="amount"
              placeholder="مبلغ"
              className="rounded-lg !border-2 border-base-300/80 text-center focus:border-base-300"
              value={amount}
              onInput={(event) => setAmount(event.currentTarget.value)}
              type="number"
            />
          </div>
          <div className="mt-5 flex flex-col-reverse items-center gap-x-4 gap-y-2 xs:flex-row">
            <button
              disabled={chargeWallet.isPending}
              type="button"
              className="btn-outline flex h-12 w-full shrink-0 items-center justify-center rounded-lg border-2 !border-red-500 px-8 text-base font-medium text-red-500 transition-all hover:bg-red-500 hover:text-white disabled:opacity-70 disabled:hover:!bg-transparent disabled:hover:!text-red-500 xs:w-fit"
              onClick={() => setIsOpenModal(false)}>
              انصراف
            </button>
            <button
              disabled={chargeWallet.isPending}
              className="btn flex h-12 w-full min-w-0 shrink items-center justify-center rounded-lg !bg-primary px-8 text-base !text-primary-content transition-all hover:bg-primary hover:brightness-125 disabled:opacity-70">
              {chargeWallet.isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "افزایش موجودی کیف پول"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
