import React from 'react'
import "./login.css";

const Login= (props) => {
const { label, errorMessage, onChange, id, ...inputProps } = props;
  return (
    <div className='login'>
        <label>{label}</label>
        <input {...inputProps}
        onChange={onChange} />
       
    </div>
  )
}

export default Login;