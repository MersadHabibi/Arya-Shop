import Profits from "@/components/layout/profits";
import { env } from "@/env";
import ProductCard from "@/components/product-card";
import getAdvancedSearchOptions from "@/fetchers/advanced-search-options";
import { jst } from "@/lib/utils";
import { Category, Product, TBrand } from "@/types/entity";
import BrandsList from "./_components/BrandsList";
import CategoriesList from "./_components/CategoriesList";
import HeroSection from "./_components/HeroSection";
import HeroSectionMobile from "./_components/HeroSectionMobile";
import ProductsWithCategory from "./_components/ProductsWithCategory";
import WholeSale from "./_components/WholeSale";
import HomeAdvancedSearch from "./advanced-search";

type IndexPageData = {
  categories: Category[];
  brands: TBrand[];
  product_with_category: Category & {
    products: Product[];
  };
};

const getIndexData = async () => {
  let data: null | IndexPageData = null;
  let error: null | Error = null;

  try {
    const req = await fetch(jst(env.BACKEND_URL, "/api/product/index"), {
      cache: "no-cache",
    });

    data = ((await req.json()) as IndexPageData) || null;
  } catch (err) {
    data = null;
    error = err as Error;
  }

  return {
    data,
    error,
  };
};

export default async function Home() {
  const [indexData, advancedSearchOptions] = await Promise.all([
    getIndexData(),
    getAdvancedSearchOptions(),
  ]);


  return (
    <>
      <HeroSection />
      <HeroSectionMobile />

      <div className="z-10 -mt-20 hidden w-full px-20 lg:block">
        <HomeAdvancedSearch
          brands={advancedSearchOptions.data?.brands ?? []}
          categories={advancedSearchOptions.data?.categories ?? []}
        />
      </div>

      <CategoriesList categories={indexData.data?.categories} />

      <div className="overflow-hidden">
        <div className="mx-auto mt-32 grid w-full max-w-screen-3xl grid-cols-12 gap-8 px-6 lg:px-20">
          <div className="col-span-6 flex w-full items-center justify-center lg:col-span-4">
            <div className="flex flex-col gap-2">
              <span className="text-center text-[32px] font-extrabold leading-[1.4] text-secondary lg:text-[40px]">
                تخفیف
                <br />
                شگفت انگیز
              </span>

              <div className="flex gap-1">
                <div className="flex flex-col items-center justify-center gap-1 rounded-lg p-3 shadow-lg lg:p-4">
                  <span className="text-base lg:text-2xl">47</span>
                  <span className="text-xs lg:text-base">دقیقه</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 rounded-lg p-3 shadow-lg lg:p-4">
                  <span className="text-base lg:text-2xl">5</span>
                  <span className="text-xs lg:text-base">ساعت</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 rounded-lg p-3 shadow-lg lg:p-4">
                  <span className="text-base lg:text-2xl">20</span>
                  <span className="text-xs lg:text-base">روز</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative col-span-6 grid rounded-s-2xl bg-secondary p-5 lg:col-span-8">
            <span className="absolute inset-y-0 start-[100%] w-screen bg-secondary" />

            <div className="flex max-h-[386px] w-full flex-wrap items-center justify-around gap-7 overflow-hidden">
            {indexData.data?.product_with_category?.products.map((item, idx) => (
              <ProductCard data={item} key={idx} />
            ))}
            </div>
          </div>
        </div>
      </div>

      <BrandsList brands={indexData.data?.brands} />

      <ProductsWithCategory
        productsWithCategory={indexData.data?.product_with_category}
      />

      <WholeSale />

      <div className="mt-24 w-full">
        <Profits />
      </div>
    </>
  );
}
