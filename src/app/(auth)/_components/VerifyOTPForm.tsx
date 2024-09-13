import Icon from "@/components/ui/icon";
import { RiArrowLeftLine } from "react-icons/ri";
import { TProps } from "./PhoneNumberForm";
import OtpInput from "./otp-input";
import { useState } from "react";
import SubmitButton from "./submit-button";
import { useMutation } from "@tanstack/react-query";
import { jst, storeToken } from "@/lib/utils";
import { env } from "@/env";
import { useRouter } from "next/navigation";

export default function VerifyOTPForm({
  value: phoneNumberValue,
  error,
  isError,
  register,
  setSent,
}: TProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const router = useRouter();

  const verificationRequest = useMutation({
    mutationFn: async (args: { phoneNumber: string; password: string }) => {
      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/accounts/otp-verify"),
        {
          method: "POST",
          body: JSON.stringify({
            phone_number: args.phoneNumber,
            password: args.password,
          }),
        },
      );

      if ((res?.status ?? 500) >= 500)
        return {
          success: false,
        };

      const data: { access: string; refresh: string } = await res.json();


      if (!res.ok && "detail" in data && typeof data.detail === "string") {
        throw new Error(data.detail);
      }

      if (!data.access || !data.refresh) return;

      return {
        success: true,
        refresh: data.refresh,
        access: data.access,
      };
    },
    onSettled(res) {
      if (!res?.access || !res?.refresh || !res?.success) return;


      storeToken(res.access, "access");
      storeToken(res.refresh, "refresh");

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (error || !phoneNumberValue) return;

        verificationRequest.mutate({
          phoneNumber: phoneNumberValue,
          password: otp.join(""),
        });
      }}
      className="flex w-full max-w-md flex-col rounded-3xl border border-base-200 bg-base-100 p-6 max-lg:mx-auto lg:w-[65%] lg:max-w-xl">
      <button
        type="button"
        onClick={() => {
          setSent(false);
          verificationRequest.reset();
        }}
        className="btn btn-square btn-ghost">
        <Icon icon={RiArrowLeftLine} className="text-[24px]" />
      </button>

      <h1 className="text-2xl font-bold leading-tight lg:text-[40px]">
        حساب کاربری خود را تایید کنید
      </h1>

      <h2 className="mt-4 text-lg text-base-content/70 lg:text-xl">
        کد فرستاده شده به {phoneNumberValue} را وارد کنید
      </h2>

      <div className="relative mt-6 lg:mt-8">
        <OtpInput value={otp} onChange={setOtp} />
      </div>

      <SubmitButton
        loading={verificationRequest.isPending}
        disabled={otp.some((v) => !v) || verificationRequest.isPending}>
        وارد شوید
      </SubmitButton>

      {verificationRequest.isError && (
        <p className="mt-4 text-center text-base text-error">
          {verificationRequest.error.message}
        </p>
      )}
    </form>
  );
}
