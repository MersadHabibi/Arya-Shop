import Profits from "@/components/layout/profits";
import { env } from "@/env";
import Image from "next/image";
import Link from "next/link";

interface BlogIndexPage {
  id: number;
  title: string;
  intro: string;
}

interface FeaturedPosts {
  page:{
    id: number;
    title: string;
    intro: string;
    slug: string;
    header_image: {
      url: string;
      title: string;
    };
    author: string;
  }
}

interface BlogPage {
  id: number;
  meta: {
    slug: string;
  };
  title: string;
  date: string;
  intro: string;
  author: string;
  header_image: {
    url: string;
    title: string;
  };
}

export default async function BlogIndex() {
  const indexPages = await fetch(
    `${env.NEXT_PUBLIC_IMAGE_URL}/blog/api/v2/pages/?${new URLSearchParams({
      type: "blog.BlogIndexPage",
      slug: "blog",
      fields: ["featured_posts", "intro"].join(","),
    })}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const index: BlogIndexPage = indexPages.items[0];
  const featured_posts: FeaturedPosts[] = indexPages.items[0].featured_posts

  const data = await fetch(
    `${env.NEXT_PUBLIC_IMAGE_URL}/blog/api/v2/pages/?${new URLSearchParams({
      type: "blog.BlogPage",
      child_of: index.id.toString(),
      fields: ["intro", "header_image", "author"].join(","),
    })}`,
    {
      cache: 'no-cache',
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const posts: BlogPage[] = data.items;

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-24 px-6 lg:px-20">
        <div className="flex flex-col gap-7">
          <div className="relative flex h-14 w-fit items-center justify-center rounded-2xl bg-primary px-6 text-xl font-semibold text-white max-lg:w-full lg:h-[72px] lg:rounded-s-none lg:px-20 lg:text-4xl lg:font-black">
            مقالات محبوب
            <span className="absolute inset-y-0 end-[100%] h-full w-[100vw] bg-primary max-lg:hidden" />
          </div>

          <div className="grid w-full gap-8 lg:grid-cols-2">
            {featured_posts.map((child, idx) => (
              <Link
                href={`magazine/${child.page.slug}`}
                key={idx}
              >
                <article
                  className="flex h-60 gap-6 rounded-2xl border border-base-200 p-4"
                >
                  {child.page?.header_image ? (
                    <div className="relative aspect-[200/200] overflow-hidden rounded-lg">
                    <Image
                    alt={child.page.header_image.title}
                    src={env.NEXT_PUBLIC_IMAGE_URL + child.page.header_image.url}
                    className="object-contain"
                    fill
                    />
                    </div>
                    ) : (
                      <div className="aspect-square h-full shrink-0 rounded-lg bg-base-200"></div>
                    )}
                  

                  <div className="flex flex-col gap-2">
                    <h3 className="text-[40px] font-bold leading-normal">
                      {child.page.title}
                    </h3>

                    <p className="line-clamp-3 text-xl leading-normal">
                      {child.page.intro}
                    </p>

                    <p className="text-base leading-normal text-secondary">
                      نویسنده: {child.page?.author ? child.page.author : "کاربر آریا"}
                    </p>
                  </div>
                </article>
              </Link>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-7">
          <div className="relative flex h-14 w-fit items-center justify-center rounded-2xl bg-primary px-6 text-xl font-semibold text-white max-lg:w-full lg:h-[72px] lg:rounded-s-none lg:px-20 lg:text-4xl lg:font-black">
            آخرین مقالات
            <span className="absolute inset-y-0 end-[100%] h-full w-[100vw] bg-primary max-lg:hidden" />
          </div>

          <div className="grid w-full grid-cols-[repeat(auto-fit,300px)] justify-center gap-8">
            {posts.map((instance) => (
              <Link
              href={`magazine/${instance.meta.slug}`}
              key={instance.id}
            >
                <article
                  className="flex h-fit flex-col gap-2 rounded-2xl border border-base-200 p-4"
                >
                  {instance?.header_image ? (
                    <div className="relative aspect-[26/20] shrink-0 overflow-hidden rounded-lg">
                    <Image
                    alt={instance.header_image.title}
                    src={env.NEXT_PUBLIC_IMAGE_URL + instance.header_image.url}
                    className="object-contain"
                    fill
                    />
                    </div>
                    ) : (
                      <div className="aspect-[26/20] w-full shrink-0 rounded-lg bg-base-200"></div>
                    )}

                  <div className="flex flex-col gap-2">
                    <h3 className="line-clamp-1 text-xl font-bold leading-normal">
                      {instance.title}
                    </h3>

                    <p className="line-clamp-3 text-xl leading-normal">
                      {instance.intro}
                    </p>

                    <p className="text-xl leading-normal text-secondary">
                      نویسنده: {instance.author}
                    </p>
                  </div>
                </article>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-24 w-full">
        <Profits />
      </div>
    </>
  );
}
