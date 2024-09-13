"use client";

import Image from "next/image";
import Icon from "../ui/icon";
import siteConfig from "@/config/site";
import { RiMenuLine, RiSearchLine, RiShoppingCartLine } from "react-icons/ri";
import Link from "next/link";
import NavDrawer from "./nav-drawer";
import { ElementRef, useEffect, useRef, useState } from "react";
import { cn, jst } from "@/lib/utils";
import { useRouter } from "next/navigation";

const PIXELS_TO_REVEAL = 100;
const PIXELS_TO_HIDE = 300;

type Props = {
  routes: { title: string; path: string }[];
};

const MainMobileHeader = ({ routes }: Props) => {
  const router = useRouter();

  const [show, setShow] = useState<boolean>(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = (e: Event) => {
      // get the scrollY position
      let { scrollY } = window;

      // if navbar is hidden keep track of scrollY
      if (!show && lastY.current < scrollY) {
        lastY.current = scrollY;
      }

      // hide the navbar if it's visible and user scrolled down
      if (window.scrollY > lastY.current + PIXELS_TO_HIDE) {
        setShow(false);
        lastY.current = scrollY;
      }
      // show the navbar if it's hidden and user scrolled up
      if (window.scrollY < lastY.current - PIXELS_TO_REVEAL) {
        setShow(true);
        lastY.current = scrollY;
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = e.currentTarget.query?.value as string | undefined;

    if (!query) return;

    router.push(jst("/products?query=", encodeURIComponent(query)));
  };

  return (
    <div className="sticky top-0 z-50 flex w-full flex-col bg-base-100 px-6 py-3 lg:hidden">
      <div className="flex w-full items-center justify-between">
        <NavDrawer routes={routes} />

        <Image
          width={142}
          height={40}
          alt={siteConfig.longName}
          src={siteConfig.mianIconLarge}
        />

        <Link href={"/cart"} className="text-primary">
          <span className="sr-only">سبد خرید</span>

          <Icon className="text-[28px]" icon={RiShoppingCartLine} />
        </Link>
      </div>

      <form
        onSubmit={onSubmit}
        className={cn(
          "relative mt-3 w-full transition-all duration-200",
          show ? "" : "mt-0 max-h-0 overflow-hidden",
        )}>
        <input
          name="query"
          placeholder="جستجو کنید"
          className="h-12 w-full rounded-lg bg-base-200 px-4 outline-none placeholder:text-base-300"
          type="text"
        />

        <Icon
          icon={RiSearchLine}
          className="absolute inset-y-0 end-4 my-auto !scale-x-100 text-[21px] text-base-300"
        />
      </form>
    </div>
  );
};

export default MainMobileHeader;
