import {
  Box,
  ButtonBase,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { getRequest } from "../../apis/baseApi";
import banner from "../../assets/png/banner2.png";
import user from "../../assets/png/user.jpg";
import Layout from "../../component/Common/Layout/Layout";
import DashboardTab from "../../component/Common/Tab/DasboardTab";
import DeletedPropertyTab from "../../component/Common/Tab/DeletedPropertyTab";
import OwnerEditProfileInputBox from "../../component/Input/EditProfileInputBox/OwnerEditProfileInputBox";
import { useHistory } from "react-router-dom";

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
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// const color1 = "#FED79E ";
// const color2 = "rgba(243, 134, 48, 0.0117) ";
// const color3 = "#ffff";

// const color4 = "#000000";
// const color5 = "#37474F00";
// const color6 = "#ffff";

export default function Dashboard() {
  const [propertyType, setPropertyType] = useState("rent_properties");

  const handleChange = (event) => {
    setPropertyType(event.target.value);
  };

  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = useState({});

  useEffect(() => {
    getRequest("authentications/user_details/")
      .then((res) => {
        if (res?.data?.status) {
          setData(res?.data?.data);
          localStorage.setItem("user_details", JSON.stringify(res?.data?.data));
        } else {
          alert.error(res?.data?.msg);
          history.push("/continue");
        }
      })
      .catch((err) => {
        alert.error("Error in fetching user details");
      });
  }, []);

  return (
    <>
      <Layout>
        <div style={{ marginTop: "4%", paddingBottom: "50px" }}>
          <div>
            <Grid container spacing={2}>
              <Grid xs={12} sm={3}>
                <Box
                  sx={{
                    border: "1px solid #D7D7D7",
                    borderRadius: "7px",
                    position: "sticky",
                    top: "110px",
                  }}
                >
                  <Box>
                    <img
                      src={banner}
                      height="200px"
                      style={{
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        backgroundPosition: "center",
                        width: "100%",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      }}
                      alt="user-banner"
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: -8,
                        px: 5,
                        py: 5,
                        pt: 0,
                        pb: 2,
                      }}
                    >
                      <ButtonBase sx={{ width: 129, height: 129 }}>
                        <div
                          style={{
                            backgroundColor: "#fff",
                            border: "2px solid #FFC067",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            style={{
                              //margin: "auto",
                              display: "block",
                              height: "100px",
                              width: "100px",
                              maxWidth: "100%",
                              maxHeight: "100%",
                              borderRadius: "50%",

                              backgroundColor: "#fff",
                            }}
                            // alt="complex"
                            src={data?.profile_pic}
                          />
                        </div>
                      </ButtonBase>
                    </Box>
                  </Box>
                  <Box sx={{ pb: 2 }}>
                    <Tabs
                      TabIndicatorProps={{ style: { background: "#fff" } }}
                      orientation="vertical"
                      value={value}
                      onChange={handleChangeTab}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        label="My Properties"
                        sx={{ textTransform: "inherit" }}
                        {...a11yProps(0)}
                      />
                      <Tab
                        label="Deleted Properties "
                        sx={{ textTransform: "inherit" }}
                        {...a11yProps(1)}
                      />
                      <Tab
                        label="Edit Profile"
                        sx={{ textTransform: "inherit" }}
                        {...a11yProps(2)}
                      />
                      <Tab
                        label="Chat Room"
                        sx={{ textTransform: "inherit" }}
                        {...a11yProps(3)}
                        onClick={() => {
                          history.push("/chat-room");
                        }}
                      />
                    </Tabs>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={12} sm={9} style={{ display: "grid" }}>
                <Box>
                  <TabPanel value={value} index={0}>
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
                              onChange={handleChange}
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
                        <DashboardTab propertyType={propertyType} />
                      </div>
                    </Box>
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
                              onChange={handleChange}
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
                      <div style={{ padding: "10px" }}>
                        <DeletedPropertyTab propertyType={propertyType} />
                      </div>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Box
                      sx={{ border: "1px solid #D7D7D7", borderRadius: "10px" }}
                    >
                      <div style={{ borderBottom: "1px solid #D7D7D7" }}>
                        <Box sx={{ p: 2 }}>
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "#4A4A4A",
                            }}
                          >
                            Edit Profile
                          </Typography>
                        </Box>
                      </div>
                      <div style={{ padding: "10px" }}>
                        <Grid container spacing={2}>
                          <Grid xs={12} sm={12}>
                            <OwnerEditProfileInputBox />
                          </Grid>
                        </Grid>
                      </div>
                    </Box>
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </Layout>
    </>
  );
}
