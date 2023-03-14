import { MenuItem, Select } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../../navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Students_data({user}) {
  // const [age, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullname", headerName: "Full name", width: 250 },
    {
      field: "div",
      headerName: "Division",
      width: 90,
    },
    { field: "rollno", headerName: "Roll No", width: 90 },
    { field: "college_id", headerName: "College ID", width: 90 },
  ];

  const [div, setDiv] = useState("");
  const [branch, setBranch] = useState("");
  const [rollno, setRollno] = useState("");
  let divs = [];
  if (branch === "FE") {
    divs = [
      "FE1",
      "FE2",
      "FE3",
      "FE4",
      "FE5",
      "FE6",
      "FE7",
      "FE8",
      "FE9",
      "FE10",
      "FE11",
    ];
  } else if (branch === "CS") {
    divs = [
      "SE1",
      "SE2",
      "SE3",
      "SE4",
      "TE1",
      "TE2",
      "TE3",
      "TE4",
      "BE1",
      "BE2",
      "BE3",
      "BE4",
    ];
  } else if (branch === "IT") {
    divs = [
      "SE9",
      "SE10",
      "SE11",
      "TE9",
      "TE10",
      "TE11",
      "BE9",
      "BE10",
      "BE11",
    ];
  } else if (branch === "ENTC") {
    divs = [
      "SE5",
      "SE6",
      "SE7",
      "SE8",
      "TE5",
      "TE6",
      "TE7",
      "TE8",
      "BE5",
      "BE6",
      "BE7",
      "BE8",
    ];
  }
  const rows = [];
  const [rowsdata, setDatas] = useState([]);
  console.log(rowsdata);
  for (let i = 0; i < rowsdata.length; i++) {
    rows.push({
      id: i + 1,
      fullname: rowsdata[i]?.fullname,
      div: rowsdata[i]?.div,
      rollno: rowsdata[i]?.rollno,
      collegeid: rowsdata[i]?.collegeId,
    });
  }
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (div) {
          const res = await axios.get(`https://dapbackend.onrender.com/api/students/getStudentdiv/${div}`);
          setDatas(res.data);
        } else if (rollno) {
          const res = await axios.get(`https://dapbackend.onrender.com/api/students/getStudentroll/${rollno}`);
          setDatas(res.data);
        }
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudents();
  });

  return (
    <div>
      <Navbar user={user}/>
      <center>
        <h2 style={{ marginTop: "3%" }}>Students Data</h2>
      </center>
      <div className="t_dashboard">
        <p>
          Filter By<i class="fa-solid fa-filter"></i>
        </p>
        {/* <span>Search By</span> */}
        <div className="search_filters">
          <Select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ height: "50px" }}
          >
            <MenuItem value="">
              <em>Branch</em>
            </MenuItem>
            <MenuItem value={"CS"}>CS</MenuItem>
            <MenuItem value={"IT"}>IT</MenuItem>
            <MenuItem value={"ENTC"}>ENTC</MenuItem>
          </Select>
          <Select
            value={div}
            onChange={(e) => setDiv(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ height: "50px" }}
          >
            <MenuItem value="">
              <em>Division</em>
            </MenuItem>
            {}
            {divs.map((d) => (
              <MenuItem value={d}>{d}</MenuItem>
            ))}
          </Select>
          {/* </div> */}
          <input
            placeholder="Roll no"
            type="text"
            onChange={(e) => setRollno(e.target.value)}
          />
          {/* <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Year</em>
            </MenuItem>
            <MenuItem value={"FE"}>FE</MenuItem>
            <MenuItem value={"SE"}>SE</MenuItem>
            <MenuItem value={"TE"}>TE</MenuItem>
            <MenuItem value={"BE"}>BE</MenuItem>
          </Select> */}
        </div>

        {/* // internship data table */}

        <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((c) => (
                    <TableCell align="left">{c.headerName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.fullname}</TableCell>
                    <TableCell align="left">{row.div}</TableCell>
                    <TableCell align="left">{row.rollno}</TableCell>
                    <TableCell align="left">{row.collegeid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {rows.length === 0 && 
          <center>

            <h3>Please Select The Fields First</h3>
          </center>}
        </div>
      </div>
    </div>
  );
}

export default Students_data;
