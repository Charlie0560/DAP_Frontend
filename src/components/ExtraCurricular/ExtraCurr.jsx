import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./ExtraCurr.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import FormInput from "./FormInput";
// import ExtraCurrBoxes from "./ExtraCurrBoxes";
import axios from "axios";
import DateInput from "./DateInput";
import ExtraCurrBoxes from "./ExtraCurrBoxes";
import Skeleton from "@mui/material/Skeleton";

function ExtraCurricular({ user }) {
  const [selectedFile, setSelectedFile] = useState("");
  const [organization, setOrganization_name] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
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


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [datas, setDatas] = useState([]);
  const[adding,setAdding] = useState(false);
  const handleAddExtraC = async (e) => {
    setAdding(true);
    const data = {
      organization,
      role,
      desc,
      sdate: start_date,
      edate: end_date,
      student_id: user._id,
      file: selectedFile,
      sname: user.fullname,
      sdiv: user.div,
      srollno: user.rollno,
      sbatch: user.batch,
    };
    console.log(data);
    if (
      !organization ||
      !start_date ||
      !end_date ||
      !role ||
      !desc ||
      !selectedFile
    ) {
      window.alert("All the fields are required");
      return;
    }
    if (desc.length < 40) {
      window.alert("Description Should be atleast of 40 words");
      return;
    }
    try {
      await axios.post("https://dapbackend.onrender.com/api/extracurricular/newExtrac", data);
      // window.alert("Extra Curricular Activity Added Successfully");
      setOpen(false);
      setAdding(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [datas, setDatas] = useState([]);

  const fetchactivites = async () => {
    try {
      const res = await axios
        .get("https://dapbackend.onrender.com/api/extracurricular/getbysidd/" + user._id)
        .catch((err) => console.log(err));
      // setDatas(res.data);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchactivites().then((data) => setDatas(data));
  });

  return (
    <>
      <Navbar user={user} />
      <div className="studentInternshipDashboard">
        <div className="dataheader">
          <p className="internship_data_header">Extracurricular Activities</p>
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
              <Skeleton variant="rectangular" style={{width: "80%", height: "200px", borderRadius: "10px"}} />
              <br/>
              <Skeleton variant="rectangular" style={{width: "80%", height: "200px", borderRadius: "10px"}} />
              <br/>
              <Skeleton variant="rectangular" style={{width: "80%", height: "200px", borderRadius: "10px"}} />
              <br/>
            </>
          ) : (
            datas.map((d) => <ExtraCurrBoxes data={d} user={user} />)
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
              <h2>Extracurricular Activity details</h2>

              <FormInput
                name="Company Name"
                placeholder="Name of the organization"
                onChange={(e) => setOrganization_name(e.target.value)}
                maxlength={30}
                
                />
              <FormInput
                name="Role"
                placeholder="Role"
                onChange={(e) => setRole(e.target.value)}
                maxlength={30}
              />

              <FormInput
                name="Description"
                placeholder="Description (upto 300 Characters)"
                onChange={(e) => setDesc(e.target.value)}
                maxlength={300}
                label = {desc.length +" /300"}
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
              </div>
              <span
                style={{ fontSize: "12px", color: "black", fontWeight: "600" }}
              >
                {sfilename}
              </span>
              <div className="submitbtndiv">
               {adding? "Processing..." : <Button className="internsubtn" onClick={handleAddExtraC}>
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

export default ExtraCurricular;
