import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import * as yup from "yup";
import { useFormik } from "formik";
import Input from "../ReusableComponent/Input/index.tsx";
import Button from "../ReusableComponent/Button/index.tsx";
import Select from "../ReusableComponent/Select/index.tsx";
import { roles, status } from "../../Utils/index.tsx";
import { updateUserApi } from "../../API/User/index.tsx";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/index.tsx";
import { setLocalStorage } from "../ReusableFuction/LocalStorage/index.tsx";

const formValidationSchema = yup.object({
  username: yup
    .string()
    .min(5, "Need a long username")
    .required("Fill the username"),
  email: yup.string().email("Enter valid email").required("Fill the email"),
  firstName: yup
    .string()
    .min(3, "Need a long first name")
    .required("Fill the first name"),
  lastName: yup.string().required("Fill the last name"),
  role: yup.string().required("Select role"),
  status: yup.string(),
});

const Profile = () => {
  const { id } = useParams();
  const [view, setView] = useState(true);
  const user = useSelector((state: RootState) => state.user.user);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleSetUserData = (dataObject) => {
    setFieldValue("username", dataObject.username);
    setFieldValue("email", dataObject.email);
    setFieldValue("firstName", dataObject.firstName);
    setFieldValue("lastName", dataObject.lastName);
    setFieldValue("role", dataObject.role);
    setFieldValue("status", dataObject.status);
  };

  useEffect(() => {
    handleSetUserData(user);
  }, [user]);

  const handleUpdate = async (values) => {
    const response = await updateUserApi(id, values);

    if (response?.data?.message?.data) {
      if (response?.data?.message?.data.id === currentUser.id) {
        setLocalStorage(
          "user",
          JSON.stringify({
            ...response?.data?.message?.data,
            token: currentUser.token,
          })
        );
      }
      handleSetUserData(response?.data?.message?.data);
      setView(true);
      toast(response?.data?.message?.message);
    } else {
      toast(response?.data?.message);
    }
  };

  const style = useMemo(() => {
    return { width: "10%", height: "10%" };
  }, []);

  const {
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      role: "",
      status: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      handleUpdate(values);
    },
  });

  return (
    <form className="profileContainer" onSubmit={handleSubmit}>
      <div className="childProfileContainer">
        <Input
          name={"firstName"}
          placeholder={"First Name"}
          type={"text"}
          value={values.firstName}
          touched={touched.firstName}
          error={errors.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          view={view}
        />
        <Input
          name={"lastName"}
          placeholder={"Last Name"}
          type={"text"}
          value={values.lastName}
          touched={touched.lastName}
          error={errors.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          view={view}
        />
        <Input
          name={"username"}
          placeholder={"Username"}
          type={"text"}
          value={values.username}
          touched={touched.username}
          error={errors.username}
          onChange={handleChange}
          onBlur={handleBlur}
          view={view}
        />
        <Input
          name={"email"}
          placeholder={"Email"}
          type={"email"}
          value={values.email}
          touched={touched.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          view={view}
        />
        <Select
          selectList={roles}
          name={"role"}
          placeholder={"Role"}
          value={values.role}
          onChange={handleChange}
          view={view}
          disabled={
            currentUser.role !== "SUPER_ADMIN" ||
            (currentUser.id !== Number(id) &&
              currentUser.role !== "SUPER_ADMIN")
          }
        />
        <Select
          selectList={status}
          name={"status"}
          placeholder={"Active"}
          value={values.status}
          onChange={handleChange}
          view={view}
        />
      </div>
      {view ? (
        <Button
          type="button"
          text="Edit"
          style={style}
          onClick={() => setView(false)}
        />
      ) : (
        <>
          <Button
            type="button"
            text="Cancel"
            style={style}
            onClick={() => setView(true)}
          />
          <Button type="submit" text="Save" style={style} />
        </>
      )}
    </form>
  );
};

export default Profile;
