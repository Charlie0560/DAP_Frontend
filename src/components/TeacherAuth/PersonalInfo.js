import React, { Component } from "react";
import logo from "../../pict_logo.jpg";

export class PersonalInfo extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, inputChange } = this.props;

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
              <label htmlFor="name" className="signuplabel">
                Full Name
              </label>
              {/* <br /> */}
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={inputChange("fullname")}
                value={values.fullname}
                placeholder="Full Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="signuplabel">
                College Id
              </label>
              {/* <br /> */}
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={inputChange("collegeId")}
                value={values.collegeId}
                placeholder="E2k*****@ms.pict.edu"
              />
            </div>

            <div className="form-group">
              <label className="signuplabel" htmlFor="password">
                Password
              </label>
              {/* <br /> */}
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={inputChange("password")}
                value={values.password}
                placeholder="Password"
                maxLength={10}
                // minLength={6}
              />
            </div>

            <div className="text-right">
              <center>
                <button className="btn loginbtn" onClick={this.continue}>
                  Next
                </button>
                <br />
                <br />
                <center>
                  <p>
                    Already have an account ? <a href="/teacherslogin">Login</a>
                  </p>
                </center>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalInfo;
