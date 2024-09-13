"use client";

import NewAddressModal, { TOnSubmitProps } from "./NewAddressModal";

import useAddNewAddress from "./useAddNewAddress";

export default function CreateNewAddress() {
  const addNewAddress = useAddNewAddress();

  const onSubmit = async ({
    data,
    selectedCity,
    selectedState,
    setSelectedCity,
    setSelectedState,
    setError,
    reset,
    setIsOpenModal,
  }: TOnSubmitProps) => {
    addNewAddress.mutate({
      title: data.title,
      zipcode: data.zipcode,
      address: data.address,
      city: selectedCity,
      state: selectedState,
      plate: data.plate ? +data.plate : 0,
      unit: data.unit ? +data.unit : 0,
      call_number: data.call_number,
      reciever_name: data.reciever_name,
      setIsOpenModal,
      callback: () => {
        reset();

        setSelectedCity(undefined);
        setSelectedState(undefined);
      },
    });
  };

  return (
    <NewAddressModal
      onSubmit={onSubmit}
      title="جزئیات آدرس جدید"
      className="mr-auto flex h-14 w-fit items-center justify-center gap-x-2 rounded-2xl border-[1.5px] border-primary px-4 text-center text-lg text-primary transition-colors hover:bg-primary hover:text-white max-lg:w-full sm:text-xl lg:h-20">
      ثبت آدرس جدید
      <span className="pt-1 text-4xl">+</span>
    </NewAddressModal>
  );
}
