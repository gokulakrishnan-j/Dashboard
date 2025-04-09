import React from "react";
import Card from "../ReusableComponent/Card/index.tsx";
import Input from "../ReusableComponent/Input/index.tsx";
import "./style.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../ReusableComponent/Button/index.tsx";
import { signupApi } from "../../API/Auth/index.tsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  username: yup
    .string()
    .min(5, "Need a long username")
    .required("Fill the username"),
  email: yup.string().email("Enter valid email").required("Fill the email"),
  password: yup
    .string()
    .min(5, "Need a long password")
    .max(12, "Too much password")
    .required("Fill the password"),
  firstName: yup
    .string()
    .min(3, "Need a long first name")
    .required("Fill the first name"),
  lastName: yup.string().required("Fill the last name"),
});

const Signup = () => {
  const navigate = useNavigate();
  const handleSignup = async (values) => {
    const response = await signupApi(values);

    if (response?.data?.message === "Created successfully") {
      toast(response?.data?.message);
      navigate("/signin");
    } else {
      toast(response?.data?.message);
    }
  };

  const { handleSubmit, values, handleBlur, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        handleSignup(values);
      },
    });
  return (
    <form className="container" onSubmit={handleSubmit}>
      <Card>
        <h4>Signup</h4>
        <Input
          name={"firstName"}
          placeholder={"First Name"}
          type={"text"}
          value={values.firstName}
          touched={touched.firstName}
          error={errors.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
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
        />
        <Input
          name={"username"}
          placeholder={"User Name"}
          type={"text"}
          value={values.username}
          touched={touched.username}
          error={errors.username}
          onChange={handleChange}
          onBlur={handleBlur}
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
        <Button type="submit" text="Signup" />
        <div>
          <span>I have account an</span>
          <button className="signinButton" onClick={()=> navigate("/signin")}>Signin</button>
        </div>
      </Card>
    </form>
  );
};

export default Signup;
