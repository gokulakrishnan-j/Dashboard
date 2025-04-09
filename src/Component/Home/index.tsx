import React, { useEffect, useState } from "react";
import "./style.css";
import Tab from "../ReusableComponent/Tab/index.tsx";
import { menuList } from "../../Utils/index.tsx";
import Profile from "../Profile/index.tsx";
import Users from "../Users/index.tsx";
import Footer from "../ReusableComponent/Footer/index.tsx";
import { getLocalStorage } from "../ReusableFuction/LocalStorage/index.tsx";
import { setCurrentUser, setUser } from "../../Redux/Slice/userSlice.tsx";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState<number>(1);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (selectedMenu === 1) {
      const data = getLocalStorage("user");
      const dataObject = JSON.parse(data);
      dispatch(setUser(dataObject));
      dispatch(setCurrentUser(dataObject));

      const list = [...menuList];

      const menuData: any = dataObject?.role === "USER" ? [list[0]] : list;

      setMenu(menuData);
    }
  }, [selectedMenu]);

  return (
    <div className="homeContainer">
      <Tab setSelectedMenu={setSelectedMenu} menu={menu} />
      {selectedMenu === 1 ? <Profile /> : <Users />}
      <div className="footerContainer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
