"use client";

import Footer from "@/components/layout/footer";
import MainMobileHeader from "@/components/layout/main-mobile-header";
import routes from "@/config/routes";
import Image from "next/image";
import AuthForm from "../_components/auth-form";

import ProtectAuth from "../_components/protect-auth";

const Auth = () => {
  return (
    <ProtectAuth>
      <MainMobileHeader routes={routes} />

      <section className="relative mx-auto flex w-full flex-col gap-12 px-4 sm:px-8 lg:px-20">
        <div className="pointer-events-none fixed inset-x-20 inset-y-0 mx-auto grid w-full max-w-screen-2xl grid-cols-10 max-lg:hidden">
          <div className="relative col-span-7 flex items-center lg:h-svh ">
            <div className="absolute inset-y-0 end-0 z-[-2] w-[100svw] bg-primary"></div>
            <div
              style={{
                backgroundImage: `url(/visuals/waves.png)`,
                backgroundSize: "250%",
                backgroundPositionY: "100%",
                backgroundPositionX: "60%",
              }}
              className="absolute inset-y-0 end-0 z-[-1] h-full w-svw bg-cover bg-no-repeat opacity-30"
            />
          </div>

          <div className="absolute bottom-0 my-auto hidden h-[90svh] w-full lg:col-start-5 lg:col-end-11 lg:block">
            <Image
              className="object-contain"
              src={"/visuals/visual.png"}
              alt=""
              fill
            />
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-screen-2xl lg:grid-cols-12">
          <div className="relative flex items-center pb-6 pt-12 lg:col-span-9 lg:h-svh lg:py-20 ">
            <AuthForm />
          </div>
        </div>
      </section>

      <section className="relative mx-auto flex w-full flex-col gap-12 px-8 lg:hidden lg:px-20">
        <div className="mx-auto aspect-[9/7] h-full w-full max-w-96 overflow-x-hidden">
          <Image
            className="object-contain"
            src={"/visuals/visual.png"}
            alt=""
            fill
          />
        </div>
      </section>

      <div className="overflow-x-hidden lg:hidden">
        <Footer className="pb-12" />
      </div>
    </ProtectAuth>
  );
};

export default Auth;
