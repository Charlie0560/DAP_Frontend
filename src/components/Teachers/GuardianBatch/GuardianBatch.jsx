import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./guardian.css";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Batch from "./Batch";
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


function GuardianBatch({ user }) {
  // const [students, setStudents] = useState([]);
  const [batchname, setBatchname] = useState("");
  const [batchdiv, setBatchDiv] = useState("");
  const [batchbranch, setBatchBranch] = useState("");
  const [batch, setBatch] = useState("");
  // const [guardian, setBatchGuardian] = useState("");
  const [batches, setBatches] = useState([]);
  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       const res = await axios.get("https://dapbackend.onrender.com/api/students/getdivStudents/" + div);
  //       setStudents(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchStudents();
  // });

  useEffect(() => {
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
    fetchBatches();
  });

  const rows = [];
  for (let i = 0; i < batches.length; i++) {
    rows.push({
      id: i + 1,
      batchname: batches[i].batch_name,
      batchdiv: batches[i].batch_div,
      batchbranch: batches[i].batch_branch,
      nostudents: batches[i].batch_Students.length,
      noparents: batches[i].batch_Students_Parents.length,
      students: batches[i].batch_Students,
      parents: batches[i].batch_Students_Parents,
      batchid: batches[i]._id,
    });
  }
  const handleAdd = async () => {
    try {
      const data = {
        batch_name: batchname,
        guardian_id: user.collegeId,
        guardian_teacher: {
          name: user.fullname,
          mobile: user.mobileno,
          email: user.collegeId,
        },
        batch_div: batchdiv,
        batch_branch: batchbranch,
      };
      await axios.post("https://dapbackend.onrender.com/api/batches/newBatch", data);
      window.alert("Batch Added Successfully");
    } catch (err) {
      console.log(err);
      window.alert("Something wents wrong");
    }
  };
  const [open, setOpen] = React.useState(false);

  const [did,setDid] = useState("");
  const [dname,setDname] = useState("");
  const handleClickOpen = (id,name) => {
    setOpen(true);
    setDid(id);
    setDname(name);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async()=>{
    try{
      await axios.delete("https://dapbackend.onrender.com/api/batches/deletebatch/" + did);
      window.alert("Batch Deleted Successfully");
      setOpen(false);
    }
    catch(err){
      console.log(err);
      window.alert("Something wents wrong");
    }
  }
  return (
    <div>
      <Navbar user={user}/>
      <div className="batchbox">
        <h2>Add a Batch</h2>
        <div className="addbatch">
          <input
            type="text"
            placeholder="Batch Name"
            onChange={(e) => setBatchname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Batch Div"
            onChange={(e) => setBatchDiv(e.target.value)}
          />
          <Select
            value={batchbranch}
            onChange={(e) => setBatchBranch(e.target.value)}
            className="select"
            displayEmpty
            style={{
              fontSize: "14px",
              color: "grey",

              marginBottom: "9px",
              backgroundColor: "white",
              height: "53px",
              marginTop: "9px",
              fontStyle: "none",
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              Branch
            </MenuItem>
            <MenuItem value={"FE"}>FE</MenuItem>
            <MenuItem value={"CS"}>CS</MenuItem>
            <MenuItem value={"IT"}>IT</MenuItem>
            <MenuItem value={"ENTC"}>ENTC</MenuItem>
          </Select>
          <Button onClick={handleAdd}>Add</Button>
        </div>
        <div className="batches">
          <hr />
          <h2>Batches</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Sr No.</TableCell>
                  <TableCell align="left">Batch Name</TableCell>
                  <TableCell align="left">Batch Div</TableCell>
                  <TableCell align="left">Batch Branch</TableCell>
                  <TableCell align="left">Total Students</TableCell>
                  {/* <TableCell align="left">Total Parents</TableCell> */}
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.batchname}</TableCell>
                    <TableCell align="left">{row.batchdiv}</TableCell>
                    <TableCell align="left">{row.batchbranch}</TableCell>
                    <TableCell align="left">{row.nostudents}</TableCell>
                    {/* <TableCell align="left">{row.noparents}</TableCell> */}
                    <TableCell align="left">
                      <i
                        class="fa-sharp fa-solid fa-pen"
                        onClick={() => setBatch(row)}
                      ></i>
                    </TableCell>
                    <TableCell align="left">
                      <i class="fa-sharp fa-solid fa-trash" onClick={()=>handleClickOpen(row.batchid,row.batchname)}></i>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="batchcompo">{batch && <Batch batch={batch} />}</div>
        {/* <div className="batchtop">
          <p>Get Students by Division</p>
          <input onChange={(e) => setDiv(e.target.value)} />
        </div> */}
      </div>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are You Sure To Delete Batch " + dname}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button autoFocus onClick={handleDelete}>
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

export default GuardianBatch;
