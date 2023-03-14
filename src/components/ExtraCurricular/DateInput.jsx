import React from "react";
import "./formInput.css";



function DateInput(props) {
  const { label, ...inputProps } = props;

  return (
      <div className="forminput dateforminput">
        <label style={{paddingTop: "3px"}}>{label}</label>
        <input type="date"  {...inputProps}  style={{marginTop: "3px"}} />
      </div>
  );
}

export default DateInput;
