"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
};

const OtpInput = ({ value, onChange }: Props) => {
  const [index, setIndex] = useState<number>(0);

  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current?.focus();
  }, [inputRef, index]);

  return (
    <div
      dir="ltr"
      className="grid w-full grid-cols-6 gap-0.5 sm:gap-4 lg:gap-7"
    >
      {value.map((value, idx, list) => (
        <input
          key={idx}
          onFocus={() => {
            setIndex(idx);
          }}
          value={value}
          onChange={(e) => {
            const v = e.target.value.substring(e.target.value.length - 1);

            if (!new RegExp("^[0-9]+$").test(v) && v !== "") return;

            onChange((prev) => {
              const clone = [...prev];
              clone[idx] = v;
              return clone;
            });

            if (idx !== list.length - 1 && v !== "")
              setIndex((prev) => prev + 1);

            if (idx > 0 && v === "") setIndex((prev) => prev - 1);
          }}
          onKeyDown={(e) => {
            const key = e.key;

            if (key === "Backspace" && !value && idx > 0) {
              setIndex((prev) => prev - 1);
              return;
            }

            if (key === "ArrowRight" && index < list.length - 1) {
              setIndex((prev) => prev + 1);
              e.preventDefault();
              return;
            }

            if (key === "ArrowLeft" && idx > 0) {
              setIndex((prev) => prev - 1);
              e.preventDefault();
              return;
            }
          }}
          ref={idx === index ? inputRef : undefined}
          className="aspect-square w-full border-b-4 border-b-primary text-center text-[3vw] outline-none"
        />
      ))}
    </div>
  );
};

export default OtpInput;
