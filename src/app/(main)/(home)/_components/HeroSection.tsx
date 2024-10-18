import AnimatedNumber from "@/components/modules/AnimatedNumber";
import Icon from "@/components/ui/icon";
import siteConfig from "@/config/site";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { RiGroupLine, RiHistoryLine, RiMapPinLine } from "react-icons/ri";

export default function HeroSection() {
  return (
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
            برند آریا پخش رایکا در این قسمت نوشته شود. توضیحات درباره برند آریا
            پخش رایکا در این قسمت نوشته شود.
          </p>

          <Link
            href={"/about-us"}
            className="flex h-14 w-fit items-center justify-center rounded-2xl border border-white bg-white px-9 text-xl font-medium text-primary max-lg:w-auto">
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
              <Icon icon={RiHistoryLine} className="!scale-x-100 text-[32px]" />

              <span className="text-4xl font-black"><AnimatedNumber from={0} to={19} duration={3} /> سال</span>
            </div>

            <span className="text-2xl">سابقه کاری</span>
          </div>

          <div className="flex flex-col gap-3 first:pt-0 max-lg:px-6 lg:py-6">
            <div className="flex items-center gap-3 text-secondary">
              <Icon icon={RiMapPinLine} className="!scale-x-100 text-[32px]" />

              <span className="text-4xl font-black"><AnimatedNumber from={0} to={2} duration={3} /> شهر</span>
            </div>

            <span className="text-2xl">تهران و کرج</span>
          </div>

          <div className="flex flex-col gap-3 max-lg:px-6 lg:py-6 lg:first:pt-0">
            <div className="flex items-center gap-3 text-secondary">
              <Icon icon={RiGroupLine} className="!scale-x-100 text-[32px]" />

              <span className="text-4xl font-black">
                <AnimatedNumber from={0} to={30000} />
              </span>
            </div>

            <span className="text-2xl">مشتری فعال</span>
          </div>
        </div>
      </div>
    </div>
  );
}
