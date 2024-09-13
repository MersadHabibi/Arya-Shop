"use client";

import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const ProtectAuth = ({ children }: PropsWithChildren) => {
  const auth = useAuth();

  if (auth.isLoading)
    return (
      <div className="grid h-svh w-full place-items-center">
        <span className="loading loading-spinner loading-lg text-secondary" />
      </div>
    );

  if (auth.data) return redirect("/profile");

  return <>{children}</>;
};

export default ProtectAuth;
