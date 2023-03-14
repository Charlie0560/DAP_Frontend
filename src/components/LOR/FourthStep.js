import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class FourthStep extends Component {
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
    const handleApply = async (req, res) => {
      if (
        values.date === "" ||
        values.yearpassing === "" ||
        values.rollno === ""
      ) {
        window.alert("All the fields are required");
        return;
      }
      try {
        await axios.post("https://dapbackend.onrender.com/api/LOR/newLor/" + this.props.user._id, values);
        console.log(values);
        window.alert("Applied for LOR");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <Container maxWidth="sm" className="mrugank1">
        <h1>Letter Of Recommendation</h1>
        <h2> Universities Applying</h2>

        <TextField
          className="formmrug"
          label="Program Course"
          name="program"
          onChange={handleChange("program")}
          defaultValue={values.program}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          className="formmrug"
          label="Name of Universities"
          name="university"
          onChange={handleChange("university")}
          defaultValue={values.university}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          className="formmrug"
          label="Branch/ Stream"
          name="branch"
          onChange={handleChange("branch")}
          defaultValue={values.branch}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          className="formmrug"
          label="Country / State"
          name="country"
          onChange={handleChange("country")}
          defaultValue={values.country}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
            onClick={handleApply}
            style={{ backgroundColor: "#1a4870", color: "white" }}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </Container>
    );
  }
}

export default FourthStep;
