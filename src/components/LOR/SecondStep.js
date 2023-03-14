import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class SecondStep extends Component {
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
      <Container>
        <Container maxWidth="sm" className="mrugank">
          <h1>Letter Of Recommendation</h1>
          <h2>- Engineering Results -</h2>
          <h3>First Year (Not Applicable for Direct 2nd Year)</h3>
          <TextField
            className="formmrug"
            label="Year"
            name="year"
            onChange={handleChange("year")}
            defaultValue={values.year}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            className="formmrug"
            label="Marks(Obtained /Total)"
            name="marks"
            onChange={handleChange("marks")}
            defaultValue={values.marks}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            className="formmrug"
            label="Percentage or Grade"
            name="percentage"
            margin="normal"
            onChange={handleChange("percentage")}
            defaultValue={values.percentage}
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <h3>Second Year</h3>
          <TextField
            className="formmrug"
            label="Year"
            name="year1"
            onChange={handleChange("year1")}
            defaultValue={values.year1}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            className="formmrug"
            label="Marks(Obtained /Total)"
            name="marks1"
            onChange={handleChange("marks1")}
            defaultValue={values.marks1}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            className="formmrug"
            label="Percentage or Grade"
            name="percentage1"
            onChange={handleChange("percentage1")}
            defaultValue={values.percentage1}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <h3>Third Year</h3>
          <TextField
            className="formmrug"
            label="Year"
            name="year2"
            onChange={handleChange("year2")}
            defaultValue={values.year2}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            className="formmrug"
            label="Marks(Obtained /Total)"
            name="marks2"
            onChange={handleChange("marks2")}
            defaultValue={values.marks2}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            className="formmrug"
            label="Percentage or Grade"
            name="percentage2"
            onChange={handleChange("percentage2")}
            defaultValue={values.percentage2}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <h3>Fourth Year</h3>
          <TextField
            className="formmrug"
            label="Year"
            name="year3"
            onChange={handleChange("year3")}
            defaultValue={values.year3}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            className="formmrug"
            label="Marks(Obtained /Total)"
            onChange={handleChange("marks3")}
            defaultValue={values.marks3}
            name="marks3"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <TextField
            className="formmrug"
            label="Percentage or Grade"
            onChange={handleChange("percentage3")}
            defaultValue={values.percentage3}
            name="percentage3"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <div style={{ marginTop: "1rem",display: "flex", justifyContent: "space-between" }}>
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
      </Container>
    );
  }
}

export default SecondStep;
