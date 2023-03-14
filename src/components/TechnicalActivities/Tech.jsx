import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import "./Tech.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import FormInputTech from "./FormInputTech";
import TechnicalBoxes from "./TechnicalBoxes";
import axios from "axios";
import DateInputTech from "./DateInputTech";
import Skeleton from "@mui/material/Skeleton";


function Technical({user}) {
  const [selectedFile, setSelectedFile] = useState("");
  const [club, setClub] = useState("");
  const [event, setEvent] = useState("");
  const [desc, setDesc] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [datas, setDatas] = useState([]);
 const[adding,setAdding] = useState(false);
  const handleAddInternship = async (e) => {
    setAdding(true);
    const data = {
      club,
      sdate,
      edate,
      desc,
      event,
      sid: user._id,
      sname: user.fullname,
      sdiv: user.div,
      sbatch: user.batch,
      srollno: user.rollno,
      file:selectedFile
    };

    if (
      !club ||
      !sdate ||
      !event ||
      !desc ||
      !selectedFile
    ) {
      window.alert("All the fields are required");
      return;
    }
    try {
      await axios.post("https://dapbackend.onrender.com/api/techActivity/newTechActivity", data);
      setOpen(false);
      setAdding(false);
    } catch (err) {
      console.log(err);
    }
    // console.log(selectedFile);
  };

  useEffect(()=>{
    const fetchactivites = async()=>{
      try{
        const res = await axios.get("https://dapbackend.onrender.com/api/techActivity/getbysid/" + user._id);
        setDatas(res.data);
        console.log(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchactivites();
  })
  return (
    <>
      <Navbar user={user}/>
      <div className="studentInternshipDashboard">
        <div className="dataheader">
          <p className="internship_data_header">Technical Activity Data</p>
          <Button variant="contained" onClick={handleOpen}>
            Add{" "}
          </Button>
        </div>
      </div>
      <br />
      <br />
      <center>
        <div className="internshipboxes">
          {!datas ?
          <>
          <Skeleton variant="rectangular" style={{width: "80%", height: "200px", borderRadius: "10px"}} />
          <br/>
          <Skeleton variant="rectangular" style={{width: "80%", height: "200px", borderRadius: "10px"}} />
          <br/>
          <Skeleton variant="rectangular" style={{width: "80%", height: "200px", borderRadius: "10px"}} />
          <br/>
        </>
        :
          datas.map((d) => (
            <TechnicalBoxes data={d} user={user} />
          ))}
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
              <h2>Enter your technical activity details</h2>

              <FormInputTech
                name="Club"
                placeholder="Name of the club"
                onChange={(e) => setClub(e.target.value)}
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
              <FormInputTech
                name="event"
                placeholder="Event Name"
                onChange={(e) => setEvent(e.target.value)}
              />

              <FormInputTech
                name="Description"
                placeholder="Description"
                onChange={(e) => setDesc(e.target.value)}
              />

              <center>
                <DateInputTech
                  name="Start Date"
                  placeholder="Start Date"
                  label="Start Date"
                  onChange={(e) => setSdate(e.target.value)}
                />
                <DateInputTech
                  name="Start Date"
                  placeholder="End Date"
                  label="End Date"
                  onChange={(e) => setEdate(e.target.value)}
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
                    Proof
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
              {adding ? "Processing..." :  <Button className="internsubtn" onClick={handleAddInternship}>
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

export default Technical;
