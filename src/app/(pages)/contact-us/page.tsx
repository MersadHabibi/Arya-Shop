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

                  <span
                    className="w-full border-b-2 border-base-200 pb-5 text-right text-base group-last:border-b-0 group-last:pb-0"
                    dir="ltr">
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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.9251249013714!2d51.25700959999999!3d35.678845599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e01c84d224169%3A0x783a05456d5c1f2d!2z2LTYsdqp2Kog2KLYsduM2Kcg2b7Yrti0INix2KfbjNqp2Kc!5e0!3m2!1sen!2s!4v1728293472322!5m2!1sen!2s" width="100%" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>

      <div className="relative mt-7 w-full px-5 lg:mt-[5px] lg:px-20" id="faq">
        <div className="mx-auto flex w-full max-w-screen-3xl flex-col gap-6">
          <Title>سوالات متداول</Title>

          <div className="flex flex-col gap-4">
            {questions.map(({ a, q }, idx) => (
              <Accordion key={idx} collapsible type="single">
                <AccordionItem
                  value="value"
                  className="min-h-10 rounded-lg bg-base-100 p-3 text-xs shadow-lg lg:min-h-[78px] lg:rounded-2xl lg:p-6 lg:text-base">
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

      <div className="relative mt-7 w-full px-5 lg:mt-[100px] lg:px-20" id="comment">
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
    value:
      "۸  کیلومتر بزرگراه فتح - غرب به شرق بزرگراه شهید احمد متوسلیان - ساختمان اداری شرکت صنایع بسته - بندی ایران شرکت آریا",
    icon: RiMapPinFill,
  },
  {
    value: "021-91017083",
    icon: RiPhoneFill,
  },
  {
    value: "+98 9961361138",
    icon: RiWhatsappLine,
  },
  {
    value: "@aryapakhshrayka",
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
