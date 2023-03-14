import { Box, Button, Fade, Modal } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import FormInput from "../Student_Internships/FormInput";
import Backdrop from "@mui/material/Backdrop";
import { Document, Page, pdfjs } from "react-pdf";

function Tenth_Twelth({ user }) {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = useState("");
  // var url = user.tenth_marksheet?.url;
  const handleOpen = () => {
    setUrl(user.tenth_marksheet?.url);
    setOpen(true);
  };
  const handleOpen1 = () => {
    setUrl(user.twelth_marksheet?.url);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    // setPageNumber(numPages);
  }

  // const url = user.tenth_marksheet?.url;
  // console.log(url);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [edit_pesonal, setEdit_personal] = useState(true);
  const [edit_pesonal_value, setEdit_personal_value] = useState("EDIT");

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFile1, setSelectedFile1] = useState("");
  const [tenth_p_c, setTenth_p_c] = useState("");
  const [twelth_p_c, setTwelth_p_c] = useState("");

  const [sfilename, setFilename] = useState("");
  const [sfilename1, setFilename1] = useState("");
  // const handleUpdate_Personal = () => {
  //   window.alert("Parents Details Updated Successfully");
  //   setEdit_personal_value("EDIT");
  //   setEdit_personal(true);
  // };

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
    // console.log(file);
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

  // const [selectedFile, setSelectedFile] = useState();
  // const [selectedFile2, setSelectedFile2] = useState();
  // let url;
  // function changeHandler(event) {
  //   setSelectedFile(event.target.files[0]);
  // }
  // function changeHandler2(event) {
  //   setSelectedFile2(event.target.files[0]);
  // }

  const handleUpdate_Personal = async (e) => {
    const data_t = {
      tenth_marksheet: selectedFile,
    };
    const data_tw = {
      twelth_marksheet: selectedFile1,
    };
    const data_t_tw = {
      tenth_p_c:
        tenth_p_c !== "" ? tenth_p_c : user.tenth_p_c ? user.tenth_p_c : "",
      twelth_p_c:
        twelth_p_c !== "" ? twelth_p_c : user.twelth_p_c ? user.twelth_p_c : "",
    };
    // if (!selectedFile || !selectedFile1 ) {
    //   window.alert("All the fields are required");
    //   return;
    // }
    try {
      await axios.put(
        `https://dapbackend.onrender.com/api/students/student/profile/update/${user._id}`,
        data_t_tw
      );
      if (selectedFile) {
        await axios.put(
          `https://dapbackend.onrender.com/api/students/student/profile/update_t_marks/${user._id}`,
          data_t
        );
      }
      if (selectedFile1) {
        await axios.put(
          `https://dapbackend.onrender.com/api/students/student/profile/update_tw_marks/${user._id}`,
          data_tw
        );
      }
      setEdit_personal_value("EDIT");
      setEdit_personal(true);
      window.alert("Profile Updated Successfully");
      // console.log(datas);
    } catch (err) {
      console.log(err);
      window.alert("Unable to Update The Data");
    }
  };

  //download pdfs

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
  return (
    <div>
      <div className="student_details">
        <div className="details_header">
          <h3>10th,12th Details</h3>
          <Button
            onClick={() =>
              edit_pesonal_value === "EDIT"
                ? handleEditAccess(1)
                : handleUpdate_Personal()
            }
          >
            {edit_pesonal_value}
          </Button>
        </div>
        <div className="parents_details details_section tenth_details">
          <FormInput
            label="10th Percentage/CGPA"
            name="tenth_p_c"
            placeholder="10th Percentage/CGPA"
            defaultValue={user.tenth_p_c}
            onChange={(e) => setTenth_p_c(e.target.value)}
            disabled={edit_pesonal}
          />
          <div className="tenth_twelth_marksheet">
            <Button
              id="outlined-btn"
              variant="contained"
              component="label"
              size="small"
              disabled={edit_pesonal}
            >
              <div className="uploadmarksheet">
                <i class="fa-solid fa-upload"></i>
                10th Marksheet
              </div>
              <input
                hidden
                accept=".pdf"
                multiple
                type="file"
                onChange={handleImage}
              />
              <br />
              <span style={{ fontSize: "10px", color: "orange" }}>
                {sfilename}
              </span>
            </Button>
            <Button onClick={handleOpen}>View</Button>
          </div>
          <FormInput
            label="12th Percentage/CGPA"
            name="twelth_p_c"
            placeholder="12th Percentage/CGPA"
            defaultValue={user.twelth_p_c}
            onChange={(e) => setTwelth_p_c(e.target.value)}
            disabled={edit_pesonal}
          />
          <div className="tenth_twelth_marksheet">
            <Button
              id="outlined-btn"
              variant="contained"
              component="label"
              size="small"
              disabled={edit_pesonal}
            >
              <div className="uploadmarksheet">
                <i class="fa-solid fa-upload"></i>
                12th Marksheet
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
            <Button onClick={handleOpen1}>View</Button>
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
            <Button onClick={onButtonClick}>Download PDF</Button>
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

export default Tenth_Twelth;
