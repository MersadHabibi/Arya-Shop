"use client";
import useMounted from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

type Props = {
  onLoad?: () => void;
  length: number;
} & React.ComponentPropsWithoutRef<"div">;

const Caruseal = ({ className, onLoad, length, ...props }: Props) => {
  const mounted = useMounted();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: mounted
      ? window?.document?.dir === "rtl"
        ? length - 1
        : 0
      : 0,
    skipSnaps: true,
    align: mounted
      ? window?.document?.dir === "rtl"
        ? "end"
        : "start"
      : "start",
  });

  useEffect(() => {
    if (!emblaApi?.rootNode) return;

    emblaApi.containerNode().style.setProperty("--direction", document.dir);
  }, [emblaApi]);

  return (
    <div
      dir="ltr"
      ref={emblaRef}
      className={cn("embla overflow-hidden", className)}
      {...props}
    />
  );
};

export default Caruseal;
