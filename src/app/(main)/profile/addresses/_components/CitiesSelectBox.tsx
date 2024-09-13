import { useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

export default function CitiesSelectBox({
  selectedState,
  selectedCity,
  setSelectedCity,
  error,
  defaultValue,
}: {
  selectedState?: string;
  selectedCity?: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string | undefined>>;
  error?:
    | FieldError
    | undefined
    | {
        message: string;
      };
  defaultValue?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [allCities, setAllCities] = useState<{ id: number; name: string }[]>();

  useEffect(() => {
    const getCities = async () => {
      if (selectedState) {
        setIsLoading(true);
        try {
          // Get profile
          const res = await fetch(
            `https://iran-locations-api.ir/api/v1/fa/cities?state=${selectedState}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!res?.ok) return null;

          const json: { id: number; name: string }[] = (await res.json())[0]
            .cities;

          setAllCities(json);

          return json;
        } catch (error) {
          setAllCities(undefined);

          return null;
        } finally {
          setIsLoading(false);
        }
      } else {
        setAllCities(undefined);
      }
    };

    getCities();
  }, [selectedState]);

  return (
    <div className="col-span-3">
      <label className="mb-2 line-clamp-1 block sm:text-xl" htmlFor="city">
        شهر
      </label>
      <select
        id="city"
        className="select w-full rounded-lg !border border-neutral-500 font-medium !outline-none sm:text-lg"
        onChange={(value) => setSelectedCity(value.target.value)}
        value={selectedCity}>
        {defaultValue ? (
          <option value={defaultValue} selected>
            {defaultValue}
          </option>
        ) : (
          <option selected>انتخاب شهر</option>
        )}
        {isLoading ? (
          <option
            className="loading loading-spinner text-primary"
            disabled></option>
        ) : allCities ? (
          allCities?.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))
        ) : (
          <option>استانتان را انتخاب کنید</option>
        )}
      </select>
      {error ? (
        <p className="pt-1 text-start text-xs text-red-500">{error?.message}</p>
      ) : null}
    </div>
  );
}
