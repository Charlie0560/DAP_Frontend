import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import FormInput from "../Student_Internships/FormInput";

function Address_Details({ user }) {
  const [edit_pesonal, setEdit_personal] = useState(true);
  const [edit_pesonal_value, setEdit_personal_value] = useState("EDIT");

  const [permenant_Address, setP_address] = useState("");
  const [temporary_address, setTemp_address] = useState("");

  const handleUpdate_Personal = async () => {
    try{
      const data = {
        permenant_Address:
          permenant_Address !== ""
            ? permenant_Address
            : user.permenant_Address
            ? user.permenant_Address
            : "",
        temporary_address:
          temporary_address !== ""
            ? temporary_address
            : user.temporary_address
            ? user.temporary_address
            : "",
      };
      await axios.put(`https://dapbackend.onrender.com/api/students/student/profile/update/${user._id}`, data);
      setEdit_personal_value("EDIT");
      setEdit_personal(true);
      window.alert("Profile Updated Successfully");
    }
    catch(err){
      console.log(err);
      window.alert("Unable to Update The Data");
    }
  };

  const handleEditAccess = (choice) => {
    switch (choice) {
      case 1: {
        setEdit_personal(false);
        setEdit_personal_value("SAVE");
        break;
      }
      default:
        break;
    }
  };
  return (
    <div>
      <div className="student_details">
        <div className="details_header">
          <h3>Address Details</h3>
          <Button
            onClick={() =>
              edit_pesonal_value === "EDIT"
                ? handleEditAccess(1)
                : handleUpdate_Personal()
            }
          >
            {edit_pesonal_value}
          </Button>
        </div>
        <div className="parents_details details_section address_details">
          <FormInput
            label="Permanant Address"
            name="permanant_address"
            placeholder="Permanant Address"
            defaultValue={user.permenant_Address}
            onChange={(e) => setP_address(e.target.value)}
            disabled={edit_pesonal}
          />

          <FormInput
            label="Local Address"
            name="Local_address"
            placeholder="Local Address"
            defaultValue={user.temporary_address}
            onChange={(e) => setTemp_address(e.target.value)}
            disabled={edit_pesonal}
          />
        </div>
      </div>
    </div>
  );
}

export default Address_Details;
