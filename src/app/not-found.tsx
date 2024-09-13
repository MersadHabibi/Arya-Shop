import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Profits from "@/components/layout/profits";
import Image from "next/image";

const Page = () => {
  return (
    <main className="ss02 relative flex min-h-svh flex-col">
      <Header />

      <div className="relative mt-24 flex w-full flex-col gap-8 px-5 max-lg:mb-20 lg:gap-16 lg:px-20">
        <div className="relative mx-auto flex aspect-[2/1] w-full max-w-screen-lg overflow-hidden rounded-3xl">
          <Image
            className="absolute inset-0"
            alt="404"
            fill
            src={"/visuals/404.png"}
          ></Image>
          <Image
            className="absolute inset-0"
            alt="404"
            fill
            src={"/visuals/404-visual.png"}
          ></Image>
        </div>

        <p className="text-center text-2xl font-bold !leading-normal text-primary lg:text-[60px]">
          صفحه موردنظر شما پیدا نشد...!
        </p>
      </div>

      <div className="hidden w-full lg:mt-28 lg:block">
        <Profits />
      </div>

      <Footer className="max-lg:mt-7 max-lg:pb-12" />
    </main>
  );
};

export default Page;
