import { memo } from "react";

export const Input = memo(
  ({
    value,
    placeholder,
    onChange,
  }: {
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    return <input type="text" value={value} placeholder={placeholder} onChange={onChange} />;
  },
);
