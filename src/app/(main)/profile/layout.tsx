import Profits from "@/components/layout/profits";
import ProfileNavbar from "./_components/profile-navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پروفایل",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-3 px-5 max-lg:pb-8 lg:grid lg:grid-cols-[300px_1fr] lg:px-20">
        <ProfileNavbar />

        {children}
      </div>

      <div className="mt-24 hidden w-full lg:block">
        <Profits />
      </div>
    </>
  );
}
