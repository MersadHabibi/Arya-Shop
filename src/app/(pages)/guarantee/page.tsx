import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Profits from "@/components/layout/profits";
import Input from "@/components/ui/input";

import Title from "../title";

const Guarantee = () => {
  return (
    <>
      <Header />

      <div className="relative mt-7 w-full px-5 lg:px-20">
        <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-9">
          <Title>مشخصات فردی</Title>

          <div className="flex flex-col gap-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="relative">
                <Input
                  label="نام شخص یا شرکت:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>

              <div className="relative">
                <Input
                  label="آدرس ایمیل:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>

              <div className="relative">
                <Input
                  label="شماره تماس:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>

              <div className="relative">
                <Input
                  label="نام نماینده شرکت:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-7 w-full px-5 lg:mt-[100px] lg:px-20">
        <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-9">
          <Title>مشخصات فردی</Title>

          <div className="flex flex-col gap-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="relative">
                <Input
                  label="برند:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>

              <div className="relative">
                <Input
                  label="شماره بارکد:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>

              <div className="relative">
                <Input
                  label="مدل محصول:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>

              <div className="relative">
                <Input
                  label="تاریخ خرید:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>
              <div className="relative">
                <Input
                  label="دسته‌بندی محصول:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>
              <div className="relative">
                <Input
                  label="نوع گارانتی:"
                  className="h-[68px] rounded-2xl bg-base-100 shadow-lg lg:h-20"
                />
              </div>
            </div>

            <button className="btn btn-primary h-12 w-full rounded-2xl px-20 text-base lg:w-fit">
              ثبت نام
            </button>
          </div>
        </div>
      </div>

      <div className="hidden w-full lg:mt-28 lg:block">
        <Profits />
      </div>

      <Footer className="max-lg:mt-7 max-lg:pb-12" />
    </>
  );
};

export default Guarantee;
