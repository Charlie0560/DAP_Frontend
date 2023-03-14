import React from "react";
import "./formInputTech.css";

function FormInputTech(props) {
  const { label, ...inputProps } = props;
  return (
    <div className="forminputtech">
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  );
}

export default FormInputTech;
