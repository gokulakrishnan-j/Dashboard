import React from "react";
import "./style.css";
import { ButtonProps } from "./interface";
const Button: React.FC<ButtonProps> = ({
  type,
  text,
  onClick,
  disabled = false,
  style,
}) => {
  return (
    <button
      className="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        ...style,
      }}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
