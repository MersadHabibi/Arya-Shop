import {
  RiCustomerService2Line,
  RiShakeHandsLine,
  RiShoppingBag3Line,
  RiShoppingBagLine,
} from "react-icons/ri";
import Icon from "../ui/icon";

const Profits = () => {
  return (
    <div className="relative grid h-fit w-full grid-rows-2 max-lg:mb-20">
      <div className="relative row-span-2 mx-auto grid h-fit w-full max-w-screen-3xl gap-7 px-20 max-lg:place-items-center min-[500px]:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-[75px]">
        {footerProfits.map(({ icon, title }) => (
          <div
            key={title}
            className="flex aspect-[3/2] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-base-200 bg-base-100 shadow-xl max-lg:max-w-64 sm:rounded-[20px]"
          >
            <Icon
              icon={icon}
              className="text-[36px] text-secondary sm:text-[48px]"
            />

            <span className="text-lg lg:text-xl xl:text-2xl">{title}</span>
          </div>
        ))}
      </div>

      <div className="b-0 absolute inset-0 z-[-1] row-span-1 row-start-2 bg-primary max-lg:hidden" />
    </div>
  );
};

export default Profits;

const footerProfits = [
  {
    title: "ضمانت سلامت کالا",
    icon: RiShoppingBag3Line,
  },
  {
    title: "پشتیبانی آنلاین",
    icon: RiCustomerService2Line,
  },
  {
    title: "خرید آسان",
    icon: RiShoppingBagLine,
  },
  {
    title: "گارانتی محصولات",
    icon: RiShakeHandsLine,
  },
];
