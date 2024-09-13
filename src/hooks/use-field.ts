import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ZodSchema, z } from "zod";

type Options = {
  validations?: { validator: ZodSchema; message: string }[] | undefined;
  defaultValue?: string;
  skipFirstMount?: boolean;
  formatter?: (v: string) => string;
  delay?: number;
  required?: boolean;
};

const requiredSchema = {
  message: "لظفا این فیلد را خالی نگذارید.",
  validator: z.string().min(1),
};

export const useField = ({
  validations: _validations_,
  defaultValue = "",
  formatter,
  required = false,
}: Options) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<null | string>(null);
  const [isError, setIsError] = useState(false);
  const [skip, setSkip] = useState(true);

  const validations = useMemo(() => {
    if (!_validations_) return [];
    if (required) return [..._validations_, requiredSchema];
    return _validations_;
  }, [_validations_, required]);

  useEffect(() => {
    if (skip) {
      setSkip(false);

      return;
    }

    if (!required && !value) {
      setError(null);
      setIsError(false);
      return;
    }

    const noError = validations?.every(({ message, validator }) => {
      const { success } = validator.safeParse(value);

      return success;
    });

    setIsError(!noError);

    /*eslint-disable*/
  }, [value]);

  const register = () => ({
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = formatter?.(e.currentTarget.value) ?? e.currentTarget.value;

      setValue(val);
    },
    onBlur: () => {
      if (!required && !value) {
        setError(null);
        setIsError(false);
        return;
      }

      const noError = validations?.every(({ message, validator }) => {
        const { success } = validator.safeParse(value);

        if (success) return true;

        setError(message);
        return false;
      });

      if (noError) setError(null);
    },
    onFocus: () => {
      setError(null);
    },
    required,
  });

  return {
    value,
    error,
    isError,
    register,
    setValue,
    required,
  } as const;
};
