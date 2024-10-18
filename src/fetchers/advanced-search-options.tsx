import { env } from "@/env";
import { jst } from "@/lib/utils";
import { Brand, Category } from "@/types/entity";

const getAdvancedSearchOptions = async () => {
  let data: null | { brands: Brand[]; categories: Category[] } = null;
  let error: null | Error = null;

  try {
    const brands: Brand[] = await fetch(
      jst(env.BACKEND_URL, "/api/product/brand"),
      {
        next: {
          revalidate: 3600,
        },
      },
    ).then((res) => res.json());
    const categories: Category[] = await fetch(
      jst(env.BACKEND_URL, "/api/product/category/list"),
      {
        next: {
          revalidate: 3600,
        },
      },
    ).then((res) => res.json());

    data = {
      brands,
      categories,
    };
    error = null;
  } catch (err) {
    data = null;
    error = err as Error;
  }

  return {
    data,
    error,
  };
};

export default getAdvancedSearchOptions;
