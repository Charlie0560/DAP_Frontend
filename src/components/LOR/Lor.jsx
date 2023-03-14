import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import LorForm from "./LorForm";
import "./lorapplication.css";
import LorCard from "./LorCard";
import axios from "axios";
import "./lorcards.css";

function Lor({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchactivites = async () => {
      try {
        const res = await axios.get("https://dapbackend.onrender.com/api/LOR/getbysid/" + user._id);
        setDatas(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchactivites();
  });
  return (
    <>
      <Navbar user={user} />
      <div className="studentInternshipDashboard">
        <div className="dataheader">
          <p className="internship_data_header">Letter of Recommandation</p>
          <Button variant="contained" onClick={handleOpen}>
            Add{" "}
          </Button>
        </div>
      </div>
        <h2>Pending</h2>
      <div className="lorcards">
        {datas.map((data) => (
          data.status==="Pending" &&
          <LorCard data={data} />
        ))}
        
      </div>
      <br/>
      <br/>
      <br/>
      <h2>Approved</h2>
      <div className="lorcards">
        {datas.map((data) => (
          data.status==="Approved" &&
          <LorCard data={data} />
        ))}
        
      </div>
      {/* <LorBox /> */}
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
          <Box className="boxmodal lorapplication">
            <LorForm user={user} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Lor;
