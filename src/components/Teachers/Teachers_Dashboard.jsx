import React from "react";
import Boxes from "../Boxes/Boxes";
import Navbar from "../navbar/Navbar";
import Profile from "../Profile/Profile";

function Teachers_Dashboard({user}) {

  const student_box_contents = [
    { title: "Personal Details", url: "/personaldetails" },
    { title: "Internship data", url: "/teachersdashboard/internship" },
    { title: "Students data", url: "/teachersdashboard/students" },
    { title: "Guardian Batch", url: "/batches" },
    { title: "Notices", url: "/teachersdashboard/notices" },
  ];
  return (
    <div>
      <Navbar user={user}/>

      <div className="student_dashboard">
        <div className="profile_div">
          <Profile user={user}/>
        </div>
        <div className="student_dashboard_contents">
          <div className="years">
            {/* <p>SE</p>
      <p>|</p>
      <p>TE</p>
      <p>|</p>
      <p>BE</p> */}
          </div>
          <div className="boxes_div">
            {student_box_contents.map((s) => (
              <Boxes title={s.title} url={s.url} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teachers_Dashboard;
