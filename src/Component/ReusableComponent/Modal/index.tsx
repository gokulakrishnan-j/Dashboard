import React from "react";
import { ModalProps } from "./interface.ts";
import "./style.css";
import Button from "../Button/index.tsx";

const Modal: React.FC<ModalProps> = ({ confirm, cancel, text }) => {
  return (
    <div className="modalContainer">
      <div className="modalChildContainer">
      <p>{text}</p>
      <Button onClick={confirm} type="button" text="Yes" />
      <Button onClick={cancel} type="button" text="No" />
    </div>
    </div>
  );
};

export default Modal;
