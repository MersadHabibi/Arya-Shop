"use client";

import { jst } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Props = {
  pageSize?: number;
  pageKey: string;
  next: null | number;
  previous: null | number;
  count: number;
};

const Pagination = ({
  count,
  next,
  previous,
  pageKey,
  pageSize = 10,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = useMemo(() => {
    return Number(searchParams.get(pageKey) ?? "1");
  }, [searchParams, pageKey]);

  const pages = useMemo(() => {
    if (count === 0) return 0;
    if (pageSize === 0) return 0;

    return Math.floor(count / pageSize);
  }, [count, pageSize]);

  const navigate = (target: string) => {
    const q = new URLSearchParams(Array.from(searchParams.entries()));

    q.set(pageKey, target);

    router.push(jst(pathname, "?", q.toString()));
  };

  return (
    <div className="flex items-center gap-5 text-lg lg:text-2xl">
      <button
        onClick={() => {
          if (previous) navigate(String(previous));
        }}
        className="whitespace-nowrap text-primary disabled:text-base-300"
        disabled={!previous}>
        صفحه قبلی
      </button>

      {previous && <button>{previous}</button>}

      <button className="text-secondary">{page}</button>

      {next ? <button>{next}</button> : null}

      {next && pages > next && <span>...</span>}

      {next && next !== pages && (
        <button onClick={() => navigate(String(pages))}>{pages}</button>
      )}

      <button
        onClick={() => {
          if (next) navigate(String(next));
        }}
        className="whitespace-nowrap text-primary disabled:text-base-300"
        disabled={!next}>
        صفحه بعدی
      </button>
    </div>
  );
};

export default Pagination;
