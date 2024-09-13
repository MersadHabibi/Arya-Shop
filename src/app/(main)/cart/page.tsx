import Profits from "@/components/layout/profits";
import Cart from "../profile/_components/cart";

const Page = () => {
  return (
    <>
      <Cart />

      <div className="mt-24 hidden lg:block">
        <Profits />
      </div>
    </>
  );
};

export default Page;
