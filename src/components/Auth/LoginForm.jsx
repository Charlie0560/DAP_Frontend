import axios from "axios";
import React from "react";
import { useState } from "react";
import Login from "./Login";
import "./login.css";
import logo from "../../pict_logo.jpg";
import { authActions } from "../../store/store";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    collegeId: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "collegeId",
      type: "collegeId",
      placeholder: "College Mail Address",
      label: "CollegeId",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Enter password",

      label: "Password",
    },
  ];

  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const sendRequest = async () => {
    setLoading(true);
    const res = await axios
      .post("https://dapbackend.onrender.com/api/students/login", {
        collegeId: values.collegeId,
        password: values.password,
      })
      .catch((err) => setAlert("User Not Found"));
    setLoading(false);
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => window.location.replace("/dashboard"));
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form className="form form-container" onSubmit={handleSubmit}>
        <div className="loginform">
          <center>
            <img className="logoimg" src={logo} alt="" />
            <h3>Digital Academic Passport</h3>
          </center>
          {/* <br /> */}
          <h2>Login</h2>
          {inputs.map((input) => (
            <Login
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}

          <button className="loginbtn">
            {loading ? <CircularProgress color="inherit" size={30} /> : <p>Submit</p>}
          </button>
          {alert !== "" && (
            <p style={{ color: "red", textAlign: "center", fontWeight: "600" }}>
              {alert}
            </p>
          )}
          {alert === "" && (
            <>
              <br />
              <br />
            </>
          )}
          <center>
            <p>
              Don't have an account ? <a href="/SignUp">Sign Up</a>
            </p>
            {/* <br /> */}
            <span className="forgotpass">
              <a href="/">Forgot Password</a>
            </span>
          </center>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
