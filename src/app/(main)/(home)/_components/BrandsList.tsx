import Icon from "@/components/ui/icon";
import { env } from "@/env";
import { TBrand } from "@/types/entity";
import Image from "next/image";
import Link from "next/link";
import { RiImage2Line } from "react-icons/ri";

export default function BrandsList({ brands }: { brands?: TBrand[] }) {
  return (
    <div className="mx-auto mt-32 flex w-full max-w-screen-3xl flex-col px-6 lg:px-20" id="brands">
      <div className="relative flex h-14 w-fit items-center justify-center rounded-2xl bg-primary px-6 text-xl font-semibold text-white max-lg:w-full lg:h-[72px] lg:rounded-s-none lg:px-20 lg:text-4xl lg:font-black">
        برند ها
        <span className="absolute inset-y-0 end-[100%] h-full w-[100vw] bg-primary max-lg:hidden" />
      </div>

      <div className="mt-7 grid w-full grid-cols-2 gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-7">
        {brands?.map(({ image, Code, Name }) => (
          <div
            key={Code}
            className="relative flex aspect-[2/1] w-full rounded-lg p-7 shadow-lg lg:rounded-2xl">
            <Link
              href={`/products?brand=${Code}`}
              className="relative h-full w-full">
              {image ? (
                <Image fill src={env.NEXT_PUBLIC_IMAGE_URL + image} alt="" />
              ) : (
                <div className="grid size-full place-items-center rounded-xl bg-base-200">
                  <Icon
                    icon={RiImage2Line}
                    className="m-auto text-[48px] text-base-300"
                  />
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-7 text-xl/8 font-medium max-lg:hidden">
        ارزش اصلی، حفظ منافع تمامی ذینفعان است و یکی از مهم ترین ذینفعان شرکت
        آریا پخش رایکا تامین کنندگان آن می‌باشند که طی سال‌ها تجربه کاری توام با
        دانش همراه بوده است.توانایی بخصوص ما در حوزه برندسازی به عنوان شرکت پخش
        مویرگی مستقل حوزه الکترونیک باعث شده تا طی سال‌ها تجربه کاری خود هم مسیر
        با کارخانه‌ها و وارد کننده‌های نو ظهور و قدرتمند باشیم و همچنین در مسیر
        برند سازی پیشرفت قابل توجهی را برای تامین کنندگان در راستای برند
        محصولاتشان رقم زنند.
        <br />
        یکی از افتخارات شرکت آریا پخش رایکا، استفاده از نرم افزار های بروز و تحت
        وب جهت توسعه همکاری با تامین کنندگان می‌باشد. در این سیستم هر تامین
        کننده در یک داشبورد اختصاصی جزیئات، قیمت فروش و موجودی کالای خود را در
        سیستم پخش آریا مشاهده می‌نماید.
      </p>
    </div>
  );
}
