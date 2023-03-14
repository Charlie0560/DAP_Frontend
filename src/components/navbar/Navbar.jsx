import React, { useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../pict_logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/store";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogContent from '@mui/material/DialogContent';
import DialogTitle from "@mui/material/DialogTitle";
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';

function Navbar({user}) {
  const [open, setOpen] = React.useState(false);
  const [user1, setUser] = useState();

  const sednRequest = async () => {
    try {
      const res = await axios
        .get("https://dapbackend.onrender.com/api/students/user", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      console.log(res);
      if (res === undefined) {
        const res = await axios
          .get("https://dapbackend.onrender.com/api/teachers/user", {
            withCredentials: true,
          })
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      }
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    sednRequest().then((data) => setUser(data.user));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post("https://dapbackend.onrender.com/api/students/logout", null, {
      withCredentials: true,
    });
    if (res === undefined) {
      const res = await axios.post("https://dapbackend.onrender.com/api/teachers/logout", null, {
        withCredentials: true,
      });
      if (res.status === 200) {
        return res;
      }
    }
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq()
      .then(() => dispatch(authActions.logout()))
      .then(() => window.location.replace("/login"));
  };
 
  window.onbeforeunload = function(e) {
    window.alert("d")
  };
  
  return (
    <div className="navbar">
      <div className="logoside">
        {!user1 && <>
         <div className="navlogo">
           <img src={logo} alt="" />
         </div>
         <div className="navname">
           <p>Digital Academic Passport</p>
         </div>
        </>
        }
       {user1?.role==="student" &&
        <a href="/dashboard">
        <div className="navlogo">
          <img src={logo} alt="" />
        </div>
        <div className="navname">
          <p>Digital Academic Passport</p>
        </div>
      </a>}
      {user1?.role === "teacher" &&
      <a href="/teachersdashboard">
      <div className="navlogo">
        <img src={logo} alt="" />
      </div>
      <div className="navname">
        <p>Digital Academic Passport</p>
      </div>
    </a>
      }
      </div>
      <div className="navlinks">
        {/* <a href="/dashboard">Home</a> */}
        {/* <a href="/dashboard">Home</a> */}
        {!isLoggedIn && (
          <p onClick={handleClickOpen}>
            <i class="fa-sharp fa-solid fa-right-from-bracket"></i>
          </p>
        )}
      </div>

      <Dialog
        fullScreen={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are You Sure To Logout ?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button autoFocus onClick={handleLogout}>
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Navbar;
