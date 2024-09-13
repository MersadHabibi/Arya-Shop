import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { RiCircleLine } from "react-icons/ri";

type Props = {
  icon: IconType | undefined | React.ElementType;
  className?: string;
};

const Icon = ({ icon, className }: Props) => {
  const IconElement = icon ?? RiCircleLine;
  return (
    <IconElement className={cn("text-[20px] rtl:-scale-x-100", className)} />
  );
};

export default Icon;
