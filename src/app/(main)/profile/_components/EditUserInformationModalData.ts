import { z, ZodType } from "zod";

export const UserSchema: ZodType<SchemaFormData> = z.object({
  name: z
    .string()
    .min(4, { message: "اسم کوتاه است" })
    .max(32, { message: "اسم بلند است" }),
  nationalCode: z
    .string()
    .min(10, { message: "کد ملی کوتاه است" })
    .max(10, { message: "کد ملی بلند است" }),
  birthday: z.string(),
  email: z.string().email({
    message: "ایمیل معتبر نیست",
  }),
});

export type SchemaFormData = {
  name: string;
  nationalCode: string;
  birthday: string;
  email: string;
};

export type ValidFieldNames = "name" | "nationalCode" | "birthday" | "email";
