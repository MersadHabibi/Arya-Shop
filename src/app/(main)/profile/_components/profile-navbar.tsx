"use client";

import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import {
  RiDashboardHorizontalLine,
  RiHeartLine,
  RiMapPin2Line,
  RiNotification4Line,
  RiShoppingBagLine,
} from "react-icons/ri";
import ChargeWallet from "./ChargeWallet";
import EditUserInformationModal from "./EditUserInformationModal";
import LogoutBtn from "./LogoutBtn";
import { useWallet } from "@/hooks/use-wallet";

const ProfileNavbar = () => {
  const auth = useAuth();

  const { wallet } = useWallet();

  return (
    <div className="flex h-fit flex-col gap-4 rounded-2xl bg-base-100 p-4 lg:border lg:border-base-200">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-base">{auth.data?.name || "کاربر"}</span>

          <span className="text-base-300">
            {auth.data?.phone_number || "-"}
          </span>
        </div>

        <EditUserInformationModal />
      </div>

      <div className="flex items-start justify-between">
        <div>
          <p className="">کیف پول</p>
          <ChargeWallet />
        </div>
        <p>
          <span>{wallet.isLoading ? "..." : wallet.data?.balance}</span> تومان
        </p>
      </div>

      <div className="flex flex-col">
        {routes.map(({ icon, path, title }, idx) => (
          <Link
            className="flex items-center gap-2 border-t border-base-200 py-4 text-base last:pb-0"
            href={path}
            key={idx}>
            <Icon className="text-[24px] text-primary" icon={icon} />

            <span>{title}</span>
          </Link>
        ))}

        <LogoutBtn />
      </div>
    </div>
  );
};

export default ProfileNavbar;

const routes = [
  {
    path: "/profile",
    title: "داشبورد",
    icon: RiDashboardHorizontalLine,
  },
  {
    path: "/profile/orders",
    title: "سفارش‌ها",
    icon: RiShoppingBagLine,
  },
  {
    path: "/profile/addresses",
    title: "آدرس‌ها",
    icon: RiMapPin2Line,
  },
  {
    path: "/profile/favorites",
    title: "پسندیده‌ها",
    icon: RiHeartLine,
  },
  {
    path: "/profile/notifications",
    title: "پیفام‌ها",
    icon: RiNotification4Line,
  },
];
