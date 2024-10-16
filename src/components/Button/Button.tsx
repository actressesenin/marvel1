import { memo } from "react";
import style from "./Button.module.scss";

export const Button = memo(
  ({
    text,
    className,
    onClick,
    isActive,
  }: {
    text?: string | number;
    className?: string;
    onClick?: () => void;
    isActive?: boolean;
  }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} ${style.button} ${isActive ? style.active : ""}`}
      >
        {text}
      </button>
    );
  },
);
