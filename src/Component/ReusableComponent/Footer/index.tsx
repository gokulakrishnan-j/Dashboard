import React, { useState } from "react";
import "./style.css";
import Button from "../Button/index.tsx";
import { clearLocalStorage } from "../../ReusableFuction/LocalStorage/index.tsx";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal/index.tsx";
import Drawer from "../Drawer/index.tsx";
import Input from "../Input/index.tsx";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { changeUserPasswordApi } from "../../../API/User/index.tsx";

const formValidationSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .notOneOf(
      [yup.ref("password")],
      "New password must differ from the old one."
    ),
  confirmPassword: yup
    .string()
    .required("Confirm your password is required")
    .oneOf(
      [yup.ref("newPassword")],
      "Confirm password does not match the new password"
    ),
});

const Footer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonStyle = { width: "10%", height: "10%" };

  const handleUpdate = async (values) => {
    const response = await changeUserPasswordApi(id, values);

    if (response?.data?.message) {
      toast(response?.data?.message);
      setOpen(false);

      handleLogout();
    } else {
      toast(response?.response?.data?.message);
      setOpen(false);
    }
  };

  const { handleSubmit, values, handleBlur, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        handleUpdate(values);
      },
    });

  const handleLogout = () => {
    clearLocalStorage();
    navigate("/signin");
  };

  const handleChangePassword = () => {
    setOpen(true);
  };
  return (
    <div className="footerContainer">
      <div className="footerChildContainer">
        <Button
          onClick={() => setShowConfirm(true)}
          type="button"
          text="Logout"
          style={buttonStyle}
        />
        <Button
          onClick={handleChangePassword}
          type="button"
          text="Change Password"
          style={buttonStyle}
        />
      </div>

      {showConfirm && (
        <Modal
          text={"Are you sure you want to Logout?"}
          confirm={handleLogout}
          cancel={() => setShowConfirm(false)}
        />
      )}
      <Drawer
        open={open}
        setOpen={setOpen}
        buttonText={"Change"}
        handleSubmit={handleSubmit}
      >
        <div className="childChangePasswordContainer">
          <Input
            name={"password"}
            placeholder={"Password"}
            type={"password"}
            value={values.password}
            touched={touched.password}
            error={errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name={"newPassword"}
            placeholder={"New Password"}
            type={"password"}
            value={values.newPassword}
            touched={touched.newPassword}
            error={errors.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name={"confirmPassword"}
            placeholder={"Confirm Password"}
            type={"text"}
            value={values.confirmPassword}
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Footer;
