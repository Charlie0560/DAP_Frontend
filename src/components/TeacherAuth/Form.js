import React, { Component } from "react";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Success from "./Success";
import Confirm from "./Confirm";
import "./login.css";

export class Form extends Component {
  state = {
    step: 1,
    fullname: "",
    password: "",
    department: "",
    collegeId: "",
    mobile: "",
    otp: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  inputChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  render() {
    const { step } = this.state;
    const { fullname, password, department, collegeId, mobile, otp } =
      this.state;
    const values = { fullname, password, department, collegeId, mobile, otp };

    switch (step) {
      case 1:
        return (
          <PersonalInfo
            nextStep={this.nextStep}
            inputChange={this.inputChange}
            values={values}
          />
        );
      case 2:
        return (
          <Education
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            inputChange={this.inputChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            inputChange={this.inputChange}
            values={values}
          />
        );
      case 4:
        return <Success />;
      default:
    }
  }
}

export default Form;
