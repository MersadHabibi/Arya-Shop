import { useQuery } from "@tanstack/react-query";
import { FieldError } from "react-hook-form";

export default function StatesSelectBox({
  setSelectedState,
  selectedState,
  error,
  defaultValue,
}: {
  selectedState?: string;
  setSelectedState: React.Dispatch<React.SetStateAction<string | undefined>>;
  error?:
    | FieldError
    | undefined
    | {
        message: string;
      };
  defaultValue?: string;
}) {
  const states = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      try {
        // Get profile
        const res = await fetch(
          "https://iran-locations-api.ir/api/v1/fa/states",
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!res?.ok) return null;

        const json: { id: number; name: string }[] = await res.json();

        return json;
      } catch (error) {
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="col-span-3">
      <label className="mb-2 line-clamp-1 block sm:text-xl" htmlFor="state">
        استان
      </label>
      <select
        id="state"
        className="select w-full rounded-lg !border border-neutral-500 font-medium !outline-none sm:text-lg"
        onChange={(event) => setSelectedState(event.target.value)}
        value={selectedState}>
        {defaultValue ? (
          <option value={defaultValue} selected>
            {defaultValue}
          </option>
        ) : (
          <option selected>انتخاب شهر</option>
        )}
        {states.isLoading ? (
          <option
            className="loading loading-spinner text-primary"
            disabled></option>
        ) : (
          states.data?.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name}
            </option>
          ))
        )}
      </select>
      {error ? (
        <p className="pt-1 text-start text-xs text-red-500">{error?.message}</p>
      ) : null}
    </div>
  );
}
