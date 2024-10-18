import Icon from "@/components/ui/icon";
import { Category } from "@/types/entity";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/env";
import { RiImage2Line } from "react-icons/ri";

export default function Categories({
  categories,
}: {
  categories?: Category[];
}) {
  return (
    <div className="mx-auto mt-14 flex w-full max-w-screen-3xl flex-wrap items-center justify-around gap-7 sm:mt-28 lg:justify-between">
      {categories?.map(({ Code, Name, image }) => (
        <Link
          href={`/price-list?category=${Code}`}
          key={Code}
          className="flex w-fit flex-col items-center gap-4">
          <div className="relative grid size-20 place-items-center lg:size-36">
            {image ? (
              <Image src={env.NEXT_PUBLIC_IMAGE_URL + image} alt={Name} fill />
            ) : (
              <div className="grid size-full place-items-center rounded-xl bg-base-200">
                <Icon
                  icon={RiImage2Line}
                  className="m-auto text-[48px] text-base-300"
                />
              </div>
            )}
          </div>

          <span className="h-0.5 w-full bg-base-200" />

          <span className="text-center text-base lg:text-2xl">{Name}</span>
        </Link>
      ))}
    </div>
  );
}
