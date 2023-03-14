import React, { useEffect, useState } from "react";
import "./printprofile.css";
import moment from "moment-timezone";
import axios from "axios";
import collegeimg from "../../pict_logo4.jpg";

function PrintProfile({ user }) {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get(
          `https://dapbackend.onrender.com/api/internships/getallStudentInternships/${user._id}`
        );
        setDatas(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInternships();
  });

  const [extracdatas, setextracDatas] = useState([]);

  useEffect(() => {
    const fetchactivites = async () => {
      try {
        const res = await axios.get(
          "https://dapbackend.onrender.com/api/extracurricular/getbysidd/" + user._id
        );
        setextracDatas(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchactivites();
  });
  const [compexams, setCompExams] = useState([]);

  useEffect(() => {
    const fetchactivites = async () => {
      try {
        const res = await axios.get("https://dapbackend.onrender.com/api/compexams/getbysid/" + user._id);

        setCompExams(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchactivites();
  });

  const [amcat, setAmcat] = useState([]);
  useEffect(() => {
    const fetchAmcatData = async () => {
      try {
        const res = await axios.get(`https://dapbackend.onrender.com/api/amcat/getbysid/${user._id}`);
        setAmcat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAmcatData();
  });

  return (
    <div
      className="printprofilepage"
      onPointerMove={async() => (
        await window.print(), setInterval(window.location.replace("/dashboard"))
      )}
    >
      <br />

      <div className="headerprofile">
        <img src={collegeimg} alt="" />
        <div className="headertext">
          <p>Society for Computer Technology and Research's</p>
          <h2>Pune Institute of Computer Technology</h2>
          <p>AFFILIATED TO SPPU | AICTE APPROVED | ISO 9001:2015</p>
        </div>
      </div>
      <center>
        <hr style={{ width: "50%" }} />
      </center>
      <div className="headingline">
        <h2>Digital Academic Passport</h2>
      </div>
      <br />

      <div className="printpage page1">
        <small
          style={{ right: "0", position: "absolute", marginRight: "20px" }}
        >
          Page 1
        </small>
        <div className="headdiv">Personal Details</div>
        {/* <hr /> */}
        <div className="personaldetailsp">
          <div className="imgdiv">
            <div className="pimg">
              <img src={user.profile.url} alt="" />
            </div>
          </div>
          <div className="pdetailsdiv">
            <div className="pt1">
              <div className="fullname">
                <div className="label">Full Name</div>
                <p>{user.fullname}</p>
                <div className="label">Mail ID</div>
                <p>{user.mail}</p>
              </div>
              <div className="fullname">
                <div className="label">ABC ID</div>
                <p>{user.abcID}</p>
                <div className="label">College ID</div>
                <p>{user.collegeId}</p>
              </div>
            </div>

            <div className="pt1">
              <div className="fullname">
                <div className="label">Gender </div>
                <p>{user.gender}</p>
                <div className="label">Aadhar no</div>
                <p>{user.aadhar}</p>
              </div>
              <div className="fullname">
                <div className="label">Category</div>
                <p>{user.category}</p>
                <div className="label">PAN no</div>
                <p>{user.pan}</p>
              </div>
              <div className="fullname">
                <div className="label">Blood Group</div>
                <p>{user.blood_grp}</p>
                <div className="label">DOB</div>
                <p>{user && moment(user.DOB).format("YYYY-MM-DD")}</p>
              </div>
              <div className="fullname">
                <div className="label">PWD</div>
                <p>{user.PWD}</p>
                <div className="label">Mobile no</div>
                <p>{user.mobile_no}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <hr /> */}
        <div className="headdiv">Academic Details</div>
        <div className="personaldetailsp">
          <div className="fullname">
            <div className="label">10th : </div>
            <p>{user.tenth_p_c} %</p>
            <div className="label">12th : </div>
            <p>{user.twelth_p_c} %</p>
          </div>
          <div className="fullname">
            <div className="label">Sem 1 : </div>
            <p>{user.sem1Sgpa > 0 ? user.sem1Sgpa : "-"} sgpa</p>
            <div className="label">Sem 2 : </div>
            <p>{user.sem2Sgpa > 0 ? user.sem2Sgpa : "-"} sgpa</p>
          </div>
          <div className="fullname">
            <div className="label">Sem 3 : </div>
            <p>{user.sem3Sgpa > 0 ? user.sem3Sgpa : "-"} sgpa</p>
            <div className="label">Sem 4 : </div>
            <p>{user.sem4Sgpa > 0 ? user.sem4Sgpa : "-"} sgpa</p>
          </div>
          <div className="fullname">
            <div className="label">Sem 5 : </div>
            <p>{user.sem5Sgpa > 0 ? user.sem5Sgpa : "-"} sgpa</p>
            <div className="label">Sem 6 : </div>
            <p>{user.sem6Sgpa > 0 ? user.sem6Sgpa : "-"} sgpa</p>
          </div>
          <div className="fullname">
            <div className="label">Sem 7 : </div>
            <p>{user.sem7Sgpa > 0 ? user.sem7Sgpa : "-"} sgpa</p>
            <div className="label">Sem 8 : </div>
            <p>{user.sem8Sgpa > 0 ? user.sem8Sgpa : "-"} sgpa</p>
          </div>
        </div>
        {/* <hr /> */}
        <div className="headdiv">Parent Details </div>
        <div className="personaldetailsp">
          <div className="fullname">
            <div className="label">Father's Name : </div>
            <p>{user.father_name} </p>
            <div className="label">Mother's Name : </div>
            <p>{user.mother_name} </p>
          </div>
          <div className="fullname">
            <div className="label">Occupation : </div>
            <p>{user.father_occupation} </p>

            <div className="label">Occupation : </div>
            <p>{user.mother_occupation} </p>
          </div>
          <div className="fullname">
            <div className="label">Mail : </div>
            <p>{user.father_mail || "-"} </p>
            <div className="label">Mail : </div>
            <p>{user?.mother_mail || "-"} </p>
          </div>
          <div className="fullname">
            <div className="label">Contact : </div>
            <p>{user?.father_contact || "-"} </p>
            <div className="label">Contact : </div>
            <p>{user?.mother_contact || "-"} </p>
          </div>
        </div>
        <div className="headdiv">Address Details </div>
        <div
          className="personaldetailsp"
          style={{ justifyContent: "flex-start" }}
        >
          <div className="fullname">
            <div className="label">Permanant Address : </div>
            <p>{user.permenant_Address}</p>
            <div className="label">Local Address : </div>
            <p>{user.temporary_address}</p>
          </div>
        </div>
      </div>
      <div
        className="printpage2 page2 "
        style={{ backgroundColor: "whiesmoke" }}
      >
        <small
          style={{ right: "0", position: "absolute", marginRight: "20px" }}
        >
          Page 2
        </small>
        <div className="headdiv page2section">Internships </div>
        <div className="personaldetailsp interndetails">
          {datas.map((d) => (
            <div className="interndiv">
              <div className="internshipb">
                <div className="label">Company Name : {d.company_name} </div>
                <div className="label">
                  Start Date : {moment(d.start_date).format("YYYY-MM-DD")} to{" "}
                  {moment(d.end_date).format("YYYY-MM-DD")}{" "}
                </div>
              </div>
              <div className="label">Role : {d.role} </div>
              <div className="label">Status : {d.status} </div>
              <div className="label">Stipend : {d.stipend} </div>
              <div className="label">Duration : {d.duration} </div>
              <div className="label">Description : {d.desc} </div>
            </div>
          ))}
        </div>

        <div className="headdiv">Extra Curricular</div>
        {extracdatas.map((data) => (
          <div className="extraactivity">
            <div className="personaldetailsp edetails">
              <div className="efullname">
                <div className="label">Organization : </div>
                <p>{data.organization} </p>
              </div>
              <div className="efullname">
                <div className="label">Role : </div>
                <p>{data.role}</p>
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
            <div className="personaldetailsp epersonaldetails">
              <p>
                <div style={{ fontWeight: "600" }}>Desc:</div> {data.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="page1">
      <small
          style={{ right: "0", position: "absolute", marginRight: "20px" }}
        >
          Page 3
        </small>
        <div className="headdiv ">Technical Acitivities</div>

        <div className="extraactivity">
          <div className="personaldetailsp edetails">
            <div className="efullname">
              <div className="label">Club Name : </div>
              <p>{user.tenth_p_c} %</p>
            </div>
            <div className="efullname">
              <div className="label">Event Name : </div>
              <p>{user.sem1Sgpa > 0 ? user.sem1Sgpa : "-"} sgpa</p>
            </div>
            <div className="efullname">
              <div className="label">Start Date: </div>
              <p>{user.sem3Sgpa > 0 ? user.sem3Sgpa : "-"} sgpa</p>
            </div>
            <div className="efullname">
              <div className="label">End Date :</div>
              <p>{user.sem5Sgpa > 0 ? user.sem5Sgpa : "-"} sgpa</p>
            </div>
          </div>
          <div className="personaldetailsp epersonaldetails">
            <p>
              <div style={{ fontWeight: "600" }}>Desc:</div> Lorem ipsum dolor,
              sit amet consectetur adipisicing elit. Harum unde pariatur sed,
              iure, iusto quidem est sint quos molestias autem magnam enim
              maxime veritatis laborum? Eum dolorem, possimus molestiae numquam
              architecto quia nostrum aliquid. Totam fugit dolorum hic deserunt
              illum!
            </p>
          </div>
        </div>

        <div className="headdiv">Comp Exams</div>
        <div className="personaldetailsp amcatdetails">
          {compexams.map((comp) => (
            <div className="compexambox">
              <div className="fullname">
                <div className="label" style={{ display: "flex" }}>
                  Exam Name : &nbsp;{" "}
                  <p style={{ fontWeight: "400" }}>{comp.exam} </p>
                </div>

                <div className="label" style={{ display: "flex" }}>
                  Exam Date : &nbsp;{" "}
                  <p style={{ fontWeight: "400" }}>
                    {moment(comp.date).format("YYYY-MM-DD")}{" "}
                  </p>
                </div>

                <div className="label" style={{ display: "flex" }}>
                  Exam Score : &nbsp;{" "}
                  <p style={{ fontWeight: "400" }}>{comp.score} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="headdiv">Amcat Details</div>
        <div className="personaldetailsp amcatdetails ">
          {amcat.map((comp) => (
            <div className="compexambox">
              <div className="fullname">
                <div className="label" style={{ display: "flex" }}>
                  Attemp No : &nbsp;{" "}
                  <p style={{ fontWeight: "400" }}>{comp.attempt} </p>
                </div>
                <div className="label" style={{ display: "flex" }}>
                  English Comprehension : &nbsp;{" "}
                  <p style={{ fontWeight: "400" }}>{comp.english} </p>
                </div>

                <div className="label" style={{ display: "flex" }}>
                  Logical Ability : &nbsp;{" "}
                  <p style={{ fontWeight: "400" }}>{comp.logical}</p>
                </div>

                <div className="label" style={{ display: "flex" }}>
                  Quantitaive Ability : &nbsp;{" "}
                  <p style={{ fontWeight: "400" }}>{comp.quantitative} </p>
                </div>
                <div className="label" style={{ display: "flex" }}>
                  Automata : &nbsp;{" "}
                  <p style={{ fontWeight: "400" }}>{comp.automata} </p>
                </div>
                <div className="label" style={{ display: "flex" }}>
                  Average ELQ : &nbsp;{" "}
                  <p style={{ fontWeight: "400" }}>
                    {(comp.english + comp.quantitative + comp.logical) / 27}{" "}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrintProfile;
