import { Button } from "@mui/material";
import React from "react";
import Navbar from "../navbar/Navbar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./notices.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Document, Page, pdfjs } from "react-pdf";
import moment from "moment-timezone";

import { useEffect } from "react";

function Notices({ user }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [open, setOpen] = React.useState(false);
  const [heading, setHeading] = React.useState("");
  const [desc, setDesc] = useState("");
  const [forw, setForw] = useState("");
  const [important, setImportant] = useState(false);
  const [sfilename, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [open1, setOpen1] = React.useState(false);

  const handleClose1 = () => setOpen1(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const [adding, setAdding] = useState(false);
  const handleaddNotice = async () => {
    setAdding(true);
    const data = {
      heading,
      desc,
      forw,
      important,
      teacher_id: user?._id,
      notice_by: user?.fullname,
    };
    if (selectedFile) {
      data.file = selectedFile;
    }
    if (!heading || !desc || !forw) {
      window.alert("All the Fields are required");
      setAdding(false);

      return;
    }
    try {
      if (selectedFile) {
        await axios.post("https://dapbackend.onrender.com/api/notices/newNoticefile", data);
        setAdding(false);
      } else {
        await axios.post("https://dapbackend.onrender.com/api/notices/newNotice", data);
        setAdding(false);
      }
      setOpen(false);
      // console.log(data);
    } catch (err) {
      console.log(err);
      window.alert("Unable To Add a Notice");
      setAdding(false);
    }
  };
  const [notices, setNotices] = useState([]);
  const [bnotices, setBNotices] = useState([]);
  const [allnotices, setAllNotices] = useState([]);
  const [batches, setBatches] = useState([]);
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        if (user.role === "student") {
          const res = await axios.get("https://dapbackend.onrender.com/api/notices/getbyforw/" + user?.branch);
          const resb = await axios.get("https://dapbackend.onrender.com/api/notices/getbyforw/" + user?.batch);
          const resall = await axios.get("https://dapbackend.onrender.com/api/notices/getbyforw/All");          setBNotices(resb.data);
          setAllNotices(resall.data);
          setNotices(res.data);
          // console.log(resb.data);
        } else if (user.role === "teacher") {
          const res = await axios.get(
            "https://dapbackend.onrender.com/api/notices/getallTeacherNotices/" + user?._id
          );
          setNotices(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchBatches = async () => {
      try {
        const res = await axios.get(
          "https://dapbackend.onrender.com/api/batches/getbatches/" + user.collegeId
        );
        setBatches(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotices();
    fetchBatches();
  });
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      console.log(id);
      await axios.delete("https://dapbackend.onrender.com/api/notices/deleteNotice/" + id);
      setDeleting(false);
    } catch (err) {
      console.log(err);
      window.alert("Unable To Delete The Notice");
      setDeleting(false);
    }
  };
  const handleFile = (n) => {
    console.log(n.file.url);
    setNurl(n.file.url);
    setOpen1(true);
  };
  const [nurl, setNurl] = useState("");

  const handleAddView = async (nid, uid) => {
    const data = { uid };

    try {
      await axios.put(`https://dapbackend.onrender.com/api/notices/addview/${nid}`, data);
      console.log(data.views);
      // window.alert("Done");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar user={user} />

      <div className="studentInternshipDashboard">
        <div className="dataheader" style={{ paddingInline: "1%" }}>
          <p className="internship_data_header">Notices</p>
          {user?.role === "teacher" && (
            <Button variant="contained" onClick={handleOpen}>
              Add{" "}
            </Button>
          )}
        </div>
      </div>

      <div className="noticebody">
        <div className="noticediv">
          {notices.map((n) => (
            <div className="notices">
              <Card
                variant="outlined"
                className="cardstyle"
                style={{
                  overflowY: "scroll",
                  borderRadius: "15px 50px 30px",
                  backgroundColor: "whitesmoke",
                  scrollbarWidth: "5px",
                }}
              >
                <React.Fragment>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {n.forw} &nbsp;
                      {moment(n.createdAt).format("DD-MM-YYYY")}
                      {n.important && (
                        <small className="imp">Important !</small>
                      )}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {n.heading}
                    </Typography>

                    <Typography
                      variant="body2"
                      style={{ whiteSpace: "break-spaces" }}
                    >
                      {n.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {n.teacher_id === user?._id && (
                      <Button size="small" onClick={() => handleDelete(n._id)}>
                        Delete
                      </Button>
                    )}
                    {n.file?.url && (
                      <Button size="small" onClick={() => handleFile(n)}>
                        File
                      </Button>
                    )}
                    <p style={{marginLeft: "auto"}}><i class="fa-solid fa-eye"></i> {n.views.length}</p>
                  </CardActions>
                </React.Fragment>
              </Card>
            </div>
          ))}
          {bnotices.map((n) => (
            <div className="notices">
              <Card
                variant="outlined"
                className="cardstyle cstyle"
                style={{
                  overflowY: "scroll",
                  borderRadius: "15px 50px 30px",
                  backgroundColor: "whitesmoke",
                }}
              >
                <React.Fragment>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {n.forw} &nbsp;
                      {moment(n.createdAt).format("YYYY-MM-DD")}
                      {n.important && (
                        <small className="imp">Important !</small>
                      )}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {n.heading}
                    </Typography>

                    <Typography
                      variant="body2"
                      style={{ whiteSpace: "break-spaces" }}
                    >
                      {n.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {n.teacher_id === user?._id && (
                      <Button size="small" onClick={() => handleDelete(n._id)}>
                        Delete
                      </Button>
                    )}
                    {n.file?.url && (
                      <Button size="small" onClick={() => handleFile(n)}>
                        File
                      </Button>
                    )}
                    <Button
                      size="small"
                      onClick={() => handleAddView(n._id, user._id)}
                    >
                      Mark As Read
                    </Button>
                    <p style={{marginLeft: "auto"}}><i class="fa-solid fa-eye"></i> {n.views.length()}</p>
                  </CardActions>
                </React.Fragment>
              </Card>
            </div>
          ))}
          {allnotices.map((n) => (
            <div className="notices">
              <Card
                variant="outlined"
                className="cardstyle cstyle"
                style={{
                  overflowY: "scroll",
                  borderRadius: "15px 50px 30px",
                  backgroundColor: "whitesmoke",
                }}
              >
                <React.Fragment>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {n.forw} &nbsp;
                      {moment(n.createdAt).format("YYYY-MM-DD")}
                      {n.important && (
                        <small className="imp">Important !</small>
                      )}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {n.heading}
                    </Typography>

                    <Typography
                      variant="body2"
                      style={{ whiteSpace: "break-spaces" }}
                    >
                      {n.desc}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {n.teacher_id === user?._id &&
                      (deleting ? (
                        "Deleting..."
                      ) : (
                        <Button
                          size="small"
                          onClick={() => handleDelete(n._id)}
                        >
                          Delete
                        </Button>
                      ))}
                    {n.file?.url && (
                      <Button size="small" onClick={() => handleFile(n)}>
                        File
                      </Button>
                    )}
                    {!n.views.includes(user._id) && (
                      <Button
                        size="small"
                        onClick={() => handleAddView(n._id, user._id)}
                      >
                        Mark As Read
                      </Button>
                    )}
                    <p style={{marginLeft: "auto"}}><i class="fa-solid fa-eye"></i> {n.views.length}</p>
                  </CardActions>
                </React.Fragment>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Modal
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box className="boxmodal noticeboxmodal">
            <center>
              <h2>Add a Notice</h2>
              <input
                type="text"
                placeholder="Heading"
                className="noticeinput"
                onChange={(e) => setHeading(e.target.value)}
              />
              <Select
                value={forw}
                onChange={(e) => setForw(e.target.value)}
                className="select"
                displayEmpty
                style={{
                  fontSize: "14px",
                  color: "grey",
                  width: "100%",
                  marginBottom: "9px",
                  backgroundColor: "white",
                  height: "53px",
                  marginTop: "9px",
                  fontStyle: "none",
                  textAlign: "left",
                }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  To
                </MenuItem>
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"CS"}>CS</MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"ENTC"}>ENTC</MenuItem>
                {batches.map((b) => (
                  <MenuItem value={b.batch_name}>
                    {b.batch_name} (Guardian Batch)
                  </MenuItem>
                ))}
              </Select>
              <div className="desc">
                <label htmlFor="">Description</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
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
                    Add File
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
              <div className="checkbox">
                <input type="checkbox" onChange={() => setImportant(true)} />{" "}
                Marks as Important (optional)
              </div>
              <div className="submitbtndiv">
                {adding ? (
                  "Processing"
                ) : (
                  <Button className="internsubtn" onClick={handleaddNotice}>
                    Submit
                  </Button>
                )}
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
            <Document
              file={nurl}
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

export default Notices;
