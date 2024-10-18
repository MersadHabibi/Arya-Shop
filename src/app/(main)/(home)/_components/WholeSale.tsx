import Input from "@/components/ui/input";

export default function WholeSale() {
  return (
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
            <Input className="h-[53px] w-full lg:h-16" label="نام شخص/ شرکت:" />
          </div>

          <div className="relative w-full">
            <Input className="h-[53px] w-full lg:h-16" label="شماره موبایل:" />
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
  );
}
