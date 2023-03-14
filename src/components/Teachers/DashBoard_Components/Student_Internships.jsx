import React, { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import Button from "@mui/material/Button";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./student_internship.css";
import axios from "axios";
import moment from "moment-timezone";
import { Document, Page, pdfjs } from "react-pdf";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

function Student_Internships({ user }) {
  const [div, setDiv] = useState("");
  const [roll, setRoll] = useState("");
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("");

  let divs = [];
  const years = ["FE", "SE", "TE", "BE"];
  for (let j = 0; j < 4; j++) {
    for (let i = 1; i <= 11; i++) {
      divs.push(years[j] + i);
    }
  }
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleUpdateStatus = async (id) => {
    const form_data = {
      status: status,
    };
    try {
      await axios.put(`https://dapbackend.onrender.com/api/internships/updateInternshipInfo/${id}`, form_data);
      window.alert("Status Updated Successfully");
    } catch (err) {
      console.log(err);
      window.alert("Unable to update the status");
    }
  };

  const [rowsdata, setRowdata] = useState([]);
  // console.log(rowsdata)
  useEffect(() => {
    const internships = async () => {
      if (batch) {
        const res = await axios.get("https://dapbackend.onrender.com/api/internships/getbybatch/" + batch);
        setRowdata(res.data);
        // console.log(res.data);
      } else if (div) {
        const res = await axios.get("https://dapbackend.onrender.com/api/internships/getbydiv/" + div);
        setRowdata(res.data);
        // console.log(res.data);
      } else if (roll) {
        const res = await axios.get("https://dapbackend.onrender.com/api/internships/getbyroll/" + roll);
        setRowdata(res.data);
        // console.log(res.data);
      }
    };
    internships();
  });
  const rows = [];
  for (let i = 0; i < rowsdata.length; i++) {
    rows.push({
      id: i + 1,
      student_name: rowsdata[i].student_name,
      student_div: rowsdata[i].student_div,
      student_branch: rowsdata[i].student_branch,
      company_name: rowsdata[i].company_name,
      start_date: rowsdata[i].start_date,
      end_date: rowsdata[i].end_date,
      rollno: rowsdata[i].student_roll,
      duration: rowsdata[i].duration,
      offer_letter: rowsdata[i].offer_letter,
      letter_of_completion: rowsdata[i].letter_of_completion,
      status: rowsdata[i].status,
      iid: rowsdata[i]._id,
    });
  }
  const [open1, setOpen1] = React.useState(false);
  const [url, setUrl] = useState("");
  const handleClose1 = () => setOpen1(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  // console.log(data);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [rollno, setRollno] = useState(0);
  const [letter, setLetter] = useState("");
  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = url;
        alink.setAttribute("Download", rollno + "_" + letter);
        alink.click();
      });
    });
  };

  const handleOffer = (url, roll) => {
    setUrl(url);
    setRollno(roll);
    setLetter("offer_letter");
    setOpen1(true);
  };
  const handleCompletion = (url, roll) => {
    setUrl(url);
    setRollno(roll);
    setLetter("completion_letter");
    setOpen1(true);
  };
  const [branch, setBranch] = useState("");
  if (branch === "FE") {
    divs = [
      "FE1",
      "FE2",
      "FE3",
      "FE4",
      "FE5",
      "FE6",
      "FE7",
      "FE8",
      "FE9",
      "FE10",
      "FE11",
    ];
  } else if (branch === "CS") {
    divs = [
      "SE1",
      "SE2",
      "SE3",
      "SE4",
      "TE1",
      "TE2",
      "TE3",
      "TE4",
      "BE1",
      "BE2",
      "BE3",
      "BE4",
    ];
  } else if (branch === "IT") {
    divs = [
      "SE9",
      "SE10",
      "SE11",
      "TE9",
      "TE10",
      "TE11",
      "BE9",
      "BE10",
      "BE11",
    ];
  } else if (branch === "ENTC") {
    divs = [
      "SE5",
      "SE6",
      "SE7",
      "SE8",
      "TE5",
      "TE6",
      "TE7",
      "TE8",
      "BE5",
      "BE6",
      "BE7",
      "BE8",
    ];
  }
  return (
    <div>
      <Navbar user={user} />
      <center>
        <h2 style={{ marginTop: "3%" }}>Internship Data</h2>
      </center>
      <div className="t_dashboard">
        <center>
          <div
            className="filters"
            style={{
              display: "flex",
              columnGap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{
                height: "52px",
                width: "200px",
                textAlign: "left",
                border: "1px solid black",
              }}
            >
              <MenuItem value="">
                <em>Branch</em>
              </MenuItem>
              <MenuItem value={"CS"}>CS</MenuItem>
              <MenuItem value={"IT"}>IT</MenuItem>
              <MenuItem value={"ENTC"}>ENTC</MenuItem>
            </Select>
            <Select
              value={div}
              onChange={(e) => setDiv(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{
                height: "52px",
                width: "200px",
                textAlign: "left",
                border: "1px solid black",
              }}
            >
              <MenuItem value="">
                <em>Division</em>
              </MenuItem>
              {}
              {divs.map((d) => (
                <MenuItem value={d}>{d}</MenuItem>
              ))}
            </Select>

            <input
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Enter batch name"
              style={{ border: "1px solid black" }}
            />
            <input
              onChange={(e) => setRoll(e.target.value)}
              placeholder="Enter Roll no"
              style={{ border: "1px solid black" }}
            />
          </div>
        </center>
        {/* <p>
          Filter By<i class="fa-solid fa-filter"></i>
        </p> */}
        {/* <span>Search By</span> */}
        {/* <div className="search_filters">
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
          />

          <Select
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
          </Select>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Branch</em>
            </MenuItem>
            <MenuItem value={"CS"}>CS</MenuItem>
            <MenuItem value={"IT"}>IT</MenuItem>
            <MenuItem value={"ENTC"}>ENTC</MenuItem>
          </Select>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Year</em>
            </MenuItem>
            <MenuItem value={"FE"}>FE</MenuItem>
            <MenuItem value={"SE"}>SE</MenuItem>
            <MenuItem value={"TE"}>TE</MenuItem>
            <MenuItem value={"BE"}>BE</MenuItem>
          </Select>
        </div> */}

        {/* // internship data table */}

        <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Sr No.</TableCell>
                  <TableCell align="left">Student Name</TableCell>
                  <TableCell align="left">Student Div</TableCell>
                  <TableCell align="left">Student Branch</TableCell>
                  <TableCell align="left">Company Name</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">End Date</TableCell>
                  <TableCell align="left">Duration</TableCell>
                  <TableCell align="left">Offer Letter</TableCell>
                  <TableCell align="left">Completion Letter</TableCell>
                  <TableCell align="left">Approval</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.student_name}</TableCell>
                    <TableCell align="left">{row.student_div}</TableCell>
                    <TableCell align="left">{row.student_branch}</TableCell>
                    <TableCell align="left">{row.company_name}</TableCell>
                    <TableCell align="left">
                      {" "}
                      {moment(row.start_date).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      {moment(row.end_date).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell align="left">{row.duration}</TableCell>
                    <TableCell align="left">
                      {" "}
                      <Button
                        onClick={() =>
                          handleOffer(row.offer_letter?.url, row.rollno)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <Button
                        onClick={() =>
                          handleCompletion(
                            row.letter_of_completion?.url,
                            row.rollno
                          )
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <Select
                        value={status}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>{row.status}</em>
                        </MenuItem>
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Approved"}>Approved</MenuItem>
                        <MenuItem value={"Rejected"}>Rejected</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <Button onClick={() => handleUpdateStatus(row.iid)}>
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <center>
            {rows.length === 0 && <h3>Please Select The Fields First</h3>}
          </center>
        </div>
      </div>
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
          <Box className="boxmodal pdfbox">
            {url && <Button onClick={onButtonClick}>Download PDF</Button>}
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              className="pdfdoc"
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div className="change_page_div">
              <p
                onClick={() => setPageNumber(pageNumber - 1)}
                className="direction"
              >
                {"<"}
              </p>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <p
                onClick={() => setPageNumber(pageNumber + 1)}
                className="direction"
              >
                {">"}
              </p>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Student_Internships;
