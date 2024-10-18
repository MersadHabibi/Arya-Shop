import Profits from "@/components/layout/profits";
import Pagination from "@/components/pagination";
import { env } from "@/env";
import getAdvancedSearchOptions from "@/fetchers/advanced-search-options";
import { jst } from "@/lib/utils";
import { PaginatedResponse, Product } from "@/types/entity";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Filter from "./_components/filter";
import FilterMobile from "./_components/filter-mobile";
import ProductCard from "./_components/product-card";
import ProductCardResponsive from "./_components/product-card-responsive";

type SearchParams = {
  brand?: string;
  query?: string;
  category?: string;
  page?: string;
  min?: string;
  max?: string;
  quantity?: string;
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
    q.append("title", decodeURIComponent(sp.query));
  }

  if (sp.page) {
    q.append("page", sp.page);
  }

  if (sp.brand) {
    q.append("brand", sp.brand);
  }

  if (sp.min) {
    q.append("min_price", sp.min + "0");
  }

  if (sp.max) {
    q.append("max_price", sp.max + "0");
  }

  if (sp.quantity) {
    q.append("quantity", sp.quantity);
  }

  q.append("page_size", "15");

  const cookieStore = cookies();

  try {
    const req = await fetch(
      jst(
        env.BACKEND_URL,
        "/api/product/list",
        q.size ? `?${q.toString()}` : "",
      ),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
        },
        cache: "reload",
        next: {
          revalidate: 0,
          tags: ["products"],
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

  return (
    <>
      <Suspense>
        <div className="relative mx-auto flex w-full max-w-screen-3xl flex-col gap-6 px-5 pb-12 lg:grid lg:grid-cols-[290px_1fr] lg:px-20">
          <div className="hidden lg:block">
            {advancedSearchOptions.data && (
              <Suspense>
                <Filter
                  brands={advancedSearchOptions.data.brands}
                  categories={advancedSearchOptions.data.categories}
                />
              </Suspense>
            )}
          </div>

          <div className="flex flex-col gap-4 py-4 lg:hidden">
            {advancedSearchOptions.data && (
              <Suspense>
                <FilterMobile
                  brands={advancedSearchOptions.data.brands}
                  categories={advancedSearchOptions.data.categories}
                />
              </Suspense>
            )}
          </div>

          <div className="mx-auto hidden h-fit w-full max-w-screen-xl flex-col lg:flex">
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
                <Suspense>
                  <Pagination
                    pageKey="page"
                    pageSize={12}
                    count={result.data.count}
                    next={result.data.next}
                    previous={result.data.previous}
                  />
                </Suspense>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col divide-y lg:hidden">
              {result?.data?.results?.map((item, idx) => (
                <ProductCardResponsive key={item.Code} item={item} />
              ))}

              {!result.data?.results?.length && (
                <div className="mx-auto my-40">
                  <span>محصولی یافت نشد</span>
                </div>
              )}
            </div>

            <div className="mt-12 block w-full lg:hidden">
              {!!result.data?.results?.length && (
                <Suspense>
                  <Pagination
                    pageKey="page"
                    pageSize={12}
                    count={result.data.count}
                    next={result.data.next}
                    previous={result.data.previous}
                  />
                </Suspense>
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
