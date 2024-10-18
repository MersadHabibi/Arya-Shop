"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { RiCloseLine } from "react-icons/ri";

type TClassnames = {
  background: string;
  box: string;
  header: string;
  closeButton: string;
  closeButtonIcon: string;
  title: string;
};

type ModalProps = {
  children: React.ReactNode;
  classNames?: Partial<TClassnames>;
  isOpen: boolean;
  title?: string;
  size?: "full";
  handleSubmit?: UseFormHandleSubmit<any, undefined>;
  onClickOutside?: () => void;
  onCloseModal?: () => void;
  onSubmit?: (data: FormData | any) => void;
};

export default function Modal({
  children,
  classNames,
  isOpen,
  title,
  size,
  handleSubmit,
  onClickOutside,
  onCloseModal,
  onSubmit,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.classList.add("!overflow-hidden");
    else document.body.classList.remove("!overflow-hidden");

    return () => {
      document.body.classList.remove("!overflow-hidden");
    };
  }, [isOpen]);

  return (
    <dialog
      className={cn(
        "modal !pointer-events-auto p-4",
        isOpen
          ? "visible z-10 bg-black/50 opacity-100 backdrop-blur-sm"
          : "invisible -z-10 opacity-0",
        size === "full" && "p-0",
        classNames?.background,
      )}
      onClick={() => {
        onClickOutside && onClickOutside();
      }}>
      <form
        onSubmit={
          handleSubmit && onSubmit
            ? handleSubmit(onSubmit)
            : onSubmit
              ? (event) => onSubmit(event)
              : (event) => {
                  event.preventDefault();
                }
        }
        className={cn(
          "modal-box scale-100 overflow-y-auto overflow-x-hidden p-0",
          !size &&
            "h-fit max-h-60 w-full max-w-md sm:h-80 sm:max-h-full sm:max-w-xl md:max-w-2xl",
          size === "full" &&
            "h-full max-h-none w-full max-w-none rounded-none md:max-h-[95%] md:max-w-4xl md:rounded-2xl",
          classNames?.box,
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}>
        <div
          className={cn(
            "flex items-center justify-between p-4 sm:px-6",
            classNames?.header,
          )}>
          <p className={cn("text-2xl font-bold", classNames?.title)}>{title}</p>
          <button
            type="button"
            onClick={onCloseModal}
            className={cn(classNames?.closeButton)}>
            <RiCloseLine
              className={cn("size-6 text-black", classNames?.closeButtonIcon)}
            />
          </button>
        </div>
        {children}
      </form>
    </dialog>
  );
}
