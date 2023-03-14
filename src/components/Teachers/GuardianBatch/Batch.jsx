import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

function Batch({ batch }) {
  // console.log(batch);
  const [open1, setOpen1] = React.useState(false);
  const [tostu, setTostu] = useState(false);
  const [toparen, setToparen] = useState(false);
  const [subject, setSubject] = useState("");
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [desc, setDesc] = useState("");
  const [age, setAge] = React.useState("");
  const [students, setStudents] = useState([]);
  const [adding, setAdding] = useState(false);
  const [sfilename, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

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
  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get(
        "https://dapbackend.onrender.com/api/students/getdivStudents/" + batch.batchdiv
      );
      setStudents(res.data);
    };
    fetchStudents();
  });
  const handleSendMail = async () => {
    try {
      const data = {
        subject,
        mailbody: desc,
        filename: sfilename,
        attachment: selectedFile
      };
      console.log(data);
      if (tostu) {
        await axios.post("https://dapbackend.onrender.com/api/batches/sendmail/" + batch.batchid, data);
      }
      if (toparen) {
        await axios.post("https://dapbackend.onrender.com/api/batches/sendmailp/" + batch.batchid, data);
      }
      window.alert("Mail sent successfully");
    } catch (err) {
      console.log(err);
      window.alert("Something went's Wrong");
    }
  };
  const handleAdd = async (row) => {
    const data = {
      students: {
        collegeId: row.collegeId,
        name: row.fullname,
        rollno: row.rollno,
        div: row.div,
      },
      students_mail: [row.collegeId],
      parents_mail: [row.father_mail, row.mother_mail],
    };
    // console.log(data);
    try {
      // console.log(data);
      await axios.put(`https://dapbackend.onrender.com/api/batches/addstudents/${batch.batchid}`, data);
      setAdding(true);
      setAge()
      console.log("Student added Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const stddata = batch.students;

  const [rollno, setRollno] = useState("");
  stddata.sort((a, b) => (a.rollno < b.rollno ? -1 : 1));
  return (
    <div className="batchc">
      <h2>{batch.batchname}</h2>
      <div className="bcompo">
        <Select
          value={age}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          style={{ width: "300px" }}
        >
          <MenuItem value="">
            <em>Add Student</em>
          </MenuItem>
          <center>
            <input
              style={{ width: "300px" }}
              placeholder="Enter roll no"
              onChange={(e) => setRollno(e.target.value)}
            />
          </center>
          <MenuItem className="mitems">
            <div className="contents">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Sr No.</TableCell>
                      <TableCell align="left">Student Name</TableCell>
                      <TableCell align="left">Student Div</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map(
                      (row) =>
                        row.rollno === parseInt(rollno) && (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left">{row.rollno}</TableCell>
                            <TableCell align="left">{row.fullname}</TableCell>
                            <TableCell align="left">{row.div}</TableCell>
                            <TableCell align="left">
                              
                                {row.batch===batch.batchname ? <Button disabled style={{color: "Green"}}>Added </Button> : <Button onClick={() => handleAdd(row)}>{adding === true ? "Added" : "Add"}</Button>}
                             
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </MenuItem>
        </Select>
        <p onClick={handleOpen1}>
          <i class="fa-sharp fa-solid fa-envelope"></i>
        </p>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Sr No.</TableCell>
              <TableCell align="left">Student Name</TableCell>
              <TableCell align="left">Student Div</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stddata.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="left">{row.rollno}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.div}</TableCell>
                <TableCell align="left">
                  {/* <Button onClick={() => handleAdd(row)}>Add</Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open1}>
          <Box className="boxmodal noticeboxmodal">
            <center>
              <h2>Send Mail</h2>
              <input
                type="text"
                placeholder="Subject"
                className="noticeinput"
                onChange={(e) => setSubject(e.target.value)}
              />
              <div className="desc">
                <label htmlFor="">Mail Body</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <br/>
              <Button
                  id="outlined-btn"
                  variant="contained"
                  component="label"
                  size="small"
                  className="offerbtn"
                >
                  <div className="uploadmarksheet">
                    <i class="fa-solid fa-upload"></i>
                    File
                  </div>
                  <input
                    hidden
                    accept=".pdf,.png,.jpeg,.jpg,.doc"
                    type="file"
                    onChange={handleImage}
                  />
                </Button>
                {sfilename}
              <div
                className="checkbox"
                style={{
                  display: "flex",
                  columnGap: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input type="checkbox" onChange={() => setTostu(true)} /> To
                Students
                <input type="checkbox" onChange={() => setToparen(true)} /> To
                Parents
              </div>
              <div className="submitbtndiv">
                <Button className="internsubtn" onClick={handleSendMail}>
                  Send
                </Button>
              </div>
            </center>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Batch;
