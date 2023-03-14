import { Button, FormControl } from "@mui/material";
import React, { useState } from "react";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Security",
  "Cloud Computing",
  "IOT",
  "Network Security",
  "Information Security",
  "Software Development",
  "Front End Web Dev",
  "Back End Web Dev",
  "MERN Stack",
  "App Development",
  "Blockchain",
  "Data Science",
];
names.sort();

function getStyles(name, personName, theme) {
  return {
    fontWeight:
    personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
      };
}

function InterestedDomains({ user }) {
  const [edit_pesonal, setEdit_personal] = useState(true);
  const [edit_pesonal_value, setEdit_personal_value] = useState("EDIT");

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

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleUpdate_Personal = async (e) => {
    let data = {
      interested_domains: personName,
    };
    try {
      if (personName.length !== 0) {
        await axios.put(
          `https://dapbackend.onrender.com/api/students/student/profile/update/${user._id}`,
          data
        );
      }
      setEdit_personal_value("EDIT");
      setEdit_personal(true);
      window.alert("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      window.alert("Unable to Update The Data");
    }
    
  };
  
  for(let i =0;i<names.length;i++){
    if(user.interested_domains?.includes(names[i])){
      delete names[i];
    }
  }
  const domains = user.interested_domains;
  return (
    <div>
      <div className="student_details">
        <div className="details_header">
          <h3>Technical Domains</h3>
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
        <div className="parents_details details_section tenth_details interesteddomains">
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
            <Select
              disabled={edit_pesonal}
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              style={{ width: "100%" }}
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Select" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {domains.map((d) => (
                    <Chip key={d} label={d} />
                  ))}
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names?.map(
                (name) =>
                   (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default InterestedDomains;
