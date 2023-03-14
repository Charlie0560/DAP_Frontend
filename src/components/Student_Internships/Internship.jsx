import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import "./internship.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import FormInput from "./FormInput";
import InternshipBoxes from "./InternshipBoxes";
import axios from "axios";
import DateInput from "./DateInput";
import Skeleton from "@mui/material/Skeleton";

function Internship({ user }) {
  const [selectedFile, setSelectedFile] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState(0);
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");

  const [sfilename, setFilename] = useState("");
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    // filename = file.name;
    setFilename(file.name);
    console.log(file);
  };
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [datas, setDatas] = useState([]);
  // const [user, setUser] = useState("");

  // const refreshToken = async () => {
  //   const res = await axios
  //     .get("https://dapbackend.onrender.com/api/students/refresh", {
  //       withCredentials: true,
  //     })
  //     .catch((err) => console.log(err));

  //   const data = await res.data;
  //   return data;
  // };
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get(
          `https://dapbackend.onrender.com/api/internships/getallStudentInternships/${user._id}`
        );
        setDatas(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInternships();
  });

  // console.log(user);
  const [adding,setAdding] = useState(false);
  const handleAddInternship = async (e) => {
  setAdding(true);
  const data = {
    company_name,
      start_date,
      end_date,
      duration,
      role,
      desc,
      stipend,
      offer_letter: selectedFile,
      student_id: user._id,
      student_name: user.fullname,
      student_div: user.div,
      student_branch: user.branch,
      student_roll: user.rollno,
      batch: user.batch,
      student_year: user.div[0] + user.div[1],
    };

    if (
      !company_name ||
      !start_date ||
      !duration ||
      !role ||
      !desc ||
      !selectedFile
    ) {
      window.alert("All the fields are required");
      return;
    }
    try {
      await axios.post("https://dapbackend.onrender.com/api/internships/newInternship", data);
      // window.alert("Internship Data Added Successfully");
      setOpen(false);
      setAdding(false);
    } catch (err) {
      console.log(err);
    }
    // console.log(selectedFile);
  };

  return (
    <>
      <Navbar user={user} />
      <div className="studentInternshipDashboard">
        <div className="dataheader">
          <p className="internship_data_header">Internship Data</p>
          <Button variant="contained" onClick={handleOpen}>
            Add{" "}
          </Button>
        </div>
      </div>
      <br />
      <br />
      <center>
        <div className="internshipboxes">
          {!datas ? (
            <>
              <Skeleton
                variant="rectangular"
                style={{ width: "80%", height: "250px", borderRadius: "10px" }}
              />
              <br />
              <Skeleton
                variant="rectangular"
                style={{ width: "80%", height: "250px", borderRadius: "10px" }}
              />
              <br />
              <Skeleton
                variant="rectangular"
                style={{ width: "80%", height: "250px", borderRadius: "10px" }}
              />
              <br />
            </>
          ) : (
            datas.map((d) => <InternshipBoxes data={d} user={user} />)
          )}
        </div>
      </center>
      <Modal
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="boxmodal">
            <center>
              <h2>Enter Your Internship details</h2>

              <FormInput
                name="Company Name"
                placeholder="Enter Company name"
                onChange={(e) => setCompany_name(e.target.value)}
                maxlength={20}
                />
              {/* <FormInput
                name="Start Date"
                placeholder="Start Date"
                onChange={(e) => setStart_date(e.target.value)}
              /> */}
              {/* <FormInput
                name="End Date"
                placeholder="End date"
                onChange={(e) => setEnd_date(e.target.value)}
              /> */}
              <FormInput
                name="Duration"
                placeholder="Duration"
                onChange={(e) => setDuration(e.target.value)}
                maxlength={20}
              />
              <FormInput
                name="Role"
                placeholder="Role"
                onChange={(e) => setRole(e.target.value)}
                maxlength={20}
              />
              <FormInput
                name="Stipend"
                type="number"
                placeholder="Stipend"
                onChange={(e) => setStipend(e.target.value)}
                maxlength={20}
              />
              <FormInput
                name="Description"
                placeholder="Description"
                onChange={(e) => setDesc(e.target.value)}
                maxlength={300}
              />

              <center>
                <DateInput
                  name="Start Date"
                  placeholder="Start Date"
                  label="Start Date"
                  onChange={(e) => setStart_date(e.target.value)}
                />
                <DateInput
                  name="Start Date"
                  placeholder="End Date"
                  label="End Date"
                  onChange={(e) => setEnd_date(e.target.value)}
                />
              </center>
              <div className="intern1">
                <Button
                  id="outlined-btn"
                  variant="contained"
                  component="label"
                  size="small"
                  className="offerbtn"
                >
                  <div className="uploadmarksheet">
                    <i class="fa-solid fa-upload"></i>
                    Offer Letter
                  </div>
                  <input
                    hidden
                    accept=".pdf"
                    multiple
                    type="file"
                    onChange={handleImage}
                  />
                </Button>
                {/* <br /> */}
                {/* <Button id="outlined-btn" variant="contained" size="small">
                  <div className="uploadoffer">
                    <i class="fa-solid fa-upload"></i>
                    Complition Letter
                    </div>
                    <input
                    hidden
                    accept=".pdf"
                    multiple
                    type="file"
                    onChange={changeHandler2}
                  />
                  <br />
                  <span style={{ fontSize: "10px", color: "orange" }}>
                    {selectedFile2?.name}
                  </span>
                </Button> */}
              </div>
              <span
                style={{ fontSize: "12px", color: "black", fontWeight: "600" }}
              >
                {sfilename}
              </span>
              <div className="submitbtndiv">
                {adding? "Processing..." : <Button className="internsubtn" onClick={handleAddInternship}>
                  Submit
                </Button>}
              </div>
            </center>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Internship;
