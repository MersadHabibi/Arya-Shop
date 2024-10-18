"use client";

import Pagination from "@/components/pagination";
import { Comment, PaginatedResponse } from "@/types/entity";
import { Suspense } from "react";

type Props = {
  data: PaginatedResponse<Comment>;
};

const ProductComments = ({ data }: Props) => {
  if (!data?.count || data.count === 0)
    return (
      <div>
        <span className="text-xl">برای این محصول نظری ثبت نشده هست</span>
      </div>
    );

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {data?.results?.map((item, idx) => (
          <article
            key={idx}
            className="flex flex-col gap-3 rounded-xl border border-base-300 p-6">
            <h3 className="text-[28px] font-bold">
              {item.user.name ?? "کاربر عزیز"}
            </h3>

            {item.title && (
              <h2 className="text-[24px] font-bold">{item.title}</h2>
            )}

            {/* <div>
                    <div dir="ltr" className="flex w-fit items-center gap-1">
                      {Array(5)
                        .fill("")
                        .map((_, idx) => (
                          <Icon
                            key={idx}
                            className={cn(
                              "text-xl",
                              idx === 4 ? "text-base-300" : "text-yellow-500",
                            )}
                            icon={RiStarFill}
                          />
                        ))}
                    </div>
                  </div> */}
            {/* 
                  <ul className="flex flex-col gap-3 text-base">
                    {["نکته مثبت", "نکته مثبت"].map((v, idx) => (
                      <li className="text-primary" key={idx}>
                        {"+ "}
                        {v}
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-col gap-3 text-base text-secondary">
                    {["نکته منفی"].map((v, idx) => (
                      <li className="" key={idx}>
                        {"+ "}
                        {v}
                      </li>
                    ))}
                  </ul> */}

            {item.text && <p className="text-base">{item.text}</p>}
          </article>
        ))}
      </div>

      <Suspense>
        <Pagination
          count={data.count}
          next={data.next}
          pageKey="page"
          previous={data.previous}
          pageSize={10}
        />
      </Suspense>
    </>
  );
};

export default ProductComments;
