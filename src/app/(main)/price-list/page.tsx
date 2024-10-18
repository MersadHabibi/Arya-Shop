import { env } from "@/env";
import { jst } from "@/lib/utils";
import { Category, PaginatedResponse, Product } from "@/types/entity";
import CategoriesList from "../(home)/_components/CategoriesList";
import Categories from "./_components/Categories";
import { cookies } from "next/headers";
import Products from "./_components/Products";
import { RiFileTextLine } from "react-icons/ri";

type TCategories = {
  categories: Category[];
};

type TSearchParams = {
  category?: string;
  page?: string;
};

const getIndexData = async () => {
  let data: null | TCategories = null;
  let error: null | Error = null;

  try {
    const req = await fetch(jst(env.BACKEND_URL, "/api/product/index"), {
      cache: "no-cache",
    });

    data = ((await req.json()) as TCategories) || null;
  } catch (err) {
    data = null;
    error = err as Error;
  }

  return {
    data,
    error,
  };
};

const getProducts = async (searchParams?: TSearchParams) => {
  let data: null | PaginatedResponse<Product> = null;
  let error: null | Error = null;

  const q = new URLSearchParams();

  if (searchParams?.category) {
    q.append("category", searchParams?.category);
  }

  if (searchParams?.page) {
    q.append("page", searchParams?.page);
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

export default async function PriceListPage({
  searchParams,
}: {
  searchParams?: TSearchParams;
}) {
  const [indexData, products] = await Promise.all([
    getIndexData(),
    getProducts(searchParams),
  ]);

  return (
    <div className="mx-auto w-full max-w-screen-3xl px-5 pb-40 pt-10 lg:px-20">
      <p className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
        لیست قیمت
      </p>
      <Categories categories={indexData.data?.categories} />
      <Products {...products.data} />
      <button className="mr-auto mt-4 flex items-center gap-x-2 rounded-xl bg-primary px-8 py-3 text-white transition-all hover:brightness-90">
        <RiFileTextLine className="text-2xl" />
        <span>دانلود لیست PDF</span>
      </button>
    </div>
  );
}
