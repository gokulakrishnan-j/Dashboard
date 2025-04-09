import React from "react";
import "./style.css";
import Button from "../Button/index.tsx";

const Drawer = ({ open, setOpen, children, buttonText, handleSubmit }) => {

  const handleClick = ()=>{
    handleSubmit()
  }
  return (
    <div className="drawerContainer" style={{ left: open ? 0 : "-100%" }}>
      <div className="fieldsContainer">{children}</div>
      <div className="drawerButton">
        <Button onClick={() => setOpen(false)} type="button" text="Cancel" />
        <Button onClick={() => handleClick()} type="button" text={buttonText} />
      </div>
    </div>
  );
};

export default Drawer;
