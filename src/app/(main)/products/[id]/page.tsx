import AddToCartButton from "@/components/add-to-cart-button";
import Profits from "@/components/layout/profits";
import ProductCard from "@/components/product-card";
import Icon from "@/components/ui/icon";
import { env } from "@/env";
import { cn, getToken, jst } from "@/lib/utils";
import { Category, Comment, PaginatedResponse, Product } from "@/types/entity";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  RiHeartFill,
  RiHeartLine,
  RiImage2Line,
  RiStarFill,
} from "react-icons/ri";
import ProductComments from "../_components/product-comments";
import NewComment from "./_components/NewComment";
import AddToFavorite from "./_components/AddToFavorite";

const Caruseal = dynamic(() => import("@/components/ui/caruseal"), {
  loading: () => (
    <div className="block h-[330px] w-full animate-pulse bg-base-200"></div>
  ),
});

const BottomAddToCart = dynamic(
  () => import("../_components/bottom-add-to-cart"),
);

type Params = {
  id: string;
};

type SearchParams = {
  page?: string;
};

type Props = {
  params: Params;
  searchParams: SearchParams;
};

type ProductInfo = Product & {
  DrgGrp: Category;
  DrugClass: Category;
  quantity: number;
  similar_products: Product[];
  favorite: boolean;
};

type GetCommentsProps = {
  id: string;
  page: string;
};

const getProductInfo = async (id: string) => {
  let data: null | ProductInfo = null;
  let error: null | Error = null;

  try {
    data = await fetch(jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/product/", id), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken("access")}`,
      },
    }).then((res) => res.json());
  } catch (err) {
    error = err as Error;
    data = null;
  }

  return {
    data,
    error,
  };
};

