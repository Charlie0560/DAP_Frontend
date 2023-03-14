import React from "react";
import "./formInput.css";

function FormInput(props) {
  const { label, ...inputProps } = props;
  return (
    <div className="forminput">
      <label style={{paddingTop: "6px"}}>{label}</label>
      <input {...inputProps} />
    </div>
  );
}

export default FormInput;
