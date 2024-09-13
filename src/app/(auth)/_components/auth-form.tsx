"use client";

import { useField } from "@/hooks/use-field";
import { useState } from "react";
import { z } from "zod";
import PhoneNumberForm from "./PhoneNumberForm";
import VerifyOTPForm from "./VerifyOTPForm";

const AuthForm = () => {
  const [sent, setSent] = useState<boolean>(false);

  const phoneNumber = useField({
    required: true,
    validations: [
      {
        validator: z.string().regex(/09\d{9}/),
        message: "لطفا یک شماره همراه صحیح وارد کنید.",
      },
    ],
  });


  if (!sent) return <PhoneNumberForm {...phoneNumber} setSent={setSent} />;

  return <VerifyOTPForm {...phoneNumber} setSent={setSent} />;
};

export default AuthForm;
