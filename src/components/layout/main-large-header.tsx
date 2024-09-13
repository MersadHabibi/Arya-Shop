"use client";

import siteConfig from "@/config/site";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Category } from "@/types/entity";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { RiShoppingCartLine, RiUserLine } from "react-icons/ri";
import Icon from "../ui/icon";
import HeaderProductList from "./header-product-list";
import HeaderSearch from "./header-search";

const PIXELS_TO_REVEAL = 100;
const PIXELS_TO_HIDE = 300;

type Props = {
  routes: { title: string; path: string }[];
  categories: Category[];
};

const MainLargeHeader = ({ routes, categories }: Props) => {
  const pathname = usePathname();

  const auth = useAuth();

  const [show, setShow] = useState<boolean>(true);
  const lastY = useRef(0);
  const header = useRef<null | ElementRef<"div">>(null);

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

    setTimeout(() => {
      document.body.style.setProperty(
        "--header-height",
        header.current?.clientHeight + "px",
      );
    }, 100);

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  return (
    <div
      ref={header}
      className="sticky top-0 z-50 hidden w-full flex-col bg-base-100 py-6 transition-all lg:flex">
      <header className="relative z-[1] mx-auto flex w-full max-w-screen-3xl items-center bg-base-100 px-20">
        <div className="flex w-full items-center gap-7">
          <Link className="relative aspect-square h-12 2xl:h-12" href="/">
            <Image
              src={siteConfig.mianIcon}
              className="object-contain"
              alt={siteConfig.longName}
              fill
            />
          </Link>

          <HeaderSearch categories={categories} />
        </div>

        <div className="flex items-center gap-5 text-primary">
          {auth.data || true ? (
            <Link href={"/auth"}>
              <Icon className="text-[28px]" icon={RiUserLine} />
            </Link>
          ) : (
            <Link href={"/auth"}>
              <Icon className="text-[28px]" icon={RiUserLine} />
            </Link>
          )}

          <Link href={"/cart"}>
            <Icon className="text-[28px]" icon={RiShoppingCartLine} />
          </Link>
        </div>
      </header>

      <nav
        className={cn(
          "group relative z-[0] mx-auto mt-7 hidden w-full max-w-screen-3xl items-center justify-start gap-7 overflow-x-auto text-nowrap bg-base-100 px-20 transition-[margin-top] lg:flex",
          show ? "" : "mt-0 max-h-0 overflow-hidden",
        )}>
        <HeaderProductList categories={categories} />

        {routes.map(({ path, title }) => (
          <Link key={title} href={path}>
            <span
              className={cn(
                "text-base",
                path === pathname ? "text-secondary" : "",
              )}>
              {title}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MainLargeHeader;
