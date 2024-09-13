"use client";

import Icon from "@/components/ui/icon";
import { removeTokens } from "@/lib/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function LogoutBtn() {
  const router = useRouter();

  const onLogout = () => {
    removeTokens();

    router.replace("/");
    router.refresh();

    // revalidateTag("auth");
  };

  return (
    <button
      className="flex items-center gap-2 border-t border-base-200 py-4 text-base last:pb-0"
      onClick={onLogout}>
      <Icon className="text-[24px] text-primary" icon={RiLogoutBoxLine} />
      <span>خروج از حساب کاربری</span>
    </button>
  );
}
