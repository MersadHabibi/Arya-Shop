import Modal from "@/components/modules/modal/Modal";
import Icon from "@/components/ui/icon";
import { useAddresses } from "@/hooks/use-addresses";
import { TAddress } from "@/types/entity";
import { useEffect, useState } from "react";
import { RiEditLine } from "react-icons/ri";

export type TOrderAddress = Pick<
  TAddress & { id: number },
  "title" | "address" | "call_number" | "reciever_name" | "id"
>;

export default function SelectAddressModal({
  setSelectedAddress,
  selectedAddress,
}: {
  selectedAddress?: TOrderAddress;
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<TOrderAddress | undefined>
  >;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const addresses = useAddresses();

  useEffect(() => {
    setSelectedAddress(addresses.data ? addresses.data[0] : undefined);
  }, [addresses.data, setSelectedAddress]);

  return (
    <>
      <button onClick={() => setIsOpenModal(true)}>
        <Icon
          className="!scale-x-100 text-[24px] text-primary"
          icon={RiEditLine}
        />
      </button>

      <Modal
        isOpen={isOpenModal}
        title="آدرس تحویل سفارش"
        classNames={{
          background: "z-50 !px-2 sm:!px-4",
          box: "!max-w-none sm:!max-w-3xl !max-h-full sm:!h-fit flex flex-col justify-between sm:rounded-xl",
          title: "font-bold text-xl sm:text-2xl",
        }}
        onCloseModal={() => setIsOpenModal(false)}
        onClickOutside={() => setIsOpenModal(false)}>
        <div className="p-4 sm:p-6 sm:pt-3">
          <p className="mb-5 text-base text-base-300">
            لطفا آدرس مورد نظر برای دریافت سفارش را انتخاب نمایید
          </p>
          <div className="space-y-2">
            {addresses.data?.map((address) => (
              <div
                key={address.id}
                className="flex w-full flex-col gap-4 rounded-2xl border border-base-300 p-4 leading-tight">
                <div className="flex items-start justify-between">
                  <span className="text-[40px] font-bold">{address.title}</span>

                  <div className="flex items-start justify-center gap-x-4">
                    <label className="flex w-fit cursor-pointer gap-x-3">
                      <input
                        type="radio"
                        name="postWay"
                        className="size-7 checked:bg-secondary"
                        checked={
                          selectedAddress
                            ? selectedAddress.id == address.id
                            : false
                        }
                        onChange={() => {
                          setSelectedAddress(address);
                          setIsOpenModal(false);
                        }}
                      />
                    </label>
                  </div>
                </div>

                <p className="text-base">{address.address}</p>

                <p className="text-base-300">
                  شماره تماس: {address.call_number}
                </p>

                <p className="text-base-300">
                  تحویل گیرنده: {address.reciever_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
