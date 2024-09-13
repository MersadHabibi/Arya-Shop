"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewCommentFormData, NewCommentSchema } from "./NewCommentData";
import Input from "@/components/modules/Input";
import { cn } from "@/lib/utils";
import useComments from "@/hooks/use-comments";

export default function NewComment({
  product,
}: {
  product?: {
    id: number;
    name: string;
  };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm<NewCommentFormData>({
    resolver: zodResolver(NewCommentSchema), // Apply the zodResolver
  });

  const { newComment } = useComments();

  const onSubmit = async (data: NewCommentFormData) => {
    newComment.mutate({
      product: product,
      text: data.text,
      title: data.title,
      callback: () => reset(),
    });
  };

  return (
    <section className="flex flex-col gap-7">
      <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
        نظر خود را ثبت نمایید
      </span>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="border-neutral-400 px-4"
          name="title"
          placeholder="موضوع"
          error={errors.title}
          register={register}
        />
        <div>
          <textarea
            placeholder="متن مورد نظر خود را بنویسید"
            className={cn(
              "mt-4 w-full rounded-lg !border border-neutral-400 bg-transparent p-4 text-lg font-medium !outline-none",
              errors.text && "border-red-500",
            )}
            rows={4}
            {...register("text")}
          />
          {errors.text ? (
            <p className="pt-1 text-start text-xs text-red-500">
              {errors.text?.message}
            </p>
          ) : null}
        </div>
        <button
          disabled={newComment.isPending}
          className="mt-4 flex h-fit w-fit items-center justify-center rounded-md bg-primary px-12 py-3.5 font-bold text-white transition-all hover:brightness-90 disabled:opacity-70">
          {newComment.isPending ? (
            <span className="loading loading-spinner text-white" />
          ) : (
            "ثبت نظر"
          )}
        </button>
      </form>
    </section>
  );
}
