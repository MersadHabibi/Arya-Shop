import ArticleCard from "@/components/article-card";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import ProductCard from "@/components/product-card";
import Icon from "@/components/ui/icon";
import Input from "@/components/ui/input";
import siteConfig from "@/config/site";
import Image from "next/image";
import {
  RiGroupLine,
  RiHistoryLine,
  RiImage2Line,
  RiMapPinLine,
} from "react-icons/ri";
import HomeAdvancedSearch from "./advanced-search";
import Profits from "@/components/layout/profits";
import { jst } from "@/lib/utils";
import { env } from "@/env";
import { Brand, Category, Product } from "@/types/entity";
import Link from "next/link";
import getAdvancedSearchOptions from "@/fetchers/advanced-search-options";

type IndexPageData = {
  categories: Category[];
  product_with_category: Category & {
    products: Product[];
  };
};

const getIndexData = async () => {
  let data: null | IndexPageData = null;
  let error: null | Error = null;

  try {
    const req = await fetch(
      jst(env.NEXT_PUBLIC_BACKEND_URL, "/api/product/index"),
      {
        next: {
          revalidate: 3600,
        },
      },
    );

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
      <div className="relative mx-auto flex w-full flex-col gap-12 lg:hidden">
        <div className="relative flex w-full flex-col items-center px-8 pt-16">
          <div className="absolute inset-0 z-[-2] w-full bg-primary"></div>
          <div
            style={{
              backgroundImage: `url(/visuals/waves.png)`,
              backgroundSize: "400%",
              backgroundPositionY: "100%",
              backgroundPositionX: "60%",
            }}
            className="absolute inset-0 z-[-1] h-full w-full bg-cover bg-no-repeat opacity-30"
          />

          <div className="leading-none] z-[1] flex flex-col gap-7 max-lg:w-full max-lg:max-w-md lg:w-[60%]">
            <h1 className="flex items-center gap-6 text-5xl font-black leading-none text-white max-lg:justify-center max-sm:flex-wrap lg:justify-between lg:text-[4.5vw] 2xl:text-[80px]">
              {siteConfig.longName
                .split(" ")
                .toReversed()
                .map((t) => (
                  <span key={t}>{t}</span>
                ))}
            </h1>

            <h2 className="flex items-center gap-4 text-xl font-medium leading-none text-white max-lg:justify-center max-lg:font-semibold max-sm:flex-wrap lg:justify-between lg:text-[1.9vw] 2xl:text-4xl">
              {"توزیع و پخش تجهیزات الکترونیک"
                .split(" ")
                .toReversed()
                .map((t) => (
                  <span key={t}>{t}</span>
                ))}
            </h2>

            <p className="gap-1 text-sm leading-[1.6] text-white lg:text-justify lg:text-xl xl:text-[1.4vw] 2xl:text-2xl">
              توضیحات درباره برند آریا پخش رایکا در این قسمت نوشته شود. توضیحات
              درباره برند آریا پخش رایکا در این قسمت نوشته شود. توضیحات درباره
              برند آریا پخش رایکا در این قسمت نوشته شود. توضیحات درباره برند
              آریا پخش رایکا در این قسمت نوشته شود.
            </p>

            <Link
              href={"/about-us"}
              className="flex h-12 w-auto items-center justify-center rounded-2xl border border-white bg-white px-9 text-xs font-medium text-primary"
            >
              معرفی {siteConfig.longName}
            </Link>
          </div>

          <Image
            className="z-[0] mt-7 lg:hidden"
            src={"/visuals/visual.png"}
            alt=""
            height={356}
            width={280}
          />
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center bg-base-100 lg:col-span-5 lg:items-end">
          <div className="flex items-center justify-around divide-x-2 rtl:divide-x-reverse">
            <div className="flex flex-col gap-3 max-lg:px-6 lg:py-6 lg:first:pt-0">
              <div className="flex items-center gap-1 text-secondary">
                <Icon
                  icon={RiHistoryLine}
                  className="!scale-x-100 text-[24px]"
                />

                <span className="text-2xl font-black">19 سال</span>
              </div>

              <span className="text-base">سابقه کاری</span>
            </div>

            <div className="flex flex-col gap-3 first:pt-0 max-lg:px-6 lg:py-6">
              <div className="flex items-center gap-1 text-secondary">
                <Icon
                  icon={RiMapPinLine}
                  className="!scale-x-100 text-[24px]"
                />

                <span className="text-2xl font-black">2 شهر</span>
              </div>

              <span className="text-base">تهران و کرج</span>
            </div>

            <div className="flex flex-col gap-3 max-lg:px-6 lg:py-6 lg:first:pt-0">
              <div className="flex items-center gap-1 text-secondary">
                <Icon icon={RiGroupLine} className="!scale-x-100 text-[24px]" />

                <span className="text-2xl font-black">30000</span>
              </div>

              <span className="text-base">مشتری فعال</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto hidden h-[668px] w-full max-w-screen-3xl grid-cols-12 flex-col px-20 lg:grid">
        <div className="relative flex w-full pt-16 max-lg:flex-col max-lg:items-center lg:col-span-7">
          <div className="absolute inset-y-0 z-[-2] w-[100svw] bg-primary max-lg:-right-[calc(50svw_+_54px)] max-lg:-translate-x-[50svw] lg:end-0"></div>
          <div
            style={{
              backgroundImage: `url(/visuals/waves.png)`,
              backgroundSize: "250%",
              backgroundPositionY: "100%",
              backgroundPositionX: "60%",
            }}
            className="absolute inset-y-0 z-[-1] h-full w-svw bg-cover bg-no-repeat opacity-30 max-lg:-right-[calc(50svw_+_53px)] max-lg:-translate-x-[50svw] lg:end-0"
          />

          <div className="leading-none] z-[1] flex flex-col gap-7 max-lg:w-full max-lg:max-w-md lg:w-[60%]">
            <h1 className="flex items-center justify-between text-5xl font-black leading-none text-white lg:text-[4.5vw] 2xl:text-[80px]">
              {siteConfig.longName
                .split(" ")
                .toReversed()
                .map((t) => (
                  <span key={t}>{t}</span>
                ))}
            </h1>

            <h2 className="flex items-center justify-between text-2xl font-medium leading-none text-white max-lg:font-semibold lg:text-[1.9vw] 2xl:text-4xl">
              {"توزیع و پخش تجهیزات الکترونیک"
                .split(" ")
                .toReversed()
                .map((t) => (
                  <span key={t}>{t}</span>
                ))}
            </h2>

            <p className="gap-1 text-justify text-sm leading-[1.6] text-white lg:text-xl xl:text-[1.4vw] 2xl:text-2xl">
              توضیحات درباره برند آریا پخش رایکا در این قسمت نوشته شود. توضیحات
              درباره برند آریا پخش رایکا در این قسمت نوشته شود. توضیحات درباره
              برند آریا پخش رایکا در این قسمت نوشته شود. توضیحات درباره برند
              آریا پخش رایکا در این قسمت نوشته شود.
            </p>

            <Link
              href={"/about-us"}
              className="flex h-14 w-fit items-center justify-center rounded-2xl border border-white bg-white px-9 text-xl font-medium text-primary max-lg:w-auto"
            >
              معرفی {siteConfig.longName}
            </Link>
          </div>

          <Image
            className="z-[0] mt-7 lg:hidden"
            src={"/visuals/visual.png"}
            alt=""
            height={716}
            width={563}
          />
        </div>

        <Image
          className="absolute inset-y-0 z-[0] my-auto hidden -translate-x-10 lg:col-start-5 lg:col-end-11 lg:block"
          src={"/visuals/visual.png"}
          alt=""
          height={716}
          width={563}
        />

        <div className="flex h-full w-full flex-col items-center justify-center bg-base-100 lg:col-span-5 lg:items-end">
          <div className="flex items-center max-lg:justify-around max-lg:divide-x-2 lg:flex-col lg:divide-y-2 rtl:divide-x-reverse">
            <div className="flex flex-col gap-3 max-lg:px-6 lg:py-6 lg:first:pt-0">
              <div className="flex items-center gap-3 text-secondary">
                <Icon
                  icon={RiHistoryLine}
                  className="!scale-x-100 text-[32px]"
                />

                <span className="text-4xl font-black">19 سال</span>
              </div>

              <span className="text-2xl">سابقه کاری</span>
            </div>

            <div className="flex flex-col gap-3 first:pt-0 max-lg:px-6 lg:py-6">
              <div className="flex items-center gap-3 text-secondary">
                <Icon
                  icon={RiMapPinLine}
                  className="!scale-x-100 text-[32px]"
                />

                <span className="text-4xl font-black">2 شهر</span>
              </div>

              <span className="text-2xl">تهران و کرج</span>
            </div>

            <div className="flex flex-col gap-3 max-lg:px-6 lg:py-6 lg:first:pt-0">
              <div className="flex items-center gap-3 text-secondary">
                <Icon icon={RiGroupLine} className="!scale-x-100 text-[32px]" />

                <span className="text-4xl font-black">30000</span>
              </div>

              <span className="text-2xl">مشتری فعال</span>
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 -mt-20 hidden w-full px-20 lg:block">
        <HomeAdvancedSearch
          brands={advancedSearchOptions.data?.brands ?? []}
          categories={advancedSearchOptions.data?.categories ?? []}
        />
      </div>

      <div className="mx-auto mt-32 flex w-full max-w-screen-3xl flex-wrap items-center justify-around gap-7 px-20 lg:justify-between">
        {indexData.data?.categories.map(({ Code, Name, image }) => (
          <Link
            href={`/products?category=${Code}`}
            key={Code}
            className="flex w-fit flex-col items-center gap-4"
          >
            <div className="relative grid size-20 place-items-center lg:size-40">
              {image ? (
                <Image src={image} alt={Name} fill />
              ) : (
                <div className="grid size-full place-items-center rounded-xl bg-base-200">
                  <Icon
                    icon={RiImage2Line}
                    className="m-auto text-[48px] text-base-300"
                  />
                </div>
              )}
            </div>

            <span className="h-0.5 w-full bg-base-200" />

            <span className="text-center text-base lg:text-2xl">{Name}</span>
          </Link>
        ))}
      </div>

      {/* <div className="overflow-hidden">
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
              {Array(3)
                .fill("")
                .map((_, idx) => (
                  <ProductCard key={idx} />
                ))}
            </div>
          </div>
        </div>
      </div> */}

      <div className="mx-auto mt-32 flex w-full max-w-screen-3xl flex-col px-6 lg:px-20">
        <div className="relative flex h-14 w-fit items-center justify-center rounded-2xl bg-primary px-6 text-xl font-semibold text-white max-lg:w-full lg:h-[72px] lg:rounded-s-none lg:px-20 lg:text-4xl lg:font-black">
          برند
          <span className="absolute inset-y-0 end-[100%] h-full w-[100vw] bg-primary max-lg:hidden" />
        </div>

        <div className="mt-7 grid w-full grid-cols-2 gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-7">
          {brands.map(({ image }, idx) => (
            <div
              key={idx}
              className="relative flex aspect-[2/1] w-full rounded-lg p-7 shadow-lg lg:rounded-2xl"
            >
              <div className="relative h-full w-full">
                <Image fill src={image} alt="" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-7 text-xl font-medium max-lg:hidden">
          ارزش اصلی، حفظ منافع تمامی ذینفعان است و یکی از مهم ترین ذینفعان شرکت
          آریا پخش رایکا تامین کنندگان آن می‌باشند که طی سال‌ها تجربه کاری توام
          با دانش همراه بوده است.توانایی بخصوص ما در حوزه برندسازی به عنوان شرکت
          پخش مویرگی مستقل حوزه الکترونیک باعث شده تا طی سال‌ها تجربه کاری خود
          هم مسیر با کارخانه‌ها و وارد کننده‌های نو ظهور و قدرتمند باشیم و
          همچنین در مسیر برند سازی پیشرفت قابل توجهی را برای تامین کنندگان در
          راستای برند محصولاتشان رقم زنند. یکی از افتخارات شرکت آریا پخش رایکا،
          استفاده از نرم افزار های بروز و تحت وب جهت توسعه همکاری با تامین
          کنندگان می‌باشد. در این سیستم هر تامین کننده در یک داشبورد اختصاصی
          جزیئات، قیمت فروش و موجودی کالای خود را در سیستم پخش آریا مشاهده
          می‌نماید.
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="mx-auto mt-32 grid w-full max-w-screen-3xl grid-cols-12 gap-8 px-6 lg:px-20">
          <div className="col-span-6 flex w-full items-center justify-center lg:col-span-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="relative grid size-40 place-items-center">
                {indexData.data?.product_with_category.image ? (
                  <Image
                    height={160}
                    width={160}
                    alt=""
                    src={"/categries/light-and-brightness.png"}
                  />
                ) : (
                  <div className="grid size-full place-items-center rounded-xl bg-base-200">
                    <Icon
                      icon={RiImage2Line}
                      className="text-[48px] text-base-300"
                    />
                  </div>
                )}
              </div>

              <span className="text-center text-[32px] font-extrabold leading-[1.4] text-primary lg:text-[40px]">
                {indexData.data?.product_with_category.Name}
              </span>
            </div>
          </div>

          <div className="relative col-span-6 grid rounded-s-2xl bg-primary p-5 lg:col-span-8">
            <span className="absolute inset-y-0 start-[100%] w-screen bg-primary" />

            <div className="flex max-h-80 w-full flex-wrap items-center justify-center gap-7 overflow-hidden lg:max-h-96">
              {indexData.data?.product_with_category.products.map(
                (item, idx) => <ProductCard data={item} key={idx} />,
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-32 flex w-full max-w-screen-3xl flex-col px-6 lg:px-20">
        <div className="relative flex h-14 w-full items-center justify-center rounded-2xl bg-primary px-6 text-xl font-semibold text-white lg:h-[72px] lg:w-fit lg:rounded-s-none lg:px-20 lg:text-4xl lg:font-black">
          آخرین مقالات
          <span className="absolute inset-y-0 end-[100%] h-full w-[100vw] bg-primary max-lg:hidden" />
        </div>

        <div className="mt-7 flex w-full items-center gap-7 px-2 py-4 max-lg:overflow-x-scroll lg:mt-12 lg:flex-wrap lg:justify-around">
          {Array(4)
            .fill("")
            .map((_, idx) => (
              <ArticleCard key={idx} />
            ))}
        </div>
      </div>

      <div className="relative mt-32 bg-secondary">
        <div
          style={{
            backgroundImage: `url(/visuals/waves.png)`,
            backgroundSize: "250%",
            backgroundPositionY: "80%",
            backgroundPositionX: "60%",
          }}
          className="absolute inset-y-0 z-[0] h-full w-full bg-cover bg-no-repeat opacity-30 max-lg:hidden"
        />
        <div
          style={{
            backgroundImage: `url(/visuals/waves.png)`,
            backgroundSize: "550%",
            backgroundPositionY: "80%",
            backgroundPositionX: "60%",
          }}
          className="absolute inset-y-0 z-[0] h-full w-full bg-cover bg-no-repeat opacity-30 lg:hidden"
        />

        <div className="relative z-[1] mx-auto flex w-full max-w-screen-3xl flex-col gap-7 px-6 py-14 lg:px-20">
          <h2 className="text-[40px] font-black leading-[1.4] text-white max-lg:line-clamp-2 max-lg:text-center">
            ثبت درخواست <br className="lg:hidden" />
            خرید عمده
          </h2>

          <ul className="text-base leading-6 text-white lg:text-2xl lg:leading-9">
            <li>
              اگر شما قصد خرید یک عدد کالا یا هزار عدد از کالا‌های ما را دارید.
            </li>
            <li>
              اگر شما قصد پرداخت نقدی و دریافت تخفیف نقدی را دارید یا قصد پرداخت
              اسناد بلند مدت را دارید
            </li>
            <li>اگر شما بخش‌کننده هستید و یا فروش محلی را دارید </li>
          </ul>

          <div className="flex grid-cols-4 flex-col gap-7 lg:grid">
            <div className="relative w-full">
              <Input
                className="h-[53px] w-full lg:h-16"
                label="نام شخص/ شرکت:"
              />
            </div>

            <div className="relative w-full">
              <Input
                className="h-[53px] w-full lg:h-16"
                label="شماره موبایل:"
              />
            </div>
            <div className="relative w-full">
              <Input className="h-[53px] w-full lg:h-16" label="ایمیل:" />
            </div>
            <div className="relative w-full">
              <Input
                className="h-[53px] w-full lg:h-16"
                label="نام نماینده شرکت:"
              />
            </div>
          </div>

          <button className="btn btn-lg !min-h-0 rounded-2xl bg-white px-12 text-base text-primary hover:bg-white/90 max-lg:!h-[53px] lg:ms-auto lg:text-xl">
            ثبت درخواست
          </button>
        </div>
      </div>

      <div className="mt-24 w-full">
        <Profits />
      </div>
    </>
  );
}

const brands = [
  {
    image: "/brands/queen-tech.svg",
  },
  {
    image: "/brands/odana.svg",
  },
  {
    image: "/brands/she-charisma.svg",
  },
  {
    image: "/brands/bexo.svg",
  },
  {
    image: "/brands/persian-mobile-company.svg",
  },
  {
    image: "/brands/beccaro.svg",
  },
  {
    image: "/brands/gigacell.svg",
  },
  {
    image: "/brands/trust.svg",
  },
];
