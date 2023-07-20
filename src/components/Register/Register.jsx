import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useFormik, yupToFormErrors } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Register() {
  let [error, setError] = useState([]);
  let [emailerror, setEmailerror] = useState("");
  const navigate = useNavigate();
  const schema = Yup.object({
    userName: Yup.string()
      .required("userName is required")
      .min(3, "min is 3 char")
      .max(10, "max is 10 char"),
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,7}$/),
    cPassword: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("password")], "not matche password"),
  });
  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: schema,
    onSubmit: sendRegisterData,
  });
  async function sendRegisterData(values) {
    let { data } = await axios
      .post(
        "https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup",
        values
      )
      .catch((err) => {
        if (err.response.data.validationErr) {
          setError(err.response.data.validationErr);
          setEmailerror("");
        }
      });
    if (data.message == "Done") {
      setError([]);
      setEmailerror("");
      navigate("/Login");
    } else {
      setEmailerror(data.message);
      setError([]);
    }
  }
  return (
    <>
      <div className="my-2">
        <h2>Register Now</h2>
        <div className="text-danger">{emailerror}</div>
        {error.map((error) => {
          return <div className="text-danger">{error.message}</div>;
        })}
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2">
            <label htmlFor="userName">UserName</label>
            <input
              type="text"
              name="userName"
              id="userName"
              className={
                formik.values.userName.length > 0
                  ? formik.errors.userName
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              placeholder="Enter UserName"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
            {formik.values.userName.length > 0 ? (
              formik.errors.userName ? (
                <p className="alert alert-danger my-2">
                  {formik.errors.userName}
                </p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={
                formik.values.email.length > 0
                  ? formik.errors.email
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              placeholder="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.values.email.length > 0 ? (
              formik.errors.email ? (
                <p className="alert alert-danger my-2">{formik.errors.email}</p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={
                formik.values.password.length > 0
                  ? formik.errors.password
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.values.password.length > 0 ? (
              formik.errors.password ? (
                <p className="alert alert-danger my-2">
                  {formik.errors.password}
                </p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label htmlFor="cPassword">Confirm Password</label>
            <input
              type="password"
              name="cPassword"
              id="cPassword"
              className={
                formik.values.cPassword.length > 0
                  ? formik.errors.cPassword
                    ? "form-control is-invalid"
                    : "form-control is-valid"
                  : "form-control"
              }
              placeholder="Confirm Password"
              value={formik.values.cPassword}
              onChange={formik.handleChange}
            />
            {formik.values.cPassword.length > 0 ? (
              formik.errors.cPassword ? (
                <p className="alert alert-danger my-2">
                  {formik.errors.cPassword}
                </p>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <button
              type="submit"
              className={
                formik.errors.cPassword ||
                formik.errors.password ||
                formik.errors.email ||
                formik.errors.userName
                  ? "btn btn-primary opacity-50 pe-none"
                  : formik.values.userName.length > 0
                  ? "btn btn-primary "
                  : "btn btn-primary opacity-50 pe-none"
              }
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
