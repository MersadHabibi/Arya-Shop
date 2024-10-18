"use client";

import ProductCard from "@/components/product-card";
import useFavorites from "./_components/useFavorites";
import Pagination from "@/components/pagination";
import { Suspense } from "react";

export default function FavoritePage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const favorites = useFavorites({ page: searchParams.page });

  if (favorites.isLoading)
    return (
      <>
        <div className="mx-auto my-36 flex w-full items-center justify-center">
          <span className="loading loading-spinner text-primary" />
        </div>
      </>
    );

  return (
    <div className="flex flex-col gap-7">
      <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
        کالاهای مورد علاقه شما
      </span>

      {favorites.data?.results.length ? (
        <div className="relative grid w-full grid-cols-1 justify-between gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3">
          {favorites.data?.results.map((product, idx) => (
            <ProductCard
              className="h-fit !w-full border border-base-200"
              key={product.Code}
              data={product}
            />
          ))}
        </div>
      ) : (
        <div className="py-10 text-xl">محصولی موجود نمیباشد</div>
      )}

      <div className="mt-20 hidden w-full lg:block">
        {!!favorites.data?.results.length && (
          <Suspense>
            <Pagination
              pageKey="page"
              pageSize={10}
              count={favorites.data.count}
              next={favorites.data.next}
              previous={favorites.data.previous}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
