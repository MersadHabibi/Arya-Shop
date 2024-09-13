import { z, ZodType } from "zod";

export const AddressSchema: ZodType<AddressFormData> = z.object({
  // name: z
  //   .string()
  //   .min(4, { message: "اسم کوتاه است" })
  //   .max(32, { message: "اسم بلند است" }),
  title: z
    .string()
    .min(4, { message: "اسم کوتاه است" })
    .max(32, { message: "اسم بلند است" }),
  zipcode: z
    .string()
    .min(10, { message: "کد پستی کوتاه است" })
    .max(10, { message: "کد پستی بلند است" }),
  address: z.string().min(5, { message: "آدرس کوتاه است" }),
  city: z.string().optional(),
  state: z.string().optional(),
  plate: z.string().optional(),
  unit: z.string().optional(),
  call_number: z
    .string()
    .regex(/09\d{9}/, { message: "لطفا یک شماره همراه صحیح وارد کنید." }),
  reciever_name: z
    .string()
    .min(4, { message: "نام و نام خانوادگی کوتاه است" })
    .max(32, { message: "نام و نام خانوادگی بلند است" }),
  // description: z.string(),
});

export type AddressFormData = {
  title: string;
  zipcode: string;
  address: string;
  city?: string;
  state?: string;
  plate?: string;
  unit?: string;
  call_number: string;
  reciever_name: string;
  // description: string;
};

export type AddressValidFieldNames =
  | "title"
  | "zipcode"
  | "address"
  | "city"
  | "state"
  | "plate"
  | "unit"
  | "call_number"
  | "reciever_name"
  | "description";
