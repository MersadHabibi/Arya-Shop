import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Profits from "@/components/layout/profits";
import Input from "@/components/ui/input";
import Title from "../title";
import Icon from "@/components/ui/icon";
import Image from "next/image";
import HalfMargin from "./half-margin";
import B2BForm from "./form";

const B2B = () => {
  return (
    <>
      <Header />

      <div className="mx-auto grid h-[668px] w-full max-w-screen-3xl flex-col px-5 lg:px-20">
        <div className="absolute inset-x-0 z-[-2] h-[668px] w-full bg-primary"></div>
        <div
          style={{
            backgroundImage: `url(/visuals/waves.png)`,
            backgroundSize: "250%",
            backgroundPositionY: "100%",
            backgroundPositionX: "60%",
          }}
          className="absolute inset-x-0 z-[-1] h-[668px] w-full bg-cover bg-no-repeat opacity-30 max-lg:![background-size:400%]"
        />
        <Image
          className="mx-auto mt-8 lg:my-auto"
          src={"/visuals/b2b-visual.png"}
          alt="b2b"
          height={668}
          width={668}
        />
      </div>

      <HalfMargin>
        <div className="mx-auto grid w-full max-w-screen-3xl gap-4 px-5 lg:grid-cols-3 lg:gap-14 lg:px-20">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="mx-auto flex w-full items-center justify-center rounded-3xl bg-base-100 p-4 text-center shadow-md max-lg:max-w-56 max-lg:leading-[36px] lg:p-16"
            >
              اگر شما پخش‌کننده هستید و یا فروشنده محلی هستید
            </div>
          ))}
        </div>
      </HalfMargin>

      <div className="relative mt-7 w-full px-5 lg:mt-24 lg:px-20">
        <p className="text-xs lg:text-xl">
          توضیحان درباره خدمات خرید عمده و سازمانی آریا پخش رایکا در این قسمت
          نوشته شود. توضیحان درباره خدمات خرید عمده و سازمانی آریا پخش رایکا در
          این قسمت نوشته شود.توضیحان درباره خدمات خرید عمده و سازمانی آریا پخش
          رایکا در این قسمت نوشته شود.توضیحان درباره خدمات خرید عمده و سازمانی
          آریا پخش رایکا در این قسمت نوشته شود.توضیحان درباره خدمات خرید عمده و
          سازمانی آریا پخش رایکا در این قسمت نوشته شود.توضیحان درباره خدمات خرید
          عمده و سازمانی آریا پخش رایکا در این قسمت نوشته شود.توضیحان درباره
          خدمات خرید عمده و سازمانی آریا پخش رایکا در این قسمت نوشته شود.
        </p>
      </div>

      <div className="relative mt-7 w-full px-5 lg:mt-[100px] lg:px-20">
        <B2BForm />
      </div>

      <div className="hidden w-full lg:mt-28 lg:block">
        <Profits />
      </div>

      <Footer className="max-lg:mt-10 max-lg:pb-12" />
    </>
  );
};

export default B2B;

const Saprator = () => {
  return (
    <div className="relative flex h-10 w-full shrink items-center justify-center lg:h-20 lg:w-[54px]">
      <span className="inline-block h-2 w-[calc(100%_-_(8px_*_2))] rounded-full bg-primary lg:h-[calc(100%_-_(8px_*_2))] lg:w-2" />
    </div>
  );
};
