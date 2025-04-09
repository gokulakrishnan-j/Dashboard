import React from "react";
import Card from "../ReusableComponent/Card/index.tsx";
import Input from "../ReusableComponent/Input/index.tsx";
import "./style.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../ReusableComponent/Button/index.tsx";
import { useNavigate } from "react-router-dom";
import { signinApi } from "../../API/Auth/index.tsx";
import { toast } from "react-toastify";
import { setLocalStorage } from "../ReusableFuction/LocalStorage/index.tsx";
import { setUser } from "../../Redux/Slice/userSlice.tsx";
import { useDispatch } from "react-redux";

const formValidationSchema = yup.object({
  email: yup.string().email("Enter valid email").required("Fill the email"),
  password: yup
    .string()
    .min(5, "Need a long password")
    .max(12, "Too much password")
    .required("Fill the password"),
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = async (values) => {
    const response = await signinApi(values);

    if (response?.data?.message?.data) {
      dispatch(setUser(response.data.message.data));
      setLocalStorage("user", JSON.stringify(response?.data?.message?.data));
      toast(response?.data?.message?.message);
      navigate(`/home/${response?.data?.message?.data?.id}`);
    } else {
      toast(response?.response?.data?.message);
    }
  };

  const { handleSubmit, values, handleBlur, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        handleSignin(values);
      },
    });
  return (
    <form className="container" onSubmit={handleSubmit}>
      <Card>
        <h4>Signin</h4>
        <Input
          name={"email"}
          placeholder={"Email"}
          type={"email"}
          value={values.email}
          touched={touched.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          name={"password"}
          placeholder={"password"}
          type={"password"}
          value={values.password}
          touched={touched.password}
          error={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button type="submit" text="Signin" />
        <div>
          <span>I don't have account an</span>
          <button className="signupButton" onClick={()=> navigate("/signup")}>Signup</button>
        </div>
      </Card>
    </form>
  );
};

export default Signin;
