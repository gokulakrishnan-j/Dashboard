import React from "react";
import { InputProps } from "./interface";
import "./style.css";
import Label from "../Label/index.tsx";

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  type,
  value,
  touched,
  error,
  view = false,
  onChange,
  onBlur,
}) => {
  return (
    <div className="inputContainer">
      {view ? (
        <div className="viewContainer">
          <p className="key"> {placeholder + ":"} </p>
          <p className="value">{value}</p>
        </div>
      ) : (
        <div
          className="childContainer"
        >
          <Label text={placeholder} htmlFor={name + placeholder} />
          <input
            id={name + placeholder}
            className="input"
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
          <div className="errorContainer">
            {touched && error ? <p className="error">{error}</p> : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
