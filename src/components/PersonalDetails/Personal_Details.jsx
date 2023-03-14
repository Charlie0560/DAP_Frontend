import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import FormInput from "../Student_Internships/FormInput";
import DateInput from "../Student_Internships/DateInput";
import AddressDetails from "./Address_Details";
import defaultimg from "./default_userimg.png";
import ParentsDetails from "./Parents_Details";
import "./personal_details.css";
import TenthTwelth from "./Tenth_Twelth";
import moment from "moment-timezone";
import InterestedDomains from "./InterestedDomains";

function Personal_Details() {
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  //   setPageNumber(numPages);
  // }

  const [edit_pesonal, setEdit_personal] = useState(true);
  const [edit_pesonal_value, setEdit_personal_value] = useState("EDIT");

  // const [selectedFile, setSelectedFile] = useState("");
  const [selectedFile1, setSelectedFile1] = useState("");
  const [dp, setDp] = useState("");

  // const [sfilename1, setFilename1] = useState("");

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

  const [user, setUser] = useState("");

  const sednRequest = async () => {
    const res = await axios
      .get("https://dapbackend.onrender.com/api/students/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sednRequest().then((data) => setUser(data.user));
  }, []);
  // console.log(user);

  const [fullname, setFullName] = useState("");
  const [mail, setMail] = useState("");
  const [branch, setBranch] = useState("");
  const [div, setDiv] = useState("");
  const [rollno, setRollno] = useState("");
  const [mobileno, setMobileno] = useState(0);
  const [DOB, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pwd, setPwd] = useState("");
  const [bloodgrp, setBloodGrp] = useState("");
  const [abcID, setABCID]= useState("");

  const handleUpdate = async () => {
    try {
      const dp_data = {
        profile: selectedFile1,
      };
      const data = {
        fullname:
          fullname !== "" ? fullname : user.fullname ? user.fullname : "",
        mail: mail !== "" ? mail : user.mail ? user.mail : "",
        branch: branch !== "" ? branch : user.branch ? user.branch : "",
        div: div !== "" ? div : user.div ? user.div : "",
        rollno: rollno !== "" ? rollno : user.rollno ? user.rollno : "",
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
        abcID:
          abcID !== "" ? abcID : user.abcID ? user.abcID : "",
      };
      data.mobile_no = parseInt(data.mobile_no);
      // console.log(data);
      if (selectedFile1) {
        await axios.put(
          `https://dapbackend.onrender.com/api/students/student/profile/update_profile/${user._id}`,
          dp_data
        );
      }
      await axios.put(`https://dapbackend.onrender.com/api/students/student/profile/update/${user._id}`, data);
      setEdit_personal_value("EDIT");
      setEdit_personal(true);
      window.alert("Profile Updated Successfully");
    } catch (err) {
      console.log("Something Wents Wrong");
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar user={user}/>
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
                label="Branch"
                name="branch"
                placeholder="Branch"
                defaultValue={user.branch}
                onChange={(e) => setBranch(e.target.value)}
                disabled={edit_pesonal}
              />
              {/* <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Division</em>
                </MenuItem>
                {}
                {divs.map((d) => (
                  <MenuItem value={d}>{d}</MenuItem>
                ))}
              </Select> */}
              <FormInput
                label="Division"
                name="div"
                placeholder="Division"
                defaultValue={user.div}
                onChange={(e) => setDiv(e.target.value)}
                disabled={edit_pesonal}
              />
              <FormInput
                label="Roll no"
                name="roll_no"
                placeholder="Roll No"
                defaultValue={user.rollno}
                onChange={(e) => setRollno(e.target.value)}
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
              <FormInput
                label="ABC ID"
                name="abc_id"
                placeholder="ABC ID"
                type="number"
                defaultValue={user.abcID}
                onChange={(e) => setABCID(e.target.value)}
                disabled={edit_pesonal}
              />
            </div>
          </div>
        </div>

        {/* Interested Domains */}
        <InterestedDomains user={user}/>

        {/* parent details */}
        <ParentsDetails user={user} />
        <br />
        {/* address details  */}
        <AddressDetails user={user} />

        {/* 10th 12th details  */}

        <TenthTwelth user={user} />

        <br />
        <br />
      </div>
    </div>
  );
}

export default Personal_Details;
