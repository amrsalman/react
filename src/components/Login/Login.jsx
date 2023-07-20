import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useFormik, yupToFormErrors } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Login(props) {
  let [error, setError] = useState([]);
  let [emailerror, setEmailerror] = useState("");
  const navigate = useNavigate();
  const schema = Yup.object({
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,7}$/),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: sendLoginData,
  });
  async function sendLoginData(values) {
    let { data } = await axios
      .post(
        "https://king-prawn-app-3mgea.ondigitalocean.app/auth/login",
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
      localStorage.setItem("UserToken", data.access_token);
      props.currentStateUser();
      navigate("/Cart");
    }
  }
  return (
    <>
      <div className="my-2 ">
        <h2>Login Now</h2>
        <div className="text-danger">{emailerror}</div>
        {error.map((error) => {
          return <div className="text-danger">{error.message}</div>;
        })}
        <form onSubmit={formik.handleSubmit}>
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
            <button
              type="submit"
              className={
                formik.errors.password || formik.errors.email
                  ? "btn btn-primary opacity-50 pe-none"
                  : formik.values.email.length > 0
                  ? "btn btn-primary "
                  : "btn btn-primary opacity-50 pe-none"
              }
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
