import { Button } from "@mui/material";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./ExtraCurr.css";
import axios from "axios";
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

function ExtraCurrBoxes({ data, user }) {
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
    setUrl(data.file?.url);
    setOpen1(true);
  };

  const [opend, setOpend] = React.useState(false);

  const handleClickOpend = () => {
    setOpend(true);
  };

  const handleClosed = () => {
    setOpend(false);
  };
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(
        `https://dapbackend.onrender.com/api/extracurricular/deleteactivitiy/${data._id}`
      );
      // window.alert("ExtraCurricular Activity Deleted Successfully");
      setOpend(false);
      setDeleting(false);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      window.alert("Currently Not able to delete the internship data");
    }
  };
  return (
    <div>
      <div className="box">
        <div className="boxtop" style={{ padding: "0" }}>
          <div className="extraactivity ebox" style={{ border: "none" }}>
            <div
              className="personaldetails edetails extracc"
              style={{ paddingInline: "2%" }}
            >
              <div className="efullname">
                <div className="label">Organization : </div>
                <p> &nbsp;{data.organization} </p>
              </div>
              <div className="efullname">
                <div className="label">Role : </div>
                <p> &nbsp;{data.role}</p>
              </div>
              <div className="efullname">
                <div className="label">Start Date: </div>
                <p> &nbsp;{moment(data.start_date).format("YYYY-MM-DD")}</p>
              </div>
              <div className="efullname">
                <div className="label">End Date :</div>
                <p>&nbsp;{moment(data.end_date).format("YYYY-MM-DD")}</p>
              </div>
            </div>
            <div
              className="personaldetails epersonaldetails"
              style={{ paddingInline: "2%" }}
            >
              <p>
                <div style={{ fontWeight: "600" }}>Desc:</div> {data.desc}
              </p>
            </div>
          </div>
        </div>
        <div className="editbtndiv">
          {data.file?.url && (
            <Button
              variant="outlined"
              className="editbtn e1"
              onClick={handleOffer}
            >
              Proof
            </Button>
          )}

          <Button variant="outlined" className="editbtn" onClick={handleClickOpend}>
            Delete{" "}
          </Button>
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
            <Box className="boxmodal pdfbox" >
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
            {"Are You Sure You Want To Delete This Activity ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Organization Name: {data.organization} <br />
              Role: {data.role} <br />
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

export default ExtraCurrBoxes;
