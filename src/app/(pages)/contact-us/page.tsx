import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Profits from "@/components/layout/profits";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import Input from "@/components/ui/input";
import {
  RiArrowDownSLine,
  RiInstagramLine,
  RiMapPinFill,
  RiPhoneFill,
  RiQuestionLine,
  RiWhatsappLine,
} from "react-icons/ri";
import Title from "../title";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="z-[0] h-full w-full overflow-hidden rounded-3xl bg-base-200" />
  ),
});

const ContactUs = () => {
  return (
    <>
      <Header />

      <div className="relative mt-7 w-full px-5 lg:px-20">
        <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-[78px]">
          <div className="flex w-full flex-col gap-6">
            <Title>راه‌های ارتباطی</Title>

            <div className="flex flex-col gap-[9px]">
              {contactOptions.map(({ icon, value }, idx) => (
                <div key={idx} className="gruop flex gap-4 pt-2 first:pt-0">
                  <Icon
                    icon={icon}
                    className="!scale-x-100 text-[28px] text-primary"
                  />

                  <span className="w-full border-b-2 border-base-200 pb-5 text-base group-last:border-b-0 group-last:pb-0">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-base">
              آریا پخش رایکا با امکان برقراری ارتباط در پلتفرم‌های مختلف در هر
              زمان پاسخگو و خدمت‌گزار مشتریان خوب خود می‌باشد.
            </p>
          </div>

          <div className="relative aspect-square w-full">
            <LeafletMap
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
              className="z-[0] h-full w-full overflow-hidden rounded-3xl"
            />
          </div>
        </div>
      </div>

      <div className="relative mt-7 w-full px-5 lg:mt-[100px] lg:px-20">
        <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-6">
          <Title>سوالات متداول</Title>

          <div className="flex flex-col gap-4">
            {questions.map(({ a, q }, idx) => (
              <Accordion key={idx} collapsible type="single">
                <AccordionItem
                  value="value"
                  className="min-h-10 rounded-lg bg-base-100 p-3 text-xs shadow-lg lg:min-h-[78px] lg:rounded-2xl lg:p-6 lg:text-base"
                >
                  <AccordionTrigger asChild>
                    <button className="group flex w-full items-center justify-between">
                      <div className="flex items-center gap-1 lg:gap-4">
                        <Icon
                          className="!scale-x-100 text-[24px] text-primary lg:text-[28px]"
                          icon={RiQuestionLine}
                        />
                        <span>{q}</span>
                      </div>

                      <Icon
                        className="text-[24px] text-primary transition-transform group-data-[state=open]:rotate-180 lg:text-[28px]"
                        icon={RiArrowDownSLine}
                      />
                    </button>
                  </AccordionTrigger>

                  <AccordionContent className="mt-3 lg:mt-4">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-7 w-full px-5 lg:mt-[100px] lg:px-20">
        <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-9">
          <Title>نظر خود را ثبت نمایید</Title>

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

            <textarea
              rows={5}
              className="resize-none  rounded-2xl bg-base-100 p-6 text-xs shadow-lg outline-none placeholder:text-base-content lg:text-lg"
              placeholder="متن نظر خود را بنویسید"
            />

            <button className="btn btn-primary h-12 w-fit px-20 text-base">
              ثبت نمایید
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

export default ContactUs;

const contactOptions = [
  {
    value: "تهران، انتهای اتوبان یادگار امام جنوب، خیابان هرمزان، شهرک جی",
    icon: RiMapPinFill,
  },
  {
    value: "021-91007380",
    icon: RiPhoneFill,
  },
  {
    value: "واتس اپ",
    icon: RiWhatsappLine,
  },
  {
    value: "اینستاگرام",
    icon: RiInstagramLine,
  },
];

const questions = [
  {
    q: "متن سوال متداول کاربران در این قسمت نوشته شود؟",
    a: "پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.",
  },
  {
    q: "متن سوال متداول کاربران در این قسمت نوشته شود؟",
    a: "پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.",
  },
  {
    q: "متن سوال متداول کاربران در این قسمت نوشته شود؟",
    a: "پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.",
  },
  {
    q: "متن سوال متداول کاربران در این قسمت نوشته شود؟",
    a: "پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.پاسخ سوال در این قسمت نوشته شود.",
  },
];
