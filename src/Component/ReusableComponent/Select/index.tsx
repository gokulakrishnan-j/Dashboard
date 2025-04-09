import React from "react";
import { SelectProps } from "./interface";
import "./style.css";
import Label from "../Label/index.tsx";

const Select: React.FC<SelectProps> = ({
  name,
  placeholder,
  value,
  view = false,
  disabled,
  selectList = [],
  onChange,
}) => {
  return (
    <div className="inputContainer">
      {view ? (
        <div className="viewContainer">
          <p className="key"> {placeholder + ":"} </p>
          <p className="value">{value}</p>
        </div>
      ) : (
        <div className="childContainer">
          <Label text={placeholder} htmlFor={name + placeholder} />
          <select disabled={disabled} className="Select" name={name} value={value} onChange={onChange}>
            {selectList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Select;
