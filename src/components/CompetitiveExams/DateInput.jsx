import React from "react";
import "./formInput.css";



function DateInput(props) {
  const { label, ...inputProps } = props;

  return (
      <div className="forminput dateforminput">
        <label style={{marginTop: "7px"}}>{label}</label>
        <input type="date"  {...inputProps} />
      </div>
  );
}

export default DateInput;
