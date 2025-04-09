import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./Router/Auth/index.tsx";
import HomeRouter from "./Router/Home/index.tsx";
import ProfileRouter from "./Router/Profile/index.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./Redux/Store/index.tsx";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <AuthRouter />
          <HomeRouter />
          <ProfileRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
