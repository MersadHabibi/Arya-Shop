"use client";

import { RiCloseLine, RiLoginBoxLine, RiMenuLine } from "react-icons/ri";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "../ui/dialog";
import Icon from "../ui/icon";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

type Props = {
  routes: { title: string; path: string }[];
};

const NavDrawer = ({ routes }: Props) => {
  const pathname = usePathname();

  const auth = useAuth();

  return (
    <Dialog key={pathname}>
      <DialogTrigger asChild>
        <button className="text-primary">
          <span className="sr-only">بار کردن منو</span>

          <Icon className="text-[28px]" icon={RiMenuLine} />
        </button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-base-content/50" />

        <DialogContent
          className={cn(
            "sahdow-lg fixed inset-y-0 start-0 z-50 flex w-[250px] flex-col gap-5 bg-base-100 px-5 py-5",
            "data-[state=open]:duration-300 data-[state=open]:animate-in ltr:data-[state=open]:slide-in-from-left-full rtl:data-[state=open]:slide-in-from-right-full",
            "data-[state=closed]:duration-300 data-[state=closed]:animate-out ltr:data-[state=closed]:slide-out-to-left-full rtl:data-[state=closed]:slide-out-to-right-full",
          )}
        >
          <div className="flex flex-col">
            <DialogClose>
              <Icon icon={RiCloseLine} className="text-[28px] text-primary" />
            </DialogClose>
          </div>

          <div className="flex flex-col divide-y divide-base-200">
            {auth.data || false ? (
              <Link
                href={"/profile"}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <Image
                  alt="user"
                  height={40}
                  width={40}
                  src={"/svg/user.svg"}
                />

                <span className="text-base">
                  {auth?.data?.name ?? "کاربر عزیز "}
                </span>
              </Link>
            ) : (
              <Link
                href={"/auth"}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <Icon icon={RiLoginBoxLine} className="text-[24px]" />

                <span className="text-base">ورود به حساب</span>
              </Link>
            )}

              <Link
                href="/products"
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="text-base">لیست محصولات</span>
              </Link>

            {routes.map(({ path, title }, idx) => (
              <Link
                href={path}
                key={idx}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span className="text-base">{title}</span>
              </Link>
            ))}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default NavDrawer;
