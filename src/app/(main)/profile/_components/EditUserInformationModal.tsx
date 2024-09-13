"use client";

import Input from "@/components/modules/Input";
import Modal from "@/components/modules/modal/Modal";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "jalaali-react-date-picker";
import "jalaali-react-date-picker/lib/styles/index.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiEditLine } from "react-icons/ri";
import { SchemaFormData, UserSchema } from "./EditUserInformationModalData";
import useEditUserInformation from "./useEditUserInformation";

export default function EditUserInformationModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [birthdayDate, setBirthdayDate] = useState<any>();
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const auth = useAuth();
  const editUserInformationRequest = useEditUserInformation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<SchemaFormData>({
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  });

  const onSubmit = async (data: SchemaFormData) => {
    if (!data.birthday) {
      return setError("birthday", {
        message: "لطفا تاریخ تولدتان را وارد کنید",
      });
    }

    editUserInformationRequest.mutate({
      birthday_date: birthdayDate?._i
        ? new Date(birthdayDate?._i?.slice(0, -3))
        : new Date(auth.data?.birthday_date || ""),
      email: data.email,
      name: data.name,
      national_code: data.nationalCode,
      setIsOpenModal,
    });
  };

  return (
    <>
      <button onClick={() => setIsOpenModal(true)}>
        <Icon
          className="!scale-x-100 text-[24px] text-primary"
          icon={RiEditLine}
        />
      </button>

      <Modal
        isOpen={isOpenModal}
        handleSubmit={handleSubmit}
        onCloseModal={() =>
          editUserInformationRequest.isPending || setIsOpenModal(false)
        }
        onClickOutside={() =>
          editUserInformationRequest.isPending || setIsOpenModal(false)
        }
        title="اطلاعات شخصی"
        size="full"
        classNames={{
          background: "z-50 sm:px-4",
          box: "sm:!max-w-4xl sm:!h-fit flex flex-col justify-between sm:rounded-lg",
          title: "font-bold text-xl sm:text-2xl",
        }}
        onSubmit={onSubmit}>
        <div className="px-4 sm:px-6">
          <p className="text-sm font-normal text-neutral-500">
            لطفا اطلاعات شناسایی خود را وارد کنید. نام و نام خانوادگی شما باید
            با اطلاعاتی که وارد می‌کنید همخوانی داشته باشند.
          </p>
          {auth.isPending ? (
            <div className="flex w-full items-center justify-center py-10">
              <span className="loading loading-spinner text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 pt-4 sm:grid-cols-2 sm:gap-y-6 md:gap-x-10">
              <div>
                <label className="mb-2 block text-lg sm:text-xl" htmlFor="name">
                  نام و نام خانوادگی
                </label>
                <Input
                  className="px-4"
                  name="name"
                  placeholder=""
                  error={errors.name}
                  register={register}
                  defaultValue={auth.data?.name || ""}
                />
              </div>
              <div>
                <label
                  className="mb-2 block text-lg sm:text-xl"
                  htmlFor="email">
                  ایمیل
                </label>
                <Input
                  className="px-4"
                  name="email"
                  type="email"
                  placeholder=""
                  error={errors.email}
                  register={register}
                  defaultValue={auth.data?.email || ""}
                />
              </div>
              <div className="">
                <label
                  className="mb-2 block text-lg sm:text-xl"
                  htmlFor="nationalCode">
                  کد ملی
                </label>
                <Input
                  className="px-4"
                  name="nationalCode"
                  placeholder=""
                  error={errors.nationalCode}
                  register={register}
                  defaultValue={auth.data?.national_code || ""}
                />
              </div>
              <div className="">
                <label
                  className="mb-2 block text-lg sm:text-xl"
                  htmlFor="birthday">
                  تاریخ تولد
                </label>
                <Input
                  className="px-4"
                  // type="date"
                  name="birthday"
                  placeholder=""
                  value={
                    new Date(
                      String(birthdayDate?._i).slice(0, -3),
                    ).toLocaleDateString("fa-IR") == "Invalid Date"
                      ? new Date(
                          auth.data?.birthday_date || "",
                        ).toLocaleDateString("fa-IR")
                      : new Date(
                          String(birthdayDate?._i).slice(0, -3),
                        ).toLocaleDateString("fa-IR")
                  }
                  error={errors.birthday}
                  register={register}
                  onClick={() => setIsShowDatePicker(true)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="sticky bottom-0 top-full mt-6 flex w-full items-center justify-center p-4">
          <button
            disabled={editUserInformationRequest.isPending}
            className="flex h-fit w-full items-center justify-center rounded-md bg-primary px-12 py-3.5 font-bold text-white transition-all hover:brightness-90 disabled:opacity-70">
            {editUserInformationRequest.isPending ? (
              <span className="loading loading-spinner text-white" />
            ) : (
              "ثبت اطلاعات"
            )}
          </button>
        </div>
      </Modal>
      {isShowDatePicker ? (
        <div
          className="fixed inset-0 z-[60] flex size-full items-center justify-center bg-black/40 backdrop-blur-md"
          onClick={() => setIsShowDatePicker(false)}>
          <div onClick={(event) => event.stopPropagation()}>
            <DatePicker
              value={birthdayDate}
              onChange={(value) => {
                setBirthdayDate(value);
                setIsShowDatePicker(false);
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
