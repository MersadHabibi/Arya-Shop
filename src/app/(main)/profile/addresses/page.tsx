"use client";

import Icon from "@/components/ui/icon";
import { useAddresses } from "@/hooks/use-addresses";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateNewAddress from "./_components/CreateNewAddress";
import EditAddress from "./_components/EditAddress";
import DeleteAddressModal from "./_components/DeleteAddressModal";

export default function AddressesPage() {
  // const auth = useAuth();

  // if (auth.isLoading)
  //   return (
  //     <>
  //       <div className="mx-auto my-36 flex w-full items-center justify-center">
  //         <span className="loading loading-spinner text-primary" />
  //       </div>

  //       <div className="mt-24 hidden w-full lg:block">
  //         <Profits />
  //       </div>
  //     </>
  //   );

  const addresses = useAddresses();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap justify-between gap-4">
        <span className="w-fit rounded-2xl bg-primary p-4 text-center text-xl font-semibold leading-tight text-white max-lg:w-full lg:px-16 lg:py-3 lg:text-[40px] lg:font-bold">
          آدرس‌های شما
        </span>
        <CreateNewAddress />
      </div>

      {addresses.isLoading ? (
        <div className="mx-auto my-20 flex w-full items-center justify-center">
          <span className="loading loading-spinner text-primary" />
        </div>
      ) : (
        <div className="relative flex w-full flex-col justify-between gap-6">
          {addresses.data?.map((address) => (
            <div
              key={address.id}
              className="flex w-full flex-col gap-4 rounded-2xl border border-base-300 p-4 leading-tight">
              <div className="flex items-center justify-between">
                <span className="text-[40px] font-bold">{address.title}</span>

                <div className="flex items-center justify-center gap-x-4">
                  <EditAddress addressId={address.id} />
                  <DeleteAddressModal
                    addressId={address.id}
                    addressName={address.title}
                  />
                </div>
              </div>

              <p className="text-base">{address.address}</p>

              <p className="text-base-300">شماره تماس: {address.call_number}</p>

              <p className="text-base-300">
                تحویل گیرنده: {address.reciever_name}
              </p>
            </div>
          ))}
          {!addresses.data?.length ? (
            <div>
              <p className="py-10 text-center text-lg sm:text-2xl">
                آدرسی ثبت نکرده اید
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
