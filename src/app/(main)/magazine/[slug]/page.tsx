import Icon from "@/components/ui/icon";
import Image from "next/image";
import { env } from "@/env";
import { RiHeartLine, RiShareLine } from "react-icons/ri";



interface BlogPage {
  id: number;
  meta: {
    type: string;
    slug: string;
    first_published_at: string;
  };
  header_image: {
    url: string;
    title: string;
  };
  title: string;
  intro: string;
  body_html: string;
  author: string;
  date: string;
}

export default async function Blog({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await fetch(
    `${env.NEXT_PUBLIC_IMAGE_URL}/blog/api/v2/pages/?${new URLSearchParams({
      slug: decodeURI(slug),
      type: "blog.BlogPage",
      fields: ["header_image", "body_html", "date", "author"].join(","),
    })}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const post: BlogPage = data.items[0];

  return (
    <div className="flex w-full max-w-screen-3xl flex-col gap-12 px-5 lg:px-20">
      <div className="flex flex-col gap-3">
        <h1 className="text-[40px] font-bold leading-normal">{post.title}</h1>

        <div className="flex items-center">
          <div className="flex w-full items-center gap-9 text-xl">
            <p>{post.author}</p>
            <p>{post.date}</p>
          </div>

          <div className="flex items-center gap-9 text-primary">
            <button>
              <Icon className="text-[24px]" icon={RiHeartLine} />
            </button>
            <button>
              <Icon className="text-[24px]" icon={RiShareLine} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative aspect-square w-full lg:aspect-[128/60]">
        <Image
          className="rounded-3xl object-cover"
          unoptimized
          src={env.NEXT_PUBLIC_BACKEND_URL + post.header_image.url}
          alt={post.header_image.title}
          fill
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.body_html }}></div>

    </div>
  );
}
