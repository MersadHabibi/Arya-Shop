import { env } from "@/env";
import { cn } from "@/lib/utils";
import { Product } from "@/types/entity";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  product: { Name: string; Code: number; galleries: { image: string } | null };
  quantity: number;
  price: number;
  amount: number;
};

export default function OrderProductCard(props: TProps) {
  return (
    <Link href={`/products/${props.product.Code}`} className="block">
      <div className="grid w-full grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-base-300 p-3 sm:grid-cols-[190px_1fr] sm:gap-10 sm:p-5 md:grid-cols-[220px_1fr] lg:grid-cols-[200px_1fr] lg:gap-5 xl:grid-cols-[220px_1fr] xl:gap-10">
        <div
          className={cn(
            "aspect-square size-full overflow-hidden rounded-lg",
            props.product.galleries?.image || "bg-base-200",
          )}>
          {props.product.galleries?.image ? (
            <Image
              alt={props.product.Name}
              src={env.NEXT_PUBLIC_IMAGE_URL + props.product.galleries.image}
              className="!static size-full object-contain"
              fill
            />
          ) : null}
        </div>

        <div className="relative flex flex-col justify-center gap-2 px-2 pt-2 xs:text-base sm:px-0 md:text-lg">
          <p className="line-clamp-1 text-xl font-medium md:text-2xl/10 xl:text-3xl/[45px]">
            {props.product.Name}
          </p>
          <p className="line-clamp-2">توضیحات کالا در این قسمت نوشته شود.</p>
          <p className="text-base-300">گارانتی اصالت و سلامت فیزیکی کالا</p>
          {/* <p className="text-base-300">ویژگی: رنگ، مدل</p> */}
          <p className="text-base-300">تعداد: {props.quantity}</p>
          <span className="mb-2 mt-auto text-base font-black text-secondary lg:mb-2 lg:text-xl">
            {(props.price / 10).toLocaleString()} تومان
          </span>
        </div>
      </div>
    </Link>
  );
}
