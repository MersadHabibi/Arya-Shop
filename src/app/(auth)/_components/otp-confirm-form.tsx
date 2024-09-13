"use client";

import { useState } from "react";
import OtpInput from "./otp-input";
import Link from "next/link";

type Props = {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
};

const OtpConfirmForm = ({ otp, setOtp }: Props) => {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 rounded-3xl border border-base-200 bg-base-100 p-6 max-lg:mx-auto lg:w-[65%] lg:max-w-xl">
      <h1 className="text-[32px] font-bold leading-tight lg:text-[40px]">
        حساب کاربری خود را تایید کنید
      </h1>

      <p className="text-xs lg:text-2xl">حساب کاربری خود را بسازید</p>

      <OtpInput value={otp} onChange={setOtp} />

      <p className="text-xs lg:text-base ">
        کد تاییدیه دریافت نکردید؟{" "}
        <button className="text-secondary">ارسال مجدد</button>
      </p>

      <button className="btn btn-primary !h-[50px] w-fit text-base font-normal max-lg:w-full lg:px-36">
        تایید کنید
      </button>
    </div>
  );
};

export default OtpConfirmForm;
