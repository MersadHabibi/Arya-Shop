import AddToCartButton from "@/components/add-to-cart-button";
import Icon from "@/components/ui/icon";
import { cn, jst } from "@/lib/utils";
import { Product } from "@/types/entity";
import Image from "next/image";
import Link from "next/link";
import { RiHeartFill, RiHeartLine, RiImage2Line } from "react-icons/ri";
import AddToFavorite from "../[id]/_components/AddToFavorite";

const ProductCard = ({ data }: { data: Product }) => {
  return (
    <article className="relative flex w-full flex-col gap-2 rounded-xl border border-base-200 bg-base-100 p-4">
      <AddToFavorite
        className={cn(
          "btn absolute right-6 top-6 z-20 !size-fit !min-h-0 !min-w-0 rounded-lg border border-base-200 bg-white p-1.5 text-red-500",
          data.favorite && "text-red-500",
        )}
        favorite={data.favorite}
        product={data}>
        {data.favorite ? (
          <RiHeartFill className="text-2xl" />
        ) : (
          <RiHeartLine className="text-2xl" />
        )}
      </AddToFavorite>
      <Link
        href={jst(
          "/products/",
          data.Name.replaceAll(" ", "-"),
          "-",
          String(data.Code),
        )}
        className="relative aspect-[268/200] w-full overflow-hidden rounded-lg">
        {data?.galleries?.[0]?.image ? (
          <Image alt={data.Name} src={data.galleries[0].image} fill />
        ) : (
          <div className="grid h-full w-full place-items-center bg-base-200">
            <Icon
              icon={RiImage2Line}
              className="m-auto text-[48px] text-base-300"
            />
          </div>
        )}
      </Link>

      {/* <div className="flex items-center text-xs font-bold">
        4.1
        <Icon icon={RiStarFill} className="text-xs text-yellow-500" />
      </div> */}

      <p className="text-xl font-bold">{data.Name}</p>

      <div className="mt-auto flex items-center justify-between">
        {/* <span className="text-base font-medium text-base-content/50 line-through">
          {data.price.toLocaleString()} تومان
        </span> */}
        <span className="text-xl font-black text-secondary">
          {((data.price ?? 10) / 10).toLocaleString()} تومان
        </span>
      </div>

      {data && <AddToCartButton product={data!} />}
    </article>
  );
};

export default ProductCard;
