import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Signup = lazy(() => import("../../Component/Signup/index.tsx"));
const Signin = lazy(() => import("../../Component/Signin/index.tsx"));

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
    </Routes>
  );
};

export default AuthRouter;
