import { RiImage2Line, RiStarFill } from "react-icons/ri";
import Icon from "./ui/icon";
import { cn, jst } from "@/lib/utils";
import { Product } from "@/types/entity";
import Image from "next/image";
import AddToCartButton from "./add-to-cart-button";
import Link from "next/link";

type Props = {
  className?: string;
  data?: Product;
};

const ProductCard = ({ className, data }: Props) => {
  return (
    <article
      className={cn(
        "flex h-80 w-[220px] flex-col gap-2 rounded-xl bg-base-100 p-4 [direction:var(--direction)] lg:h-96 lg:w-[290px]",
        className,
      )}>
      <Link
        href={jst(
          "/products/",
          data!.Name.replaceAll(" ", "-"),
          "-",
          String(data!.Code),
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

      <p
        title={data?.Name}
        className="line-clamp-1 pb-3 pt-1 text-base font-bold lg:text-xl">
        {data?.Name}
      </p>

      <div className="mt-auto flex justify-between max-lg:flex-col lg:items-center">
        <span className="text-xl font-black text-secondary">
          {(data?.price || 10) / 10} تومان
        </span>
      </div>

      <AddToCartButton product={data!} />
    </article>
  );
};

export default ProductCard;
