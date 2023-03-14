import { Button } from "@mui/material";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import FormInput from "./FormInput";
import "./internship.css";
import axios from "axios";
import DateInput from "./DateInput";
import moment from "moment-timezone";
import { Document, Page, pdfjs } from "react-pdf";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Internship_Boxes({ data, user }) {
  const [selectedFile, setSelectedFile] = useState("");
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

  const handleOffer = () => {
    setUrl(data.offer_letter?.url);
    setOpen1(true);
  };
  const handleCompletion = () => {
    setUrl(data.letter_of_complition?.url);
    setOpen1(true);
  };
  const [company_name, setCompany_name] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [duration, setDuration] = useState("");
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");
  const [stipend, setStipend] = useState(0);

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

  const [opend, setOpend] = React.useState(false);

  const handleClickOpend = () => {
    setOpend(true);
  };

  const handleClosed = () => {
    setOpend(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const[updating,setUpdating] = useState(false);
  const handleUpdateInternship = async (e) => {
    setUpdating(true);
    const datas = {
      letter_of_complition: selectedFile,
      student_id: user._id,
    };
    const form_data = {
      company_name:
        company_name !== ""
          ? company_name
          : data.company_name
          ? data.company_name
          : "",
      start_date:
        start_date !== "" ? start_date : data.start_date ? data.start_date : "",
      end_date: end_date !== "" ? end_date : data.end_date ? data.end_date : "",
      duration: duration !== "" ? duration : data.duration ? data.duration : "",
      role: role !== "" ? role : data.role ? data.role : "",
      desc: desc !== "" ? desc : data.desc ? data.desc : "",
      stipend: stipend !== "" ? stipend : data.stipend ? data.stipend : "",
    };

    try {
      await axios.put(
        `https://dapbackend.onrender.com/api/internships/updateInternshipInfo/${data._id}`,
        form_data
      );
      if (selectedFile) {
        await axios.put(`https://dapbackend.onrender.com/api/internships/updateInternship/${data._id}`, datas);
      }
      console.log(form_data);
      setUpdating(false);
      window.alert("Internship Data Updated Successfully");
      // window.location.reload();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    // console.log(selectedFile);
  };

  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(
        `https://dapbackend.onrender.com/api/internships/deleteInternship/${user._id}/${data._id}`
      );
      setOpend(false);
      setDeleting(false);
      // window.alert("Internship Details Deleted Successfully");
      // window.location.reload();
    } catch (err) {
      console.log(err);
      window.alert("Currently Not able to delete the internship data");
    }
  };
  return (
    <div>
      <div className="box">
        <div className="boxtop">
          <p className="company_name">{data.company_name}</p>
          <p className="duration_date">
            {moment(data.start_date).format("YYYY-MM-DD")} to{" "}
            {moment(data.end_date).format("YYYY-MM-DD")}
            {/* {starting_date.getFullYear()+'-' + (starting_date.getMonth()+1) + '-'+starting_date.getDate()} */}
          </p>
        </div>
        <br />
        <div className="box_desc">
          <p>
            <b>Role: </b> {data.role}
          </p>
          {data.status === "Pending" && (
            <p style={{ color: "Orange" }}>
              <b>Status: </b> {data.status}
            </p>
          )}
          {data.status === "Approved" && (
            <p style={{ color: "Green" }}>
              <b>Status: </b> {data.status}
            </p>
          )}
          {data.status === "Rejected" && (
            <p style={{ color: "Red" }}>
              <b>Status: </b> {data.status}
            </p>
          )}
          <p>
            <b>Stipend: </b> {data.stipend}
          </p>
          <b>Duration: </b> {data.duration}
          <p>
            <b>Description: </b>
            {data.desc}
          </p>
        </div>
        <div className="editbtndiv">
          {data.offer_letter?.url && (
            <Button
              variant="outlined"
              className="editbtn e1"
              onClick={handleOffer}
            >
              Offer Letter
            </Button>
          )}
          {data.letter_of_complition?.url && (
            <Button
              variant="outlined"
              className="editbtn e1"
              onClick={handleCompletion}
            >
              Complition Letter{" "}
            </Button>
          )}
          <Button variant="outlined" className="editbtn" onClick={handleOpen}>
            Edit{" "}
          </Button>
          <Button
            variant="outlined"
            className="editbtn"
            onClick={handleClickOpend}
          >
            Delete{" "}
          </Button>
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
            <Box className="boxmodal">
              <center>
                <h2>Edit Internship details</h2>
                <FormInput
                  name="Company Name"
                  placeholder="Enter Company name"
                  defaultValue={data.company_name}
                  // disabled
                  onChange={(e) => setCompany_name(e.target.value)}
                  maxlength={20}
                />

                <FormInput
                  name="Duration"
                  placeholder="Duration"
                  defaultValue={data.duration}
                  // disabled
                  onChange={(e) => setDuration(e.target.value)}
                  maxlength={20}
                />
                <FormInput
                  name="Role"
                  placeholder="Role"
                  defaultValue={data.role}
                  // disabled
                  onChange={(e) => setRole(e.target.value)}
                  maxlength={20}
                />
                <FormInput
                  name="Stipend"
                  placeholder="Stipend"
                  defaultValue={data.stipend}
                  // disabled
                  onChange={(e) => setStipend(e.target.value)}
                />
                <FormInput
                  name="Description"
                  placeholder="Description"
                  defaultValue={data.desc}
                  // disabled
                  onChange={(e) => setDesc(e.target.value)}
                  maxlength={300}
                />
                <center>
                  <DateInput
                    name="Start Date"
                    placeholder="Start Date"
                    label="Start Date"
                    value={
                      start_date === ""
                        ? moment(data.start_date).format("YYYY-MM-DD")
                        : start_date
                    }
                    onChange={(e) => setStart_date(e.target.value)}
                  />
                  <DateInput
                    name="Start Date"
                    placeholder="End Date"
                    label="End Date"
                    value={
                      end_date === ""
                        ? moment(data.end_date).format("YYYY-MM-DD")
                        : end_date
                    }
                    onChange={(e) => setEnd_date(e.target.value)}
                  />
                </center>
                <div className="intern1">
                  <Button
                    id="outlined-btn"
                    variant="contained"
                    component="label"
                    size="small"
                  >
                    <div className="uploadmarksheet">
                      <i class="fa-solid fa-upload"></i>
                      Completion Letter
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
                  style={{
                    fontSize: "12px",
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {sfilename}
                </span>
                <div className="submitbtndiv">
                  {updating? "Updating..." :<Button
                    className="internsubtn"
                    onClick={handleUpdateInternship}
                  >
                    Update
                  </Button>}
                </div>
              </center>
            </Box>
          </Fade>
        </Modal>
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
        <Dialog
          open={opend}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClosed}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Are You Sure You Want To Delete This Internship Data ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Company Name: {data.company_name} <br />
              Role: {data.role} <br />
              Duration: {data.duration} <br />
              Stipend: {data.stipend} <br />
              Status: {data.status} <br />
              Start Date: {moment(data.start_date).format("YYYY-MM-DD")} <br />
              End Date: {moment(data.end_date).format("YYYY-MM-DD")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {deleting ? (
              "Deleting..."
            ) : (
              <Button onClick={handleDelete}>Yes</Button>
            )}
            <Button onClick={handleClosed}>No</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Internship_Boxes;
