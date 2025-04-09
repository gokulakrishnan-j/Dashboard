import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../../Component/Home/index.tsx"));

const HomeRouter = () => {
  return (
    <Routes>
      <Route path="/home/:id" element={<Home />} />
    </Routes>
  );
};

export default HomeRouter;
