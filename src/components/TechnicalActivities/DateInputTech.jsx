import React from "react";
import "./formInputTech.css";



function DateInputTech(props) {
  const { label, ...inputProps } = props;

  return (
      <div className="forminput dateforminputtech ">
        <label>{label}</label>
        <input type="date"  {...inputProps} />
      </div>
  );
}

export default DateInputTech;
