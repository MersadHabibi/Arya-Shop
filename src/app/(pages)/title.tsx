import { PropsWithChildren } from "react";

const Title = ({ children }: PropsWithChildren) => (
  <div className="e-full rounded-2xl bg-primary px-16 py-4 text-center text-base font-bold leading-none text-white lg:w-fit lg:text-[40px]">
    {children}
  </div>
);

export default Title;
