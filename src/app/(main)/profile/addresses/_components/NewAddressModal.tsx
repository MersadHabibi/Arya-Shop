"use client";

import Input from "@/components/modules/Input";
import Modal from "@/components/modules/modal/Modal";
import { cn } from "@/lib/utils";
import { TAddress } from "@/types/entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect, useState } from "react";
import { useForm, UseFormReset, UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";
import CitiesSelectBox from "./CitiesSelectBox";
import {
  AddressFormData,
  AddressSchema,
  AddressValidFieldNames,
} from "./NewAddressModalData";
import StatesSelectBox from "./StatesSelectBox";

export type TOnSubmitProps = {
  data: AddressFormData;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedState: string;
  setSelectedState: React.Dispatch<React.SetStateAction<string | undefined>>;
  setError: UseFormSetError<AddressFormData>;
  reset: UseFormReset<AddressFormData>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const inputs = [
  {
    id: 1,
    name: "plate",
    title: "پلاک",
    className: "col-span-2",
    type: "number",
  },
  {
    id: 2,
    name: "unit",
    title: "واحد",
    className: "col-span-2",
    type: "number",
  },
  {
    id: 3,
    name: "zipcode",
    title: "کدپستی",
    className: "col-span-2",
  },
  {
    id: 4,
    name: "reciever_name",
    title: "نام و نام خانوادگی گیرنده",
    className: "col-span-3",
  },
  {
    id: 5,
    name: "call_number",
    title: "شماره موبایل",
    className: "col-span-3",
  },
];

export default function NewAddressModal({
  onSubmit: onSubmitEntry,
  children,
  className,
  title,
  defaultValues,
}: {
  children: React.ReactNode;
  className: string;
  title: string;
  defaultValues?: Partial<TAddress>;
  onSubmit: (data: TOnSubmitProps) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(AddressSchema), // Apply the zodResolver
    defaultValues: {
      address: (defaultValues?.address as string) || "",
      call_number: (defaultValues?.call_number as string) || "",
      plate: String(defaultValues?.plate as number) || "",
      reciever_name: (defaultValues?.reciever_name as string) || "",
      title: (defaultValues?.title as string) || "",
      unit: String(defaultValues?.unit as number) || "",
      zipcode: (defaultValues?.zipcode as string) || "",
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set city and state default values
  useEffect(() => {
    if (defaultValues?.state && defaultValues?.city) {
      setSelectedState(defaultValues.state);
      setSelectedCity(defaultValues.city);
    }
  }, [defaultValues?.city, defaultValues?.state]);

  const onSubmit = async (data: AddressFormData) => {
    if (!selectedState)
      return setError("state", { message: "استان را انتخاب کنید" });

    if (!selectedCity)
      return setError("city", { message: "شهر را انتخاب کنید" });

    if (
      !data.title ||
      !data.zipcode ||
      !data.address ||
      !data.call_number ||
      !data.reciever_name ||
      !selectedCity ||
      !selectedState
    ) {
      return toast.error("لطفا همه فیلد ها را پر کنید");
    }

    setIsLoading(true);
    await onSubmitEntry({
      data,
      selectedCity,
      setSelectedCity,
      selectedState,
      setSelectedState,
      setError,
      reset,
      setIsOpenModal,
    });
    setIsLoading(false);
  };

  if (!isClient)
    return (
      <div className="flex w-full items-center justify-center py-10">
        <span className="loading loading-spinner text-primary" />
      </div>
    );

  return (
    <>
      <button className={cn(className)} onClick={() => setIsOpenModal(true)}>
        {children}
      </button>

      <Modal
        isOpen={isOpenModal}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onCloseModal={() => setIsOpenModal(false)}
        onClickOutside={() => setIsOpenModal(false)}
        title={title}
        size="full"
        classNames={{
          background: "z-50 lg:px-4",
          box: "lg:!max-w-4xl lg:!h-fit flex flex-col justify-between !rounded-none lg:!rounded-lg size-full !max-w-none !max-h-none lg:!max-h-[95%]",
          title: "font-bold text-xl sm:text-2xl",
        }}>
        <Suspense
          fallback={
            <div className="mx-auto my-20 flex w-full items-center justify-center">
              <span className="loading loading-spinner text-primary" />
            </div>
          }>
          <div className="px-4 sm:px-6">
            <div className="grid grid-cols-6 gap-x-3 gap-y-4 sm:gap-y-4 md:gap-x-14">
              <div className="col-span-6">
                <label
                  className="mb-2 line-clamp-1 block sm:text-xl"
                  htmlFor="title">
                  اسم آدرس
                </label>
                <Input
                  className="px-4"
                  name="title"
                  placeholder=""
                  error={errors.title}
                  register={register}
                />
              </div>
              <div className="col-span-6">
                <label
                  className="mb-2 line-clamp-1 block sm:text-xl"
                  htmlFor="address">
                  نشانی پستی
                </label>
                <div className="w-full">
                  <div className="relative w-full">
                    <textarea
                      id="address"
                      className={cn(
                        "w-full rounded-lg !border border-neutral-500 bg-transparent p-4 text-lg font-medium !outline-none",
                        errors.address && "border-red-500",
                      )}
                      rows={2}
                      {...register("address")}
                      defaultValue={defaultValues?.address as string}
                    />
                  </div>
                  {errors.address ? (
                    <p className="pt-1 text-start text-xs text-red-500">
                      {errors.address?.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <StatesSelectBox
                setSelectedState={setSelectedState}
                selectedState={selectedState}
                error={errors.state}
                defaultValue={defaultValues?.state}
              />
              <CitiesSelectBox
                selectedState={selectedState}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                error={errors.city}
                defaultValue={defaultValues?.city}
              />

              {inputs.map((input) => (
                <div
                  key={input.id}
                  className={cn("col-span-6", input.className)}>
                  <label
                    className="mb-2 line-clamp-1 block sm:text-xl"
                    htmlFor={input.name}>
                    {input.title}
                  </label>
                  <Input
                    className={cn("px-4 ")}
                    defaultValue={
                      defaultValues
                        ? defaultValues[input.name as AddressValidFieldNames]
                        : ""
                    }
                    type={input.type}
                    name={input.name}
                    placeholder=""
                    // @ts-expect-error
                    error={errors[input.name] || undefined}
                    register={register}
                  />
                </div>
              ))}
            </div>
          </div>
        </Suspense>
        <div className="sticky bottom-0 top-full mt-6 flex w-full items-center justify-center p-4 sm:p-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-fit w-full items-center justify-center rounded-md bg-primary px-12 py-3.5 font-bold text-white transition-all hover:brightness-90 disabled:opacity-70">
            {isLoading ? (
              <span className="loading loading-spinner text-white" />
            ) : (
              "ثبت آدرس"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
}
