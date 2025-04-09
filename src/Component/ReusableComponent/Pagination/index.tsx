import React from "react";
import { PaginationProps } from "./interface.ts";
import "./style.css";
import Button from "../Button/index.tsx";

const Pagination: React.FC<PaginationProps> = ({
  onPrevues,
  onNext,
  text,
  disabledNext,
  disabledPrevious,
}) => {
  const buttonStyle = { width: "10%", height: "10%" };
  const disabledNextStyle = {
    backgroundImage: disabledNext
      ? "linear-gradient(to right, rgba(141, 141, 141, 0.26), rgba(141, 141, 141, 0.26))"
      : "linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255))",
  };
  const disabledPreviousStyle = {
    backgroundImage: disabledPrevious
      ? "linear-gradient(to right, rgba(141, 141, 141, 0.26), rgba(141, 141, 141, 0.26))"
      : "linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255))",
  };
  return (
    <div className="paginationContainer">
      <div className="paginationChildContainer">
        <Button
          disabled={disabledPrevious}
          onClick={onPrevues}
          type="button"
          text="Prevues"
          style={{ ...buttonStyle, ...disabledPreviousStyle }}
        />
        <p>{text}</p>
        <Button
          disabled={disabledNext}
          onClick={onNext}
          type="button"
          text="Next"
          style={{ ...buttonStyle, ...disabledNextStyle }}
        />
      </div>
    </div>
  );
};

export default Pagination;
