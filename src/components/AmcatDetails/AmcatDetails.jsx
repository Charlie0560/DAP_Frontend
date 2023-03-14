import React, { useEffect, useState } from "react";
import "./amcat.css";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AmcatBox from "./AmcatBox";

import Navbar from "../navbar/Navbar";
import axios from "axios";
function AmcatDetails({ user }) {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFile2, setSelectedFile2] = useState("");

  const [attempt, setAttempt] = useState(1);
  const [english, setEnglish] = useState("");
  const [logical, setLogical] = useState("");
  const [quantitative, setQuantitative] = useState("");
  const [automata, setAutomata] = useState("");

  const [sfilename, setFilename] = useState("");
  const [sfilename2, setFilename2] = useState("");

  
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    // filename = file.name;
    setFilename(file.name);
    // console.log(file);
  };
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };

  const handleImage2 = (e) => {
    const file = e.target.files[0];
    setFileToBase2(file);
    // filename = file.name;
    setFilename2(file.name);
    // console.log(file);
  };
  const setFileToBase2 = (file) => {
    const reader2 = new FileReader();
    reader2.readAsDataURL(file);
    reader2.onloadend = () => {
      setSelectedFile2(reader2.result);
    };
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [datas, setDatas] = useState([]);
  
  useEffect(() => {
    const fetchAmcatData = async () => {
      try {
        const res = await axios.get(
          `https://dapbackend.onrender.com/api/amcat/getbysid/${user._id}`
        );
        setDatas(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAmcatData();
  });
  const[adding,setAdding] = useState(false);
  const handleAddAmcat = async (e) => {
    setAdding(true);

    const data = {
      english,
      logical,
      quantitative,
      automata,
      attempt,
      dashboard: selectedFile2,
      report: selectedFile,
      sid: user._id,
      sname: user.fullname,
      sdiv: user.div,
      sbatch: user.batch,
      srollno: user.rollno,
    };

    if (
      !english ||
      !logical ||
      !quantitative ||
      !automata ||
      !selectedFile ||
      !selectedFile2 ||
      !attempt
    ) {
      window.alert("All the fields are required");
      return;
    }
    try {
      // console.log(data);
      await axios.post("/api/amcat/newamcat", data);
      window.alert("Amcat Data Added Successfully");
      setOpen(false);
      setAdding(false);
      // setOpen(false);
    } catch (err) {
      console.log(err);
    }
    // console.log(selectedFile);
  };
  return (
    <div>
      <Navbar user={user} />
      <div className="studentInternshipDashboard">
        <div className="dataheader">
          <p className="internship_data_header">Amcat Details</p>
          <Button variant="contained" onClick={handleOpen}>
            Add{" "}
          </Button>
        </div>
      </div>

      <div className="aboxes">
        <div className="abox1">
        {datas?.map((d) => (
            <AmcatBox data={d} user={user} />
          ))}
        </div>
      </div>

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
          <Box className="boxmodal boxmodal12">
            <center>
              <h2>Amcat Details</h2>
              <form className="">
                <div className="Amcat1">
                  <label htmlFor="english">Attempt Number</label>
                  <input
                    type="number"
                    placeholder="Attemp no."
                    name="attempt"
                    id="attempt"
                    onChange={(e) => setAttempt(e.target.value)}
                  />
                  <label htmlFor="english">English Comprehension</label>
                  <input
                    type="number"
                    placeholder="English Comprehension Marks"
                    name="english"
                    id="english"
                    onChange={(e) => setEnglish(e.target.value)}
                  />

                  <label htmlFor="logic">Logical Ability</label>
                  <input
                    type="number"
                    placeholder="Logical Ability Marks"
                    name="logic"
                    id="logic"
                    onChange={(e) => setLogical(e.target.value)}
                  />

                  <label htmlFor="quantitative">Quantitative Ability</label>
                  <input
                    type="number"
                    placeholder="Quantitative Ablility Marks"
                    name="quantitative"
                    id="quantitative"
                    onChange={(e) => setQuantitative(e.target.value)}
                  />

                  <label htmlFor="automata">Automata Avg</label>
                  <input
                    type="number"
                    placeholder="Automata Marks"
                    name="automata"
                    id="automata"
                    onChange={(e) => setAutomata(e.target.value)}
                  />
                </div>
                <div className="button">
                <Button
                  id="outlined-btn"
                  variant="contained"
                  component="label"
                  size="small"
                  className="offerbtn"
                >
                  <div className="uploadmarksheet">
                    <i class="fa-solid fa-upload"></i>
                      Amcat Report
                    <span style={{ fontSize: "10px", color: "orange" }}>
                      {sfilename}
                    </span>
                  </div>
                  <input
                    hidden
                    accept=".pdf"
                    multiple
                    type="file"
                    onChange={handleImage}
                  />
                </Button>
                  {/* <Button
                    className="button1"
                    variant="contained"
                    component="label"
                    size="small"
                  >
                    <div className="uploadoffer">
                      <i class="fa-solid fa-upload"></i>
                    </div>
                    <input
                      hidden
                      accept=".pdf"
                      type="file"
                      onChange={handleImage}
                    />
                  </Button> */}
                  <Button
                    className="button2"
                    variant="contained"
                    component="label"
                    size="small"
                  >
                    <div className="uploadoffer">
                      <i class="fa-solid fa-upload"></i>
                      Dashboard
                    </div>
                    <input
                      hidden
                      accept=".pdf"
                      type="file"
                      onChange={handleImage2}
                    />

                    <span style={{ fontSize: "10px", color: "orange" }}>
                      {sfilename2}
                    </span>
                  </Button>
                </div>
                <br />
                
                {adding? "Processing..." : <Button className="internsubtn" onClick={handleAddAmcat}>
                  Submit
                </Button>}
              </form>
            </center>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AmcatDetails;
