import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Profile = lazy(() => import("../../Component/Profile/index.tsx"));

const ProfileRouter = () => {
  return (
    <Routes>
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
};

export default ProfileRouter;
