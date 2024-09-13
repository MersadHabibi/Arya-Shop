import Input from "@/components/ui/input";
import { env } from "@/env";
import { jst } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import SubmitButton from "./submit-button";

export type TProps = {
  readonly value: string;
  readonly error: string | null;
  readonly isError: boolean;
  readonly register: () => {
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    onBlur: () => void;
    onFocus: () => void;
    required: boolean;
  };

  setSent: (value: boolean) => void;
};

export default function PhoneNumberForm({
  value: phoneNumberValue,
  error,
  isError,
  register,
  setSent,
}: TProps) {
  const authRequest = useMutation({
    mutationFn: async (args: { phoneNumber: string }) => {
      const res = await fetch(
        jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/accounts/login-request"),
        {
          method: "POST",
          body: JSON.stringify({
            phone_number: args.phoneNumber,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok && "detail" in data && typeof data.detail === "string") {
        throw new Error(data.detail);
      }

      return true;
    },
    onSuccess: (success) => {
      if (!success) return;

      setSent(true);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (error || !phoneNumberValue) return;

        authRequest.mutate({
          phoneNumber: phoneNumberValue,
        });
      }}
      className="flex w-full max-w-md flex-col rounded-3xl border border-base-200 bg-base-100 p-6 max-lg:mx-auto lg:w-[65%] lg:max-w-xl">
      <h1 className="text-2xl font-bold leading-tight lg:text-[40px]">
        به آریا خوش آمدید
      </h1>

      <h2 className="mt-4 text-lg text-base-content/70 lg:text-xl">
        برای ادامه لطفا شماره موبایل خود را وارد کنید
      </h2>

      <div className="relative mt-8">
        <Input
          {...register()}
          className="h-10 max-lg:text-xs lg:h-14"
          label="شماره موبایل :"
        />
      </div>

      {error && (
        <span className="mt-2 text-xs text-error lg:text-sm">{error}</span>
      )}

      <SubmitButton
        loading={authRequest.isPending}
        disabled={isError || authRequest.isPending}>
        وارد شوید
      </SubmitButton>
    </form>
  );
}
