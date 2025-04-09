import React from "react";
import "./style.css";
import { CardProps } from "./interface";
const Card: React.FC<CardProps> = ({ style, children }) => {
  return (
    <div className="cardContainer" style={style ?? {}}>
      {children}
    </div>
  );
};

export default Card;
