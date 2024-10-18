import AnimatedNumber from "@/components/modules/AnimatedNumber";
import Icon from "@/components/ui/icon";
import siteConfig from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { RiGroupLine, RiHistoryLine, RiMapPinLine } from "react-icons/ri";

export default function HeroSectionMobile() {
  return (
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
            برند آریا پخش رایکا در این قسمت نوشته شود. توضیحات درباره برند آریا
            پخش رایکا در این قسمت نوشته شود.
          </p>

          <Link
            href={"/about-us"}
            className="flex h-12 w-auto items-center justify-center rounded-2xl border border-white bg-white px-9 text-xs font-medium text-primary">
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
              <Icon icon={RiHistoryLine} className="!scale-x-100 text-[24px]" />

              <span className="text-2xl font-black"><AnimatedNumber from={0} to={19} duration={3} /> سال</span>
            </div>

            <span className="text-base">سابقه کاری</span>
          </div>

          <div className="flex flex-col gap-3 first:pt-0 max-lg:px-6 lg:py-6">
            <div className="flex items-center gap-1 text-secondary">
              <Icon icon={RiMapPinLine} className="!scale-x-100 text-[24px]" />

              <span className="text-2xl font-black"><AnimatedNumber from={0} to={2} duration={3} /> شهر</span>
            </div>

            <span className="text-base">تهران و کرج</span>
          </div>

          <div className="flex flex-col gap-3 max-lg:px-6 lg:py-6 lg:first:pt-0">
            <div className="flex items-center gap-1 text-secondary">
              <Icon icon={RiGroupLine} className="!scale-x-100 text-[24px]" />

              <span className="text-2xl font-black"> <AnimatedNumber from={0} to={30000} /></span>
            </div>

            <span className="text-base">مشتری فعال</span>
          </div>
        </div>
      </div>
    </div>
  );
}
