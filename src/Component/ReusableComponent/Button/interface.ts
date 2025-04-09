import React from "react";

export interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
