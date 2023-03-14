import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class FirstStep extends Component {
  next = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <Container maxWidth="sm" className="mrugank0">
        <h1>Letter Of Recommendation</h1>
        <h2>Info</h2>
       
        <TextField
          className="formmrug"
          // label="Date"
          name="date"
          type= "date"
          margin="normal"
          placeholder="DD/MM/YYYY"
          onChange={handleChange("date")}
          defaultValue={values.date}
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          className="formmrug"
          label="Year of Passing"
          name="yearpassing"
          margin="normal"
          onChange={handleChange("yearpassing")}
          defaultValue={values.yearpassing}
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <TextField
          className="formmrug"
          label="Roll NO"
          name="rollno"
          margin="normal"
          onChange={handleChange("rollno")}
          defaultValue={values.rollno}
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        
       
      
        {/* <TextField
          className="formmrug"
          label="Correspondence Address"
          name="address"
          margin="normal"
          onChange={handleChange("address")}
          defaultValue={values.address}
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
        <Button
          name="passportphoto"
          style={{
            marginTop: "1rem",
            backgroundColor: "darkgrey",
            color: "black",
          }}
          onChange={handleChange("passportphoto")}
          defaultValue={values.passportphoto}
          id="outlined-btn"
          variant="contained"
          component="label"
          size="small"
          className="offerbtn2"
        >
          <div className="uploadlor">
            <i className="fa-solid fa-upload"></i>
            Passport Photo
          </div>
          <input hidden accept=".jpg" multiple type="file" />
        </Button>
        <span></span> */}

        <Button
          className="mrugbtn"
          onClick={this.next}
          // variant="contained"
          fullWidth
          // color="primary"
          style={{
            marginTop: "1rem",
            backgroundColor: "#1a4870",
            color: "white",
          }}
        >
          Next
        </Button>
      </Container>
    );
  }
}

export default FirstStep;
