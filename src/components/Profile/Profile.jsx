import React, { useEffect, useState } from "react";
import "./profile.css";
import defaultimg from "./default_userimg.png";
import axios from "axios";
import moment from "moment-timezone";
import Skeleton from '@mui/material/Skeleton';
axios.defaults.withCredentials = true;
// let firstRender = true;
function Profile() {
  const [user, setUser] = useState();

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

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    sednRequest().then((data) => setUser(data.user));
    setLoading(false);
  }, []);

  // console.log(user);
  return (
    <div className="profile">
      <div className="img_div">
        <div className="profileimg">
          {user?.profile ? (
            <img src={user?.profile.url} alt="Default Img" />
          ) : (
            <img src={defaultimg} alt="Default Img" />
          )}
        </div>
      </div>
      <div className="short_details">
        {!user ? (
          <div style={{marginTop: "10px"}}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <>
            <p>
              <div className="name_student">{user?.fullname}</div>{" "}
              {user?.collegeId} <br />
              <b>Mobile no.</b>
              {user?.mobile_no}
            </p>
            {/* <br /> */}
            <p>
              <b>DOB</b> : {user && moment(user?.DOB).format("YYYY-MM-DD")}{" "}
              <br />
              <b>Gender</b>: {user?.gender} <br />
              <b>Category</b>: {user?.category} <br />
              <b>PAN</b> : {user?.pan}
            </p>
            {/* <br /> */}
            <p>
              <b>College</b> <br /> SCTR's Pune Institute of Computer Technology
              , Dhankawadi , Pune
            </p>
            {/* <br /> */}
            <p>
              <b>Current</b> <br /> {user?.temporary_address}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