const getComments = async ({ id, page }: GetCommentsProps) => {
  let data: null | PaginatedResponse<Comment> = null;
  let error: null | Error = null;

  try {
    data = await fetch(
      `${env.NEXT_PUBLIC_BACKEND_URL}/api/product/comment/${id}?page=${page}&page_size=10`,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getToken("access")}`,
        },
        cache: "no-store",
        next: {
          tags: ["comments"],
        },
      },
    ).then((res) => {
      return res.json();
    });
  } catch (err) {
    error = err as Error;
    data = null;
  }

  return {
    data,
    error,
  };
};

const getPageNumber = (sp: SearchParams) => {
  if (sp.page === "0" || sp.page === undefined) return "1";

  if (/\d/.test(sp.page)) return sp.page;

  return "1";
};

const Page = async ({ params, searchParams }: Props) => {
  const id = params.id.split("-").slice(-1)[0];
  const page = getPageNumber(searchParams);

  const [productInfo, productComments] = await Promise.all([
    getProductInfo(id),
    getComments({ id, page }),
  ]);

  console.log(
    "product Info",
    productInfo.data?.Name,
    productInfo.data,
    productInfo.data?.favorite,
  );

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-24 px-5 max-lg:pb-7 lg:px-20">
        <section className="grid w-full gap-14 lg:grid-cols-[1fr_330px]">
          <div className="flex w-full grid-cols-2 flex-col gap-14 max-lg:pt-12 lg:grid">
            <div className="flex w-full flex-col gap-4">
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl max-lg:mx-auto max-lg:max-w-sm">
                  {productInfo.data?.galleries?.[0]?.image ? (
                    <Image
                      alt={productInfo.data?.Name}
                      unoptimized
                      src={productInfo.data?.galleries?.[0]?.image}
                      fill
                    />
                  ) : (
                    <div className="grid size-full place-items-center bg-base-200">
                      <Icon
                        icon={RiImage2Line}
                        className="text-[60px] text-base-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              {(productInfo.data?.galleries?.length ?? 0) > 1 && (
                <div>
                  <div className="grid w-full grid-cols-4 gap-3 max-lg:mx-auto max-lg:max-w-sm">
                    {productInfo.data?.galleries
                      ?.slice(1)
                      .map(({ image }, idx) => {
                        return (
                          <div
                            key={idx}
                            className="relative aspect-square w-full rounded-xl">
                            <Icon
                              icon={RiImage2Line}
                              className="absolute inset-0 m-auto text-[40px] text-base-300"
                            />

                            <Image
                              alt={productInfo.data?.Name ?? ""}
                              unoptimized
                              src={image}
                              fill
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="border-b-2 border-base-200 pb-5 text-xl leading-tight lg:text-[40px] lg:font-bold">
                {productInfo.data?.Name}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-base font-bold">
                    4.1
                    <Icon
                      icon={RiStarFill}
                      className="text-lg text-yellow-500"
                    />
                  </div>

                  <span className="text-base text-primary">20 دیدگاه</span>
                </div>
                <AddToFavorite
                  className={cn(
                    "flex items-center gap-x-2 text-neutral-500",
                    productInfo.data?.favorite && "text-red-500",
                  )}
                  favorite={productInfo.data?.favorite || false}
                  product={productInfo.data as Product}>
                  {productInfo.data?.favorite ? (
                    <>
                      <p className="">حذف از علاقه مندی ها</p>
                      <RiHeartFill className="text-xl" />
                    </>
                  ) : (
                    <>
                      <p className="">افزودن به علاقه مندی ها</p>
                      <RiHeartLine className="text-xl" />
                    </>
                  )}
                </AddToFavorite>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-base leading-tight">ویژگی‌ها</h2>

                <div className="flex flex-wrap gap-2">
                  {["2 ترابایت", "رویه پلاستیک"].map((v) => (
                    <span
                      key={v}
                      className="rounded-xl bg-base-200 p-4 text-sm lg:text-xl">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-base leading-tight">زنگ‌ها</h2>

                <div className="flex flex-wrap gap-2">
                  {["bg-black", "bg-gray-500"].map((v) => (
                    <button
                      key={v}
                      className={cn(
                        "size-12 rounded-full",
                        v,
                        v === "bg-gray-500" ? "border-4 border-primary" : "",
                      )}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xl text-base-300">
                {`درخواست مرجوع کردن کالا در هارد اکسترنال با دلیل "انصراف از خرید" تنها در صورتی قابل تایید است که کالا در شرایط اولیه باشد.`}
              </p>
            </div>
          </div>

          <div className="relative hidden h-full w-full lg:block">
            <div className="flex flex-col gap-4 rounded-2xl border border-base-300 p-4">
              <span className="ms-auto text-2xl">
                {((productInfo.data?.price ?? 10) / 10).toLocaleString()} تومان
              </span>

              <AddToCartButton product={productInfo.data!} />

              <ul className="flex flex-col text-base">
                {[
                  "گارانتی اصالت و سلامت فیزیکی کالا",
                  " ۷ روز تضمین بازگشت کالا",
                  "ارسال در سریع‌ترین زمان",
                ].map((title, idx) => {
                  return (
                    <li
                      className="flex items-center gap-3 border-t border-base-200 py-4 text-primary first:border-t-0 first:pt-0 last:pb-0"
                      key={idx}>
                      <span className="size-2 rounded-full bg-primary" />

                      <span>{title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-7">
          <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
            درباره محصول
          </span>

          <p className="text-base">برای این محصول توضیحاتی موجود نمیباشد.</p>
        </section>

        <section className="flex flex-col gap-7">
          <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
            مشخصات کالا
          </span>

          <table className="w-fit">
            <tbody>
              {Object.entries({
                ابعاد: "22 * 22 * 22",
                وزن: "55 گرم",
                "وسایل جانبی": "سیم اتصال",
              }).map((item, idx) => (
                <tr key={idx} className="group text-base">
                  <td className="pb-4 pe-12 group-last:pb-0">{item[0]}:</td>

                  <td className="text-secondary">{item[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {productInfo.data?.similar_products ? (
          <section className="flex flex-col gap-7">
            <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
              کالاهای مشابه
            </span>

            <div className="grid w-full">
              <Caruseal
                length={productInfo.data?.similar_products?.length ?? 0}
                className="w-full py-1">
                <div className="embla__container flex w-full items-center gap-4">
                  {productInfo.data?.similar_products.map((item) => (
                    <ProductCard
                      key={item.Code}
                      data={item}
                      className="embla__slide shrink-0 select-none border border-base-200 first:me-auto"
                    />
                  ))}
                </div>
              </Caruseal>
            </div>
          </section>
        ) : null}

        {!productComments.error && productComments.data && (
          <section className="flex flex-col gap-7">
            <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
              نظرات کاربران
            </span>

            <ProductComments data={productComments.data} />
          </section>
        )}

        <NewComment
          product={{
            id: productInfo.data?.Code || 0,
            name: productInfo.data?.Name || "",
          }}
        />
      </div>

      <div className="mt-24 hidden lg:block">
        <Profits />
      </div>

      <BottomAddToCart product={productInfo.data!} />
    </>
  );
};

export default Page;
