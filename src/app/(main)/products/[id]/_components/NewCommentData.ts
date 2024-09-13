import { z, ZodType } from "zod";

export const NewCommentSchema: ZodType<NewCommentFormData> = z.object({
  title: z
    .string()
    .min(3, { message: "موضوع کوتاه است" })
    .max(40, { message: "موضوع بلند است" }),
  text: z
    .string()
    .min(3, { message: "متن کوتاه است" })
    .max(200, { message: "متن بلند است" }),
});

export type NewCommentFormData = {
  title: string;
  text: string;
};

// export type ValidFieldNames = "name" | "nationalCode" | "birthday" | "email";
