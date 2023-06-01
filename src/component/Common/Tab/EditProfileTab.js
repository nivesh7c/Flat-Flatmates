import {
  Box, FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs
} from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { getRequest } from "../../../apis/baseApi";
import ContactedProperties from "../../Cards/ContactedProperties/ContactedProperties";
import EditProfileInputBox from "../../Input/EditProfileInputBox/EditProfileInputBox";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: [1, 2, 2] }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EditProfileTab({ data, setData }) {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const alert = useAlert();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [propertyType, setPropertyType] = useState("rent_properties");

  const handleChangeProperty = (event) => {
    setPropertyType(event.target.value);
  };

  

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        TabIndicatorProps={{
          style: {
            backgroundColor: "#fff",
          },
        }}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab
          sx={{ textTransform: "inherit", fontSize: "16px" }}
          {...a11yProps(0)}
          label="Edit Profile"
        />
        <Tab
          sx={{ textTransform: "inherit", fontSize: "16px" }}
          {...a11yProps(1)}
          label="Contacted Properties"
        />
        {/* <Tab
          sx={{ textTransform: "inherit", fontSize: "16px" }}
          {...a11yProps(2)}
          label="Settings"
        /> */}
        <Tab
          sx={{ textTransform: "inherit", fontSize: "16px" }}
          {...a11yProps(3)}
          label="Owner's Dashboard"
          onClick={() => {
            history.push("/owner-dashboard");
          }}
        />
        <Tab
          sx={{ textTransform: "inherit", fontSize: "16px" }}
          {...a11yProps(4)}
          label="List with Us"
          onClick={() => {
            history.push("/listing-option");
          }}
        />
        <Tab
          sx={{ textTransform: "inherit", fontSize: "16px" }}
          {...a11yProps(4)}
          label="Chat Room"
          onClick={() => {
            history.push("/chat-with-owner");
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EditProfileInputBox data={data} setData={setData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Box
                      sx={{ border: "1px solid #D7D7D7", borderRadius: "10px" }}
                    >
                      <div style={{ borderBottom: "1px solid #D7D7D7" }}>
                        <Box sx={{ p: 2 }}>
                          <FormControl sx={{ width: "200px" }} size="small">
                            <InputLabel id="demo-simple-select-label">
                              Select Property{" "}
                            </InputLabel>

                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={propertyType}
                              label="Select PropertyType"
                              onChange={handleChangeProperty}
                            >
                              <MenuItem value={"rent_properties"}>
                                Rental Properties
                              </MenuItem>
                              <MenuItem value={"pg_hostel"}>PG/Hostel</MenuItem>
                              <MenuItem value={"flatmates"}>Flatmates</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                      <div>
                      <ContactedProperties propertyType={propertyType} />
                      </div>
                    </Box>
        
      </TabPanel>
      <TabPanel value={value} index={3}>
        {/* <ContactedProperties /> */}
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ContactedProperties />
      </TabPanel>
    </Box>
  );
}
