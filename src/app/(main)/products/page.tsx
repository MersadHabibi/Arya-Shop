import Filter from "./_components/filter";
import ProductCard from "./_components/product-card";
import FilterMobile from "./_components/filter-mobile";
import Icon from "@/components/ui/icon";
import {
  RiAddLine,
  RiHeartFill,
  RiHeartLine,
  RiStarFill,
} from "react-icons/ri";
import Profits from "@/components/layout/profits";
import { Suspense } from "react";
import { env } from "@/env";
import { cn, getToken, jst } from "@/lib/utils";
import { Brand, Category, PaginatedResponse, Product } from "@/types/entity";
import Pagination from "@/components/pagination";
import getAdvancedSearchOptions from "@/fetchers/advanced-search-options";
import Link from "next/link";
import AddToFavorite from "./[id]/_components/AddToFavorite";

type SearchParams = {
  brand?: string;
  query?: string;
  category?: string;
  page?: string;
};

type Props = {
  searchParams?: SearchParams;
};

const getProducts = async (sp: SearchParams) => {
  let data: null | PaginatedResponse<Product> = null;
  let error: null | Error = null;

  const q = new URLSearchParams();

  if (sp.category) {
    q.append("category", sp.category);
  }

  if (sp.query) {
    q.append("query", encodeURIComponent(sp.query));
  }

  if (sp.page) {
    q.append("page", sp.page);
  }

  if (sp.brand) {
    q.append("brand", sp.brand);
  }

  q.append("page_size", "12");

  try {
    const req = await fetch(
      jst(
        env.NEXT_PUBLIC_BACKEND_URL,
        "/api/product/list",
        q.size ? `?${q.toString()}` : "",
      ),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken("access")}`,
        },
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!req.ok) {
      throw new Error("مشکلی در درخواست به وجود آمد");
    }

    const json: PaginatedResponse<Product> = await req.json();

    data = json ?? [];
    error = null;
  } catch (err) {
    console.error(err);
    data = null;
    error = err as Error;
  }

  return {
    data,
    error,
  };
};

const Page = async ({ searchParams }: Props) => {
  const [result, advancedSearchOptions] = await Promise.all([
    getProducts(searchParams ?? {}),
    getAdvancedSearchOptions(),
  ]);

  console.log(result.data);

  return (
    <>
      <Suspense>
        <div className="relative flex flex-col gap-6 px-5 pb-12 lg:grid lg:grid-cols-[290px_1fr] lg:px-20">
          <div className="hidden lg:block">
            {advancedSearchOptions.data && (
              <Filter
                brands={advancedSearchOptions.data.brands}
                categories={advancedSearchOptions.data.categories}
              />
            )}
          </div>

          <div className="flex flex-col gap-4 py-4 lg:hidden">
            {advancedSearchOptions.data && (
              <FilterMobile
                brands={advancedSearchOptions.data.brands}
                categories={advancedSearchOptions.data.categories}
              />
            )}
          </div>

          <div className="hidden h-fit w-full flex-col lg:flex">
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(304px,1fr))] justify-between gap-6">
              {result?.data?.results?.map((item, idx) => (
                <ProductCard data={item} key={idx} />
              ))}
            </div>

            {!result.data?.results?.length && (
              <div className="mx-auto my-auto">
                <span>محصولی یافت نشد</span>
              </div>
            )}

            <div className="mt-20 hidden w-full lg:block">
              {!!result.data?.results?.length && (
                <Pagination
                  pageKey="page"
                  pageSize={12}
                  count={result.data.count}
                  next={result.data.next}
                  previous={result.data.previous}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col divide-y lg:hidden">
              {result?.data?.results?.map((item, idx) => (
                <Link
                  href={jst(
                    "/products/",
                    item.Name.replaceAll(" ", "-"),
                    "-",
                    String(item.Code),
                  )}
                  className="overflow-hidden py-4 first:pt-0 last:pb-0"
                  key={idx}>
                  <div className="grid w-full grid-cols-[80px_1fr] gap-2 overflow-hidden min-[300px]:grid-cols-[104px_1fr]">
                    <div className="aspect-square w-full rounded-lg bg-base-200"></div>

                    <div className="relative flex flex-col gap-2">
                      <span className="text-sm font-bold">{item.Name}</span>

                      <div className="grid w-full">
                        <div className="relative flex items-center justify-between overflow-hidden">
                          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-primary">
                            {"موجودی: " + "10"}
                          </span>

                          <div className="flex shrink-0 items-center text-xs font-bold">
                            4.1
                            <Icon
                              icon={RiStarFill}
                              className="text-xs text-yellow-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto flex justify-between">
                        <div className="flex items-center gap-x-2">
                          <button className="mt-auto grid size-5 place-items-center rounded-full bg-secondary text-white">
                            <Icon icon={RiAddLine} />
                          </button>
                          <AddToFavorite
                            className={cn(
                              "btn z-20 -mb-[1.5px] mt-auto !size-fit !min-h-0 !w-fit !min-w-0 border-none !bg-transparent p-0 text-red-500",
                              item.favorite && "text-red-500",
                            )}
                            favorite={item.favorite}
                            product={item}>
                            {item.favorite ? (
                              <RiHeartFill className="text-2xl" />
                            ) : (
                              <RiHeartLine className="text-2xl" />
                            )}
                          </AddToFavorite>
                        </div>

                        <div className="flex flex-col">
                          <del className="text-base-300 line-through">
                            100.000 تومان
                          </del>

                          <span className="text-base font-black text-secondary">
                            {((item.price || 10) / 10).toLocaleString()} تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {!result.data?.results?.length && (
                <div className="mx-auto my-40">
                  <span>محصولی یافت نشد</span>
                </div>
              )}
            </div>

            <div className="mt-12 block w-full lg:hidden">
              {!!result.data?.results?.length && (
                <Pagination
                  pageKey="page"
                  pageSize={12}
                  count={result.data.count}
                  next={result.data.next}
                  previous={result.data.previous}
                />
              )}
            </div>
          </div>
        </div>
      </Suspense>

      <div className="mt-24 hidden w-full lg:block">
        <Profits />
      </div>
    </>
  );
};

export default Page;
