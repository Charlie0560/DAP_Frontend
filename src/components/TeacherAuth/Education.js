import React, { Component } from "react";
import axios from "axios";
import logo from "../../pict_logo.jpg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export class Education extends Component {
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


    const handleSubmit = async (e) => {
      e.preventDefault();
     
      const collegeID = values.collegeId;
      const extension = collegeID.split("@")[1];
      if (extension !== "ms.pict.edu") {
        window.alert("Enter a Valid Collge ID");
        return;
      }
      if (values.rollno < 10000 && values.rollno > 99999) {
        window.alert("Enter a Valid 5 Digit Roll No");
        return;
      }
      // if(values.branch !== "CS" || values.branch !== "IT" || values.branch !== 'ENTC' ){

      //   window.alert(values.branch + " Enter a Valid Branch");
      //   return;
      // }
      const plength = values.password;
      if (plength.length < 6 || plength.length > 10) {
        window.alert("Enter Password of atleast 6 and atmost 10 charachters");
        return;
      }
      values.rollno = parseInt(values.rollno);
      if(values.fullname==="" || values.password==="" || values.branch==="" || values.collegeId === "" || values.div==="" || values.rollno===""){
        window.alert("All the fields are required");
        return;
      }
      try {
        // await axios.post("https://dapbackend.onrender.com/api/students/signup", values);
        await axios.post("https://dapbackend.onrender.com/api/teachers/signupOTP", values);
      
        window.alert("OTP Sent Successfully");
        this.continue(e);
        // window.location.replace("/");
      } catch (err) {
        console.log(err);
        window.alert("Something Went's Wrong");
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
              <label className="signuplabel" htmlFor="facebook">
                Department
              </label>
              <Select
                value={values.department}
                onChange={inputChange("department")}
                className="select"
                displayEmpty
                style={{
                  fontSize: "14px",
                  color: "grey",
                  width: "100%",
                  marginBottom: "9px",
                  backgroundColor: "white",
                  height: "53px",
                  marginTop: "9px",
                  fontStyle: "none",
                }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  Department
                </MenuItem>
                <MenuItem value={"FE"}>FE</MenuItem>
                <MenuItem value={"CS"}>CS</MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"ENTC"}>ENTC</MenuItem>
              </Select>
            </div>

            <div className="form-group">
              <label className="signuplabel" htmlFor="github">
                Mobile no.
              </label>
              <input
                type="number"
                className="form-control"
                name="div"
                onChange={inputChange("mobile")}
                value={values.div}
                placeholder="Mobile no."
              />
            </div>
          

            <div className="row">
              <div className="col-12 back_continue">
                <button className="loginbtn btn1 btnback" onClick={this.back}>
                  {"<"}
                </button>
                <button className="loginbtn btn1" onClick={handleSubmit}>
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
    );
  }
}

export default Education;
