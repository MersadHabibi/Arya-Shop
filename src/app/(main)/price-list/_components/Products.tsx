import Pagination from "@/components/pagination";
import Icon from "@/components/ui/icon";
import { env } from "@/env";
import { Product } from "@/types/entity";
import Image from "next/image";
import { Suspense } from "react";
import { RiImage2Line } from "react-icons/ri";

type TProps = {
  results?: Product[];
  next?: null | number;
  previous?: null | number;
  count?: number;
};

export default function Products(data: TProps) {
  return (
    <table className="price-list-table mt-14 block w-full sm:table">
      <thead className="hidden w-full border-spacing-5 overflow-hidden rounded-xl sm:table-header-group">
        <tr className="h-16 w-full overflow-hidden !rounded-xl bg-[#D9D9D9] text-right text-base font-normal text-black">
          <th className="pr-5">تصویر</th>
          <th>نام محصول</th>
          <th>نام برند</th>
          <th>کد محصول</th>
          <th>قیمت</th>
          <th>گارانتی</th>
        </tr>
      </thead>
      <tbody className="flex !w-full flex-col !divide-y !divide-base-300 px-4 text-right sm:table-row-group sm:!divide-base-200">
        {data.results?.map((product) => (
          <tr
            key={product.Code}
            className="flex w-full flex-col items-center justify-center gap-y-3 py-3 sm:table-row sm:h-14">
            <td className="py-1.5 sm:pr-5">
              {product.galleries?.image ? (
                <Image
                  src={
                    env.NEXT_PUBLIC_IMAGE_URL + "/" + product.galleries?.image
                  }
                  alt={product.Name}
                  width={60}
                  height={60}
                />
              ) : (
                <Icon
                  icon={RiImage2Line}
                  className="text-[48px] text-base-300"
                />
              )}
            </td>
            <td className="text-[15px] font-medium text-black">
              {product.Name}
            </td>
            <td className="sm:px-6">_</td>
            <td>{product.Code}</td>
            <td>{product.price}</td>
            <td className="sm:px-4">18 ماه</td>
          </tr>
        ))}
        <tr className="block h-24 py-2 align-middle sm:table-row">
          <td
            colSpan={6}
            className="flex h-full w-full items-center justify-center sm:table-cell">
            <div className="flex h-full items-center justify-center py-2">
              {!!data.results?.length && (
                <Suspense>
                  <Pagination
                    pageKey="page"
                    pageSize={12}
                    count={data.count || 0}
                    next={data.next || null}
                    previous={data.previous || null}
                  />
                </Suspense>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
