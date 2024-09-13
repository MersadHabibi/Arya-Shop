"use client";

import { cn } from "@/lib/utils";
import { ElementRef, PropsWithChildren, useEffect, useRef } from "react";

const HalfMargin = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  const div = useRef<null | ElementRef<"div">>(null);

  useEffect(() => {
    const { current } = div;

    if (!current) return;

    const func = () => {
      current.style.setProperty("--mt", current.clientHeight / 2 + "px");
    };

    func();

    window.addEventListener("resize", func);

    return () => {
      window.removeEventListener("resize", func);
    };
  }, [div]);

  return (
    <div ref={div} className={cn("-mt-[var(--mt)]", className)}>
      {children}
    </div>
  );
};

export default HalfMargin;
