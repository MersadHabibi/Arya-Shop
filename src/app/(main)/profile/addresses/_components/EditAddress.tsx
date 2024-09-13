import Icon from "@/components/ui/icon";
import { RiEditLine } from "react-icons/ri";
import NewAddressModal, { TOnSubmitProps } from "./NewAddressModal";
import useAddNewAddress from "./useAddNewAddress";
import { useAddressByName } from "./useAddressById";

export default function EditAddress({ addressId }: { addressId: number }) {
  const addressByName = useAddressByName({ id: addressId });
  const editAddress = useAddNewAddress();

  const onSubmit = async ({
    data,
    selectedCity,
    selectedState,
    setSelectedCity,
    setSelectedState,
    setError,
    reset,
    setIsOpenModal,
  }: TOnSubmitProps) => {
    editAddress.mutate({
      title: data.title,
      zipcode: data.zipcode,
      address: data.address,
      city: selectedCity,
      state: selectedState,
      plate: data.plate ? +data.plate : 0,
      unit: data.unit ? +data.unit : 0,
      call_number: data.call_number,
      reciever_name: data.reciever_name,
      setIsOpenModal,
      isEditing: true,
      addressId: addressId,
      callback: () => {
        reset();

        setSelectedCity(undefined);
        setSelectedState(undefined);
      },
    });
  };

  return (
    <>
      {addressByName ? (
        <NewAddressModal
          defaultValues={addressByName}
          onSubmit={onSubmit}
          title="ویرایش آدرس"
          className="text-primary">
          <Icon className="!scale-x-100 text-[24px]" icon={RiEditLine} />
        </NewAddressModal>
      ) : null}
    </>
  );
}
