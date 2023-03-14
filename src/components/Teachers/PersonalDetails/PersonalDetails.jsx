import { Button } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../navbar/Navbar";
import FormInput from "../../Student_Internships/FormInput";
import DateInput from "../../Student_Internships/DateInput";
import defaultimg from "../../PersonalDetails/default_userimg.png";
import "../../PersonalDetails/personal_details.css";
import moment from "moment-timezone";
import axios from "axios";
import Address from "./Address";

function PersonalDetails({ user }) {
  const [edit_pesonal, setEdit_personal] = useState(true);
  const [edit_pesonal_value, setEdit_personal_value] = useState("EDIT");
  const [selectedFile1, setSelectedFile1] = useState("");
  const [dp, setDp] = useState("");

  const [fullname, setFullName] = useState("");
  const [mail, setMail] = useState("");
  const [department, setDepartment] = useState("");
  const [mobileno, setMobileno] = useState(0);
  const [DOB, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pwd, setPwd] = useState("");
  const [bloodgrp, setBloodGrp] = useState("");
  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setDp(file);
    setFileToBase1(file);
    // setFilename1(file.name);
    // console.log(file);
  };

  const setFileToBase1 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile1(reader.result);
    };
  };
  const handleEditAccess = (choice) => {
    switch (choice) {
      case 1: {
        setEdit_personal(false);
        setEdit_personal_value("SAVE");
        break;
      }
      default:
        break;
    }
  };
  const handleUpdate = async () => {
    try {
      const dp_data = {
        profile: selectedFile1,
      };
      const data = {
        fullname:
          fullname !== "" ? fullname : user.fullname ? user.fullname : "",
        mail: mail !== "" ? mail : user.mail ? user.mail : "",
        department:
          department !== ""
            ? department
            : user.department
            ? user.department
            : "",
        mobile_no:
          mobileno !== 0 ? mobileno : user.mobile_no ? user.mobile_no : 0,
        DOB: DOB !== "" ? DOB : user.DOB ? user.DOB : "",
        gender: gender !== "" ? gender : user.gender ? user.gender : "",
        category:
          category !== "" ? category : user.category ? user.category : "",
        pan: pan !== "" ? pan : user.pan ? user.pan : "",
        aadhar: aadhar !== "" ? aadhar : user.aadhar ? user.aadhar : "",
        PWD: pwd !== "" ? pwd : user.PWD ? user.PWD : "",
        blood_grp:
          bloodgrp !== "" ? bloodgrp : user.blood_grp ? user.blood_grp : "",
      };
      data.mobileno = parseInt(data.mobileno);
      // console.log(data);
      if (selectedFile1) {
        await axios.put(
          `https://dapbackend.onrender.com/api/teachers/teacher/profile/update_profile/${user._id}`,
          dp_data
        );
      }
      await axios.put(`https://dapbackend.onrender.com/api/teachers/teacher/profile/update/${user._id}`, data);
      setEdit_personal_value("EDIT");
      setEdit_personal(true);
      window.alert("Profile Updated Successfully");
    } catch (err) {
      console.log("Something Wents Wrong");
    }
  };
  return (
    <div>
      <Navbar user={user} />
      <div className="personal_details_dashboard">
        <div className="student_details">
          <div className="details_header">
            <h3>Personal Details</h3>
            <Button
              onClick={() =>
                edit_pesonal_value === "EDIT"
                  ? handleEditAccess(1)
                  : handleUpdate()
              }
            >
              {edit_pesonal_value}
            </Button>
          </div>
          <div className="details_body">
            <div className="imgsection">
              <center>
                <div className="img">
                  {dp ? (
                    <img
                      src={window.URL.createObjectURL(dp)}
                      alt="Default Img"
                    />
                  ) : user.profile ? (
                    <img src={user.profile.url} alt="Default Img" />
                  ) : (
                    <img src={defaultimg} alt="Default Img" />
                  )}
                </div>
                <div className="addimgbtn">
                  <Button
                    id="outlined-btn"
                    // variant="contained"
                    component="label"
                    disabled={edit_pesonal}
                  >
                    <div className="uploadmarksheet">
                      {/* <i class="fa-solid fa-upload"></i> */}
                      Add Img
                    </div>
                    <input
                      hidden
                      accept=".jpg, .jpeg, .png"
                      multiple
                      type="file"
                      onChange={handleImage1}
                    />
                  </Button>
                </div>
              </center>
            </div>
            <div className="details_section">
              <FormInput
                label="Full Name"
                name="fullname"
                placeholder="Full Name"
                defaultValue={user.fullname}
                onChange={(e) => setFullName(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="College ID"
                name="college_id"
                placeholder="College ID"
                value={user && user.collegeId}
                disabled
              />
              <FormInput
                label="Mail ID"
                name="mail_id"
                placeholder="Mail ID"
                defaultValue={user.mail}
                onChange={(e) => setMail(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="Mobile No"
                name="mobileno"
                placeholder="Mobile No"
                defaultValue={user.mobile_no}
                onChange={(e) => setMobileno(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="Department"
                name="branch"
                placeholder="Department"
                defaultValue={user.department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={edit_pesonal}
              />

              <DateInput
                label="DOB"
                name="DOB"
                placeholder="DOB"
                value={DOB === "" ? moment(user.DOB).format("YYYY-MM-DD") : DOB}
                onChange={(e) => setDob(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="Gender"
                name="gender"
                placeholder="Gender"
                defaultValue={user.gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="Category"
                name="category"
                placeholder="Category"
                defaultValue={user.category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="PAN No"
                name="pan"
                placeholder="PAN No"
                defaultValue={user.pan}
                onChange={(e) => setPan(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="Aadhar No"
                name="Aadhar"
                placeholder="Aadhar No"
                defaultValue={user.aadhar}
                onChange={(e) => setAadhar(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="PWD"
                name="pwd"
                placeholder="PWD"
                defaultValue={user.PWD}
                onChange={(e) => setPwd(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="Blood Group"
                name="blood_grp"
                placeholder="Blood Group"
                defaultValue={user.blood_grp}
                onChange={(e) => setBloodGrp(e.target.value)}
                disabled={edit_pesonal}
              />
            </div>
          </div>
        </div>
      </div>
      <Address user={user}/>
    </div>
  );
}

export default PersonalDetails;
