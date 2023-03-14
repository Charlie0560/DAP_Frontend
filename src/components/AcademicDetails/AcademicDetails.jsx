import React from "react";
import Navbar from "../navbar/Navbar";
import "./academicDetails.css";
import YearDetails from "./YearDetails";

function AcademicDetails({ user }) {
  return (
    <div>
      <Navbar user={user}/>
      <div className="years academic_years">
        <a href="#first">
          <p className="year">FE</p>
        </a>
        <p>|</p>
        <a href="#second">
          <p className="year">SE</p>
        </a>
        <p>|</p>
        <a href="#third">
          <p className="year">TE</p>
        </a>
        <p>|</p>
        <a href="#last">
          <p className="year">BE</p>
        </a>
      </div>
      <div className="first" id="first">
        <YearDetails year="First Year" user={user} sem1marks={user.sem1Sgpa} sem2marks={user.sem2Sgpa}/>
      </div>
      <div className="second" id="second">
        <YearDetails year="Second Year" user={user} sem1marks={user.sem3Sgpa} sem2marks={user.sem4Sgpa}/>
      </div>
      <div className="third" id="third">
        <YearDetails year="Third Year" user={user} sem1marks={user.sem5Sgpa} sem2marks={user.sem6Sgpa}/>
      </div>
      <div className="final" id="last">
        <YearDetails year="Fourth Year" user={user} sem1marks={user.sem7Sgpa} sem2marks={user.sem8Sgpa}/>
      </div>
    </div>
  );
}

export default AcademicDetails;
