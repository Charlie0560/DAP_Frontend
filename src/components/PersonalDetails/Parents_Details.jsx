import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import FormInput from "../Student_Internships/FormInput";

function Parents_Details({ user }) {
  const [edit_pesonal, setEdit_personal] = useState(true);
  const [edit_pesonal_value, setEdit_personal_value] = useState("EDIT");

  const [father_name, setFather_name] = useState("");
  const [father_contact, setFather_contact] = useState("");
  const [father_mail, setFahter_mail] = useState("");
  const [father_occupation, setFather_occupation] = useState("");
  const [mother_name, setmother_name] = useState("");
  const [mother_contact, setmother_contact] = useState("");
  const [mother_mail, setmother_mail] = useState("");
  const [mother_occupation, setmother_occupation] = useState("");

  const handleUpdate_Personal = async () => {
    try {
      const data = {
        father_name:
          father_name !== ""
            ? father_name
            : user.father_name
            ? user.father_name
            : "",
        father_occupation:
          father_occupation !== ""
            ? father_occupation
            : user.father_occupation
            ? user.father_occupation
            : "",
        father_contact:
          father_contact !== ""
            ? father_contact
            : user.father_contact
            ? user.father_contact
            : "",
        father_mail:
          father_mail !== ""
            ? father_mail
            : user.father_mail
            ? user.father_mail
            : "",
        mother_name:
          mother_name !== ""
            ? mother_name
            : user.mother_name
            ? user.mother_name
            : "",
        mother_occupation:
          mother_occupation !== ""
            ? mother_occupation
            : user.mother_occupation
            ? user.mother_occupation
            : "",
        mother_contact:
          mother_contact !== ""
            ? mother_contact
            : user.mother_contact
            ? user.mother_contact
            : "",
        mother_mail:
          mother_mail !== ""
            ? mother_mail
            : user.mother_mail
            ? user.mother_mail
            : "",
      };
      data.father_contact = parseInt(data.father_contact);
      data.mother_contact = parseInt(data.mother_contact);
      // console.log(data);
      await axios.put(`https://dapbackend.onrender.com/api/students/student/profile/update/${user._id}`, data);
      setEdit_personal_value("EDIT");
      setEdit_personal(true);
      window.alert("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      window.alert("Unable to Update Now");
    }
    setEdit_personal_value("EDIT");
    setEdit_personal(true);
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
          <h3>Parent Details</h3>
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
        <div className="parents_details details_section">
          <FormInput
            label="Father's Name"
            name="father_name"
            placeholder="Father's Name"
            defaultValue={user.father_name}
            onChange={(e) => setFather_name(e.target.value)}
            disabled={edit_pesonal}
          />
          <FormInput
            label="Father's Occupation"
            name="father_occupation"
            placeholder="Father's Occupation"
            defaultValue={user.father_occupation}
            onChange={(e) => setFather_occupation(e.target.value)}
            disabled={edit_pesonal}
          />
          <FormInput
            label="Father's Contact No"
            name="father_contact"
            placeholder="Father's Contact No"
            defaultValue={user.father_contact}
            onChange={(e) => setFather_contact(e.target.value)}
            disabled={edit_pesonal}
            type="number"
          />
          <FormInput
            label="Father's Mail"
            name="father_mail"
            placeholder="Father's Mail"
            defaultValue={user.father_mail}
            onChange={(e) => setFahter_mail(e.target.value)}
            disabled={edit_pesonal}
            type="email"
          />
          <FormInput
            label="Mother's Name"
            name="Mother_name"
            placeholder="Mother's Name"
            defaultValue={user.mother_name}
            onChange={(e) => setmother_name(e.target.value)}
            disabled={edit_pesonal}
          />
          <FormInput
            label="Mother's Occupation"
            name="Mother_occupation"
            placeholder="Mother's Occupation"
            defaultValue={user.mother_occupation}
            onChange={(e) => setmother_occupation(e.target.value)}
            disabled={edit_pesonal}
          />
          <FormInput
            label="Mother's Contact No"
            name="Mother_contact"
            placeholder="Mother's Contact No"
            defaultValue={user.mother_contact}
            onChange={(e) => setmother_contact(e.target.value)}
            disabled={edit_pesonal}
            type="number"
          />
          <FormInput
            label="Mother's Mail"
            name="Mother_mail"
            placeholder="Mother's Mail"
            defaultValue={user.mother_mail}
            onChange={(e) => setmother_mail(e.target.value)}
            disabled={edit_pesonal}
            type="email"
          />
        </div>
      </div>
    </div>
  );
}

export default Parents_Details;
