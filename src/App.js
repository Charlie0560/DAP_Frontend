import "./App.css";
import "./index.css";
import StudentDashboard from "./components/Student/StudentDashboard";
import LoginForm from "./components/Auth/LoginForm";
import LoginForm1 from "./components/TeacherAuth/LoginForm";
// import PersonalInfo from './components/Auth/PersonalInfo';

import Form from "./components/Auth/Form";
import Form1 from "./components/TeacherAuth/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AcademicDetails from "./components/AcademicDetails/AcademicDetails";
import StudentInternships from "./components/Teachers/DashBoard_Components/Student_Internships";
import TeachersDashboard from "./components/Teachers/Teachers_Dashboard";
import Studentsdata from "./components/Teachers/DashBoard_Components/Students_data.jsx/Students_data";
import Internship from "./components/Student_Internships/Internship";
import PersonalDetails from "./components/PersonalDetails/Personal_Details";
import PersonalDetails1 from "./components/Teachers/PersonalDetails/PersonalDetails";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PrintProfile from "./components/PrintProfile/PrintProfile";
import Notices from "./components/Notices/Notices";
import GuardianBatch from "./components/Teachers/GuardianBatch/GuardianBatch";
import AmcatDetails from "./components/AmcatDetails/AmcatDetails";
// import {LorForm} from "./components/LOR/LorForm"
import Lor from "./components/LOR/Lor";
import CompExams from "./components/CompetitiveExams/CompExams";
import ExtraCurricular from "./components/ExtraCurricular/ExtraCurr";
import TechnicalActivities from "./components/TechnicalActivities/Tech";

function App() {
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
  useEffect(() => {
    sednRequest().then((data) => setUser(data.user));
  }, []);

  return (
    <div className="App">
      <Router>
        {user?.role === "student" ? (
          <Routes>
            {/* <Route exact path="/" element={<LoginForm />} /> */}
            <Route
              exact
              path="/dashboard"
              element={<StudentDashboard student={user} />}
            />
            <Route exact path="/" element={<StudentDashboard user={user} />} />
            <Route exact path="/signup" element={<Form />} />
            <Route
              exact
              path="/student/Academics"
              element={<AcademicDetails user={user} />}
            />
            <Route
              exact
              path="/student/personaldetails"
              element={<PersonalDetails />}
            />
            <Route
              exact
              path="/student/printprofile"
              element={<PrintProfile user={user} />}
            />
            <Route
              exact
              path="/student/competitive_exams"
              element={<CompExams user={user} />}
            />
            <Route
              exact
              path="/student/extra_curricular"
              element={<ExtraCurricular user={user} />}
            />
            <Route
              exact
              path="/student/technical_activities"
              element={<TechnicalActivities user={user} />}
            />
            <Route
              exact
              path="/student/amcat"
              element={<AmcatDetails user={user} />}
            />
            <Route
              exact
              path="/student/internship"
              element={<Internship user={user} />}
            />
            <Route exact path="/student/LOR" element={<Lor user={user} />} />
            <Route exact path="/notices" element={<Notices user={user} />} />
            <Route
              exact
              path="/printProfile"
              element={<PrintProfile user={user} />}
            />
            {/* <Route exact path="/student/extracurricular" element={<ExtraCurricular />} /> */}
            {/* <Route
              exact
              path="/teachersdashboard"
              element={<TeachersDashboard />}
            />
            <Route
              exact
              path="/teachersdashboard/internship"
              element={<StudentInternships />}
            />
            <Route
              exact
              path="/teachersdashboard/students"
              element={<Studentsdata />}
            /> */}
          </Routes>
        ) : (
          user?.role !== "teacher" && (
            <Routes>
              <Route exact path="/teachers" element={<Form1 />} />
              <Route exact path="/teacherslogin" element={<LoginForm1 />} />
              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/signup" element={<Form />} />
            </Routes>
          )
        )}

        {user?.role === "teacher" ? (
          <Routes>
            {/* <Route exact path="/" element={<LoginForm />} /> */}

            <Route
              exact
              path="/personaldetails"
              element={<PersonalDetails1 user={user} />}
            />
            <Route
              exact
              path="/batches"
              element={<GuardianBatch user={user} />}
            />
            <Route
              exact
              path="/teachersdashboard"
              element={<TeachersDashboard user={user} />}
            />
            <Route
              exact
              path="/teachersdashboard/internship"
              element={<StudentInternships user={user} />}
            />
            <Route
              exact
              path="/teachersdashboard/students"
              element={<Studentsdata user={user} />}
            />
            <Route
              exact
              path="/teachersdashboard/notices"
              element={<Notices user={user} />}
            />
          </Routes>
        ) : (
          user?.role !== "student" && (
            <Routes>
              <Route exact path="/teachers" element={<Form1 />} />
              <Route exact path="/teacherslogin" element={<LoginForm1 />} />
              <Route exact path="/login" element={<LoginForm1 />} />
              <Route exact path="/signup" element={<Form />} />
              {/* <Route exact path="/" element={<LoginForm1 />} /> */}
            </Routes>
          )
        )}
        {!user && (
          <Routes>
            <Route exact path="/" element={<LoginForm />} />
          </Routes>
        )}
        {!user && (
          <Routes>
            <Route exact path="/" element={<LoginForm1 />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
