import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { Checkbox } from "@mui/material";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class ThirdStep extends Component {
  next = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <Container maxWidth="sm" className="mrugank2">
        <h1>Letter Of Recommendation</h1>
        <h2>
          GRE/TOEFL/IELTS/GMAT Exam Score and Select the Faculty for LOR Request
        </h2>
        <div
          className="formmrug2"
          name="exam"
          onChange={handleChange("exam")}
          defaultValue={values.exam}
        >
          <label className="mrugank5">Select the exam(only one )</label>
          <br />
          <div className="examname">
            <label htmlFor="">GRE</label>
            <Checkbox value="GRE" onChange={handleChange("exam")} />
          </div>
          <div className="examname">
            <label htmlFor="">TOEFL</label>
            <Checkbox value="TOEFL" onChange={handleChange("exam")} />
          </div>
          <div className="examname">
            <label htmlFor="">IELTS</label>
            <Checkbox value="IELTS" onChange={handleChange("exam")} />
          </div>
          <div className="examname">
            <label htmlFor="">GMAT</label>
            <Checkbox value="GMAT" onChange={handleChange("exam")} />
          </div>
          <div className="examname">
            <label htmlFor="">GATE</label>
            <Checkbox value="GATE" onChange={handleChange("exam")} />
          </div>
          <div className="examname">
            <label htmlFor="">CAT</label>
            <Checkbox value="CAT" onChange={handleChange("exam")} />
          </div>
          <div className="examname">
            <label htmlFor="">OTHER</label>
            <Checkbox value="OTHER" onChange={handleChange("exam")} />
          </div>
        </div>
        <TextField
          className="formmrug"
          label="Enter the exam register number or enroll no"
          name="enrollno"
          onChange={handleChange("enrollno")}
          defaultValue={values.enrollno}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          className="formmrug"
          label="Enter the your exam score (Obtained/Total)"
          name="score"
          onChange={handleChange("score")}
          defaultValue={values.score}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          className="formmrug"
          label="Select the Faculty "
          name="faculty"
          onChange={handleChange("faculty")}
          defaultValue={values.faculty}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <div style={{ marginTop: "1rem" ,display: "flex", justifyContent: "space-between"}}>
          <Button
            onClick={this.back}
            variant="contained"
            style={{
              marginRight: "1rem",
              backgroundColor: "#1a4870",
              color: "white",
            }}
          >
            Back
          </Button>
          <Button
            onClick={this.next}
            style={{ backgroundColor: "#1a4870", color: "white" }}
            variant="contained"
          >
            Next
          </Button>
        </div>
      </Container>
    );
  }
}

export default ThirdStep;
