import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserChat from "../UserChat";
import { alpha, useTheme } from "@mui/material/styles";
import {useLocation} from "react-router-dom";

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
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ChatTabs({value, setValue, data, setData,setSelectedRoom, setRoomId, selectedRoom, roomId, isOwner=false, deleteChatGroup=() => {}}) {
  // const [value, setValue] = React.useState(0);
  const theme = useTheme();
  
  const handleChange = (event, newValue) => {
    setRoomId();
    setData([]);
    setSelectedRoom({});
    if(newValue === 0)
      setValue("rental");
    if(newValue === 1)
      setValue("flatmates");
    if(newValue === 2)
      setValue("pghostel");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ position: "sticky", top: 20 }}
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Rental" {...a11yProps("rental")} style={{backgroundColor: value === "rental" ? alpha(theme.palette.primary.main, 0.1) : "#fff"}}/>
          <Tab label="Flatmates" {...a11yProps("flatmates")} style={{backgroundColor: value === "flatmates" ? alpha(theme.palette.primary.main, 0.1) : "#fff"}}/>
          <Tab label="Pg Hostel" {...a11yProps("pghostel")} style={{backgroundColor: value === "pghostel" ? alpha(theme.palette.primary.main, 0.1) : "#fff"}}/>
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        className="scrollchipgrid"
        index={"rental"}
        style={{
          overflowX: "scroll",
          height: "55vh",
          padding: "5px"
          
        }}
      >
        {data?.length > 0 ? data?.map(item => {
          
          return (
          <UserChat data={item} setSelectedRoom={setSelectedRoom} setRoomId={setRoomId} selectedRoom={selectedRoom} roomId={roomId} isOwner={isOwner} deleteChatGroup={deleteChatGroup}/>
          )
        })
      : 
      <div style={{padding: "20px"}}>
      No chat found
      </div>
      }
      </TabPanel>
      <TabPanel value={value} index={"flatmates"}>
      
      {data?.length > 0 ? data?.map(item => {
          return (
          <UserChat data={item} setSelectedRoom={setSelectedRoom} setRoomId={setRoomId} selectedRoom={selectedRoom} roomId={roomId} isOwner={isOwner} deleteChatGroup={deleteChatGroup}/>
          )
        })
      : 
      <div style={{padding: "20px"}}>
      No chat found
      </div>
      }
      </TabPanel>
      <TabPanel value={value} index={"pghostel"}>
      {data?.length > 0 ? data?.map(item => {
          return (
          <UserChat data={item} setSelectedRoom={setSelectedRoom} setRoomId={setRoomId} selectedRoom={selectedRoom} roomId={roomId} isOwner={isOwner} deleteChatGroup={deleteChatGroup}/>
          )
        })
      : 
      <div style={{padding: "20px"}}>
      No chat found
      </div>
      }
      </TabPanel>
    </Box>
  );
}
