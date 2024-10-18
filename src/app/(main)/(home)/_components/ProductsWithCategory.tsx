import ProductCard from "@/components/product-card";
import Icon from "@/components/ui/icon";
import { env } from "@/env";
import { Category, Product } from "@/types/entity";
import Image from "next/image";
import { RiImage2Line } from "react-icons/ri";

export default function ProductsWithCategory({
  productsWithCategory,
}: {
  productsWithCategory?: Category & {
    products: Product[];
  };
}) {
  return (
    <div className="overflow-hidden">
      <div className="mx-auto mt-32 grid w-full max-w-screen-3xl grid-cols-12 gap-8 px-6 lg:px-20">
        <div className="col-span-6 flex w-full items-center justify-center lg:col-span-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative grid size-40 place-items-center">
              {productsWithCategory?.image ? (
                <Image
                  height={160}
                  width={160}
                  alt=""
                  src={env.NEXT_PUBLIC_IMAGE_URL + productsWithCategory.image}
                />
              ) : (
                <div className="grid size-full place-items-center rounded-xl bg-base-200">
                  <Icon
                    icon={RiImage2Line}
                    className="text-[48px] text-base-300"
                  />
                </div>
              )}
            </div>

            <span className="text-center text-[32px] font-extrabold leading-[1.4] text-primary lg:text-[40px]">
              {productsWithCategory?.Name}
            </span>
          </div>
        </div>

        <div className="relative col-span-6 grid rounded-s-2xl bg-secondary p-5 lg:col-span-8">
          <span className="absolute inset-y-0 start-[100%] w-screen bg-secondary" />

          <div className="flex max-h-80 w-full flex-wrap items-center justify-center gap-7 overflow-hidden lg:max-h-96">
            {productsWithCategory?.products.map((item, idx) => (
              <ProductCard data={item} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
