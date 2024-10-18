import Image from "next/image";
import Link from "next/link";
import Icon from "../ui/icon";
import {
  RiInstagramLine,
  RiPhoneFill,
  RiTelegramLine,
  RiWhatsappLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full bg-primary px-6 pb-32 pt-12 text-white lg:px-20",
        className,
      )}>
      <footer className="mx-auto flex h-fit w-full max-w-screen-3xl grid-cols-2 flex-col gap-[75px] lg:grid">
        <div className="flex flex-col gap-12">
          <p className="text-base text-white lg:text-xl ">
            شرکت آریا در سال 1382 فعالیت خود را با هدف ارائه خدمات و کارآفرینی و
            ایجاد شغل برای جوانان با تاکید بر محصولات رسانه ای من جمله سی دی، دی
            وی دی، فلش و باتری، فعالیت خود را به صورت مختصر آغاز نموده و در
            ادامه با تمرکز بر فروش مویرگی خود در استان های تهران و کرج و بنابر
            سیاست برطرف سازی حداکثری نیاز مشتریان خود با تامین محصولات کالای
            برقی و جانبی موبایل و کامپیوتر و ابزارآلات به عنوان اولین شرکت پخش
            مویرگی پیشرو در این حوزه جایگاه مناسبی را به خود اختصاص داده است.
          </p>

          <div className="hidden items-center justify-between gap-7 rounded-[20px] bg-base-100 p-4 lg:flex">
            <div className="relative h-32 w-full">
              <Image fill alt="" className="object-contain" src="/enamad.png" />
            </div>
            <div className="relative h-32 w-full grow-[2]">
              <Image
                fill
                alt=""
                className="object-contain"
                src="/samandehi.png"
              />
            </div>
            <div className="relative h-32 w-full">
              <Image
                fill
                alt=""
                className="object-contain"
                src="/anjoman.png"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          {footerLinks.map(({ items, title }) => (
            <div key={title} className="flex flex-col gap-7">
              <h4 className="text-base font-bold lg:text-2xl">{title}</h4>

              {items.map((item) => (
                <Link
                  href={item.path}
                  className="w-fit text-xs lg:text-xl"
                  key={item.title}>
                  {item.title}
                </Link>
              ))}
            </div>
          ))}

          <div className="flex flex-col items-center gap-10 lg:gap-24">
            {footerSocials.map(({ icon, path }) => (
              <Link key={path} href={path}>
                <Icon
                  className="!scale-x-100 text-[22px] lg:text-[44px]"
                  icon={icon}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-7 rounded-[20px] bg-base-100 p-4 lg:hidden">
          <div className="relative h-32 w-full">
            <Image fill alt="" className="object-contain" src="/enamad.png" />
          </div>
          <div className="relative h-32 w-full grow-[2]">
            <Image
              fill
              alt=""
              className="object-contain"
              src="/samandehi.png"
            />
          </div>
          <div className="relative h-32 w-full">
            <Image fill alt="" className="object-contain" src="/anjoman.png" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

const footerLinks = [
  {
    title: "دسترسی سریع",
    items: [
      {
        title: "خرید عمده",
        path: "/b2b",
      },
      {
        title: "شرکای تجاری",
        path: "/#brands",
      },
      {
        title: "درباره ما",
        path: "/about-us",
      },
      {
        title: "نظرسنجی",
        path: "https://aryadb.com/%d9%81%d8%b1%d9%85-%d9%86%d8%b8%d8%b1-%d8%b3%d9%86%d8%ac%db%8c/",
      },
      {
        title: "مقالات",
        path: "/magazine",
      },
    ],
  },
  {
    title: "خدمات مشتریان",
    items: [
      {
        title: "ثبت نظرات شما",
        path: "/contact-us/#comment",
      },
      {
        title: "پرسش‌های متداول",
        path: "/contact-us/#faq",
      },
      {
        title: "حریم خصوصی",
        path: "/",
      },
    ],
  },
];

const footerSocials = [
  {
    icon: RiPhoneFill,
    path: "tel:021-91017083",
  },
  {
    icon: RiWhatsappLine,
    path: "https://wa.me/989961361138",
  },
  {
    icon: RiTelegramLine,
    path: "https://t.me/aryapakhsh",
  },
  {
    icon: RiInstagramLine,
    path: "https://instagram.com/aryapakhshrayka",
  },
];
