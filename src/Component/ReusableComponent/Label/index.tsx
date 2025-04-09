import React from "react";
import "./style.css";
import { LabelProps } from "./interface";
const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
  return (
    <div className="LabelContainer">
      <label htmlFor={htmlFor}>{text}</label>
    </div>
  );
};

export default Label;
