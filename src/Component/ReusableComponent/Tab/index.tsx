import React, { useState } from "react";
import { TabProps } from "./interface.ts";
import "./style.css";
import Button from "../Button/index.tsx";

const Tab: React.FC<TabProps> = ({ menu = [], setSelectedMenu }) => {
  const [clicked, setClicked] = useState<number>(1);
  const style = { width: "100%", border: "0px", borderRadius: 0 };

  const handleClick = (id: number) => {
    setClicked(id);
    setSelectedMenu(id);
  };
  return (
    <div className="tabContainer">
      {menu.map((item) => (
        <div className="menuList" key={item.id}>
          <Button
            onClick={() => handleClick(item.id)}
            style={{
              ...style,
              backgroundImage:
                clicked === item.id
                  ? "linear-gradient(to right, rgb(230, 187, 187), rgb(248, 248, 170))"
                  : "linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255))",
            }}
            text={item.text}
            type="button"
          />
        </div>
      ))}
    </div>
  );
};

export default Tab;
