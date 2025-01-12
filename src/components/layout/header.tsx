import { Category } from "@/types/entity";
import MainLargeHeader from "./main-large-header";
import MainMobileHeader from "./main-mobile-header";
import routes from "@/config/routes";
import { env } from "@/env";
import { jst } from "@/lib/utils";
import { Suspense } from "react";

const getCategories = async () => {
  let data: null | Category[] = null;
  let error: null | Error = null;

  try {
    const req = await fetch(
      jst(env.BACKEND_URL, "/api/product/category/list"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!req.ok) {
      throw new Error("مشکلی در درخواست به وجود آمد");
    }

    const json: Category[] = await req.json();

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

const Header = async () => {
  const categories = await getCategories();

  return (
    <>
      <div className="h-10 w-full bg-primary lg:h-12"></div>
      <MainLargeHeader routes={routes} categories={categories.data ?? []} />
      <Suspense>
        <MainMobileHeader routes={routes} />
      </Suspense>
    </>
  );
};

export default Header;
