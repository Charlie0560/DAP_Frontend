import React, { Component } from "react";
import axios from "axios";
import logo from "../../pict_logo.jpg";

export class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    let alert;
    const { values, inputChange } = this.props;

    const handleFinal = async (e) => {
      e.preventDefault();
      try {
        // console.log(values);
        await axios.post("https://dapbackend.onrender.com/api/teachers/signupVerify", values);
        window.alert("Signup successfull");
        window.location.replace("/teacherslogin");
      } catch (err) {
        console.log(err);
        window.alert("Verification failed , please try again");
      }
    };

    return (
      <div className="app ">
        <div className="form-container form">
          <div className="loginform">
            <center>
              <img className="logoimg" src={logo} alt="" />
              <h3>Digital Academic Passport</h3>
            </center>
            {/* <br /> */}
            <h2 className="mb-2">Teachers Sign Up</h2>
            {/* <br /> */}

            <div className="form-group">
              <label className="" htmlFor="OTP">
                <center>
                  <b>College ID verification</b>
                  <br />
                  Enter an OTP sent to {values.collegeId};
                </center>
              </label>
              <center>
              <input
                type="text"
                className="form-control"
                name="OTP"
                onChange={inputChange("otp")}
                value={values.otp}
                placeholder="OTP"
              />
              </center>
              <div className="row">
                <div
                  className="col-12 back_continue"
                  style={{ justifyContent: "center" }}
                >
                  <button className="loginbtn btn1" onClick={handleFinal}>
                    Submit
                  </button>
                </div>
                <p style={{ color: "red", textAlign: "center" }}>{alert}</p>
                <br />
                <center>
                  <p>
                    Already have an account ? <a href="/teacherslogin">Login</a>
                  </p>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
