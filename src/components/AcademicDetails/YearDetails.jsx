import React, { useState } from "react";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import "./yeardetails.css";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Fade, Modal } from "@mui/material";

function YearDetails({ year, user, sem1marks, sem2marks }) {
  //viewing pdfs
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = useState("");
  const handleOpen = () => {
    if (year === "First Year") {
      setUrl(user.sem1Marksheet?.url);
    }
    if (year === "Second Year") {
      setUrl(user.sem3Marksheet?.url);
    }
    if (year === "Third Year") {
      setUrl(user.sem5Marksheet?.url);
    }
    if (year === "Fourth Year") {
      setUrl(user.sem7Marksheet?.url);
    }
    setOpen(true);
  };
  const handleOpen1 = () => {
    if (year === "First Year") {
      setUrl(user.sem2Marksheet?.url);
    }
    if (year === "Second Year") {
      setUrl(user.sem4Marksheet?.url);
    }
    if (year === "Third Year") {
      setUrl(user.sem6Marksheet?.url);
    }
    if (year === "Fourth Year") {
      setUrl(user.sem8Marksheet?.url);
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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
        alink.setAttribute("Download", user.rollno + "_Marksheet");
        alink.click();
      });
    });
  };

  //files uploading
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFile1, setSelectedFile1] = useState("");
  const [sem1, setSem1] = useState(0);
  const [sem2, setSem2] = useState(0);

  const [sfilename, setFilename] = useState("");
  const [sfilename1, setFilename1] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    setFilename(file.name);
    // console.log(file);x
  };
  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setFileToBase1(file);
    setFilename1(file.name);
  };
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };
  const setFileToBase1 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile1(reader.result);
    };
  };

  const [edit_pesonal, setEdit_personal] = useState(true);
  const [edit_pesonal_value, setEdit_personal_value] = useState("EDIT");

  let total;
  if (sem1marks !== 0 && sem2marks !== 0) {
    total = (parseFloat(sem1marks) + parseFloat(sem2marks)) / 2;
  } else {
    total = (parseFloat(sem1) + parseFloat(sem2)) / 2;
  }
  // let url;

  // console.log(selectedFile?.name);

  // const handleSubmission = () => {};

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
    let data;
    let filedata1;
    let filedata;
    let yearname;
    if (year === "First Year") {
      yearname = "FE";
      data = {
        sem1Sgpa: sem1 !== 0 ? sem1 : sem1marks !== 0 ? sem1marks : 0,
        sem2Sgpa: sem2 !== 0 ? sem2 : sem1marks !== 0 ? sem1marks : 0,
      };
      if (selectedFile) {
        filedata1 = {
          sem1Marksheet: selectedFile,
        };
      }
      if (selectedFile1) {
        filedata = {
          sem2Marksheet: selectedFile1,
        };
      }
    } else if (year === "Second Year") {
      yearname = "SE";
      data = {
        sem3Sgpa: sem1 !== 0 ? sem1 : sem1marks !== 0 ? sem1marks : 0,
        sem4Sgpa: sem2 !== 0 ? sem2 : sem1marks !== 0 ? sem1marks : 0,
      };
      if (selectedFile) {
        filedata1 = {
          sem3Marksheet: selectedFile,
        };
      }
      if (selectedFile1) {
        filedata = {
          sem4Marksheet: selectedFile1,
        };
      }
    } else if (year === "Third Year") {
      yearname = "TE";
      data = {
        sem5Sgpa: sem1 !== 0 ? sem1 : sem1marks !== 0 ? sem1marks : 0,
        sem6Sgpa: sem2 !== 0 ? sem2 : sem1marks !== 0 ? sem1marks : 0,
      };
      if (selectedFile) {
        filedata1 = {
          sem5Marksheet: selectedFile,
        };
      }
      if (selectedFile1) {
        filedata = {
          sem6Marksheet: selectedFile1,
        };
      }
    } else if (year === "Fourth Year") {
      yearname = "BE";
      data = {
        sem7Sgpa: sem1 !== 0 ? sem1 : sem1marks !== 0 ? sem1marks : 0,
        sem8Sgpa: sem2 !== 0 ? sem2 : sem1marks !== 0 ? sem1marks : 0,
      };
      if (selectedFile) {
        filedata1 = {
          sem7Marksheet: selectedFile,
        };
      }
      if (selectedFile1) {
        filedata = {
          sem8Marksheet: selectedFile1,
        };
      }
    }

    try {
      await axios.put(`/api/students/student/profile/update/${user._id}`, data);

      if (selectedFile) {
        await axios.put(
          `/api/students/student/profile/academic_update/sem1/${yearname}/${user._id}`,
          filedata1
        );
      }
      if (selectedFile1) {
        await axios.put(
          `/api/students/student/profile/academic_update/sem2/${yearname}/${user._id}`,
          filedata
        );
      }
      setEdit_personal_value("EDIT");
      setEdit_personal(true);
      window.alert("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      window.alert("Unable to Update The Data");
    }

    console.log(filedata);
  };

  return (
    <div className="yeardetails">
      <div className="details_header">
        <h3>{year}</h3>
        <Button
          onClick={() =>
            edit_pesonal_value === "EDIT" ? handleEditAccess(1) : handleUpdate()
          }
        >
          {edit_pesonal_value}
        </Button>
      </div>
      <div className="yeardetails_form">
        <div className="form_fields">
          <TextField
            id="outlined-basic"
            label="Sem 1 SGPA"
            variant="outlined"
            defaultValue={sem1marks}
            onChange={(e) => setSem1(e.target.value)}
            disabled={edit_pesonal}
          />

          <TextField
            id="outlined-basic"
            label="Sem 2 SGPA"
            variant="outlined"
            defaultValue={sem2marks}
            onChange={(e) => setSem2(e.target.value)}
            disabled={edit_pesonal}
          />
          <TextField
            id="outlined"
            disabled
            label={`Total CGPA: ${total}`}
            variant="outlined"
          />
          <div className="btndiv">
            <Button onClick={handleOpen}>View Sem1 Marksheet</Button>
            <Button onClick={handleOpen1}>View Sem2 Marksheet</Button>
            <Button
              id="outlined-btn"
              variant="contained"
              component="label"
              size="small"
              disabled={edit_pesonal}
            >
              <div className="uploadmarksheet">
                <i class="fa-solid fa-upload"></i>
                Sem 1 Marksheet
              </div>
              <input
                hidden
                accept=".pdf"
                multiple
                type="file"
                onChange={handleImage}
              />
              <span style={{ fontSize: "10px", color: "orange" }}>
                {sfilename}
              </span>
            </Button>
            <Button
              id="outlined-btn"
              variant="contained"
              component="label"
              size="small"
              disabled={edit_pesonal}
            >
              <div className="uploadmarksheet">
                <i class="fa-solid fa-upload"></i>
                Sem 2 Marksheet
              </div>
              <input
                hidden
                accept=".pdf"
                multiple
                type="file"
                onChange={handleImage1}
              />
              <br />
              <span style={{ fontSize: "10px", color: "orange" }}>
                {sfilename1}
              </span>
            </Button>

            {/* <Button
              id="outlined-btn"
              variant="contained"
              component="label"
              size="small"
            >
              Save
            </Button> */}
          </div>
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

export default YearDetails;
