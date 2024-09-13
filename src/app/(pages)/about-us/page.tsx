import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Profits from "@/components/layout/profits";
import Icon from "@/components/ui/icon";
import Image from "next/image";
import { RiGroupLine, RiHistoryLine, RiMapPinLine } from "react-icons/ri";

const AboutUs = () => {
  return (
    <>
      <Header />

      <div className="relative mx-auto flex w-full max-w-screen-3xl flex-col gap-5 px-5 py-10 lg:gap-24 lg:px-20">
        <section className="grid gap-5 lg:grid-cols-2 lg:gap-24">
          <div className="flex w-full flex-col gap-5 lg:gap-9">
            <h1 className="text-[40px] font-black leading-normal lg:text-[5vw] 2xl:text-[80px]">
              آریا پخش رایکا
            </h1>

            <h2 className="text-xl font-semibold leading-normal lg:text-[40px]">
              توزیع و پخش تجهیزات الکترونیک
            </h2>

            <p className="text-xs leading-normal lg:text-xl">
              شرکت آریا در سال 1382 فعالیت خود را با هدف ارائه خدمات و کارآفرینی
              و ایجاد شغل برای جوانان با تاکید بر محصولات رسانه ای من جمله سی
              دی، دی وی دی، فلش و باتری، فعالیت خود را به صورت مختصر آغاز نموده
              و در ادامه با تمرکز بر فروش مویرگی خود در استان های تهران و کرج و
              بنابر سیاست برطرف سازی حداکثری نیاز مشتریان خود با تامین محصولات
              کالای برقی و جانبی موبایل و کامپیوتر و ابزارآلات به عنوان اولین
              شرکت پخش مویرگی پیشرو در این حوزه جایگاه مناسبی را به خود اختصاص
              داده است.
            </p>
          </div>

          <div className="relative grid aspect-[60/45] w-full grid-cols-6 gap-3">
            <div className="relative col-span-6  h-full w-full">
              <Image
                className="object-coverj overflow-hidden rounded-xl"
                fill
                src="/visuals/about-us/pic1.png"
                alt="pic1"
              />
            </div>
            <div className="relative col-span-4 h-full w-full">
              <Image
                className="overflow-hidden rounded-xl object-cover"
                fill
                src="/visuals/about-us/pic2.png"
                alt="pic1"
              />
            </div>
            <div className="relative col-span-2 h-full w-full">
              <Image
                className="overflow-hidden rounded-xl object-cover"
                fill
                src="/visuals/about-us/pic3.png"
                alt="pic1"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2 lg:gap-24">
          <div className="flex items-center justify-center divide-x-2 lg:justify-around rtl:divide-x-reverse">
            <div className="flex flex-col gap-3 px-6 text-center">
              <div className="flex flex-col items-center gap-3 text-secondary">
                <Icon
                  icon={RiHistoryLine}
                  className="!scale-x-100 text-[21px] lg:text-[32px]"
                />

                <span className="text-[28px] font-black lg:text-4xl">
                  19 سال
                </span>
              </div>

              <span className="text-base lg:text-2xl">سابقه کاری</span>
            </div>

            <div className="flex flex-col gap-3 px-6 text-center">
              <div className="flex flex-col items-center gap-3 text-secondary">
                <Icon
                  icon={RiMapPinLine}
                  className="!scale-x-100 text-[21px] lg:text-[32px]"
                />

                <span className="text-[28px] font-black lg:text-4xl">
                  2 شهر
                </span>
              </div>

              <span className="text-base lg:text-2xl">تهران و کرج</span>
            </div>

            <div className="flex flex-col gap-3 px-6 text-center">
              <div className="flex flex-col items-center gap-3 text-secondary">
                <Icon
                  icon={RiGroupLine}
                  className="!scale-x-100 text-[21px] lg:text-[32px]"
                />

                <span className="text-[28px] font-black lg:text-4xl">
                  30000
                </span>
              </div>

              <span className="text-base lg:text-2xl">مشتری فعال</span>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-9">
            <p className="text-xs leading-normal lg:text-xl">
              شرکت آریا در سال 1382 فعالیت خود را با هدف ارائه خدمات و کارآفرینی
              و ایجاد شغل برای جوانان با تاکید بر محصولات رسانه ای من جمله سی
              دی، دی وی دی، فلش و باتری، فعالیت خود را به صورت مختصر آغاز نموده
              و در ادامه با تمرکز بر فروش مویرگی خود در استان های تهران و کرج و
              بنابر سیاست برطرف سازی حداکثری نیاز مشتریان خود با تامین محصولات
              کالای برقی و جانبی موبایل و کامپیوتر و ابزارآلات به عنوان اولین
              شرکت پخش مویرگی پیشرو در این حوزه جایگاه مناسبی را به خود اختصاص
              داده است.
            </p>
          </div>
        </section>

        <section className="relative aspect-[2/1] w-full lg:aspect-[10/2]">
          <Image
            unoptimized
            className="overflow-hidden rounded-xl object-cover"
            src={"/visuals/about-us/pic4.png"}
            alt=""
            fill
          />
        </section>

        <section className="flex w-full flex-col items-center justify-center gap-9">
          <p className="text-xs leading-normal lg:text-xl">
            شرکت پخش آریا طی سال‌های اخیر در راستای گسترش کیفیت دامنه خدمات و
            کالاهای قابل عرضه خود اقدام به اخذ نمایندگی های رسمی توزیع و فروش
            انحصاری تعدادی از تولیدکنندگان داخلی مانند دنا الکتریک، شرکت کمال
            آفرین یزدان راد و همچنین تولید کنندگان خارجی مانند شرکت گروندیگ
            (GRUNDING) آلمان نموده است. در سال‌های اخیر همکاری با این تولید
            کنندگان خارجی و داخلی به واحد بازرگانی شرکت آریا این امکان را داده
            تا بتواند شروع به همکاری خود را در واردات برندهای معتبر روز دنیا و
            سایر برندهای معتبر و مصرفی مشتریان در حوزه فعالیت خود رقم بزند و به
            واسطه همین توسعه با استقبال مشتریان خود در لاین های عمده فروشی و اخد
            نمایندگی درشهر‌ها و شهرستان ها و همچنین فروشگاه‌های زنجیره‌ای مواجه
            شود.
          </p>
        </section>
      </div>

      <div className="w-full max-lg:hidden">
        <Profits />
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
