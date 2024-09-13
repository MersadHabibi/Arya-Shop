"use client";

import Icon from "@/components/ui/icon";
import { RiArrowDownSLine } from "react-icons/ri";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
};

const MobileSelect = ({ label, onChange, options, value }: Props) => {
  return (
    <button className="flex h-9 min-h-9 shrink-0 items-center justify-center gap-2.5 rounded-full border border-primary px-2 text-base font-normal hover:border-primary">
      <span className="shrink-0">{label}</span>

      <Icon icon={RiArrowDownSLine} />
    </button>
  );
};

export default MobileSelect;
