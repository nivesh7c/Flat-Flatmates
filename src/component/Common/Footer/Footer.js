import { Box, Typography, Link, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import logo from "../../../assets/svg/logo.svg";
import { useHistory } from "react-router-dom";
import fb from "../../../assets/png/icon/fb.png";
import insta from "../../../assets/png/icon/insta.png";
import linkedin from "../../../assets/png/icon/linkedin.png";
import twi from "../../../assets/png/icon/twi.png";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import FlatItems from "./FlatItems";

const LogoIcon = <img src={logo} height="40px" alt="logo" />;

const fbIcon = <img src={fb} alt="social-link" style={{ cursor: "pointer" }} />;
const instaIcon = (
  <img src={insta} alt="social-link" style={{ cursor: "pointer" }} />
);
const linkedinIcon = (
  <img src={linkedin} alt="social-link" style={{ cursor: "pointer" }} />
);
const twiIcon = (
  <img src={twi} alt="social-link" style={{ cursor: "pointer" }} />
);

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#D9D9D9",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(0.5),
    color: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "#4D606A",
    "&.Mui-selected": {
      color: "#fff",
      fontWeight: "500",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, overflow: "hidden" }}>
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Footer() {
  const theme = useTheme();
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#37474F",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <StyledTabs value={value} onChange={handleChange}>
            <StyledTab label="Flats for rent " {...a11yProps(0)} />
            <StyledTab label="Flatmates" {...a11yProps(1)} />
            <StyledTab label="PG / Hostel" {...a11yProps(2)} />
          </StyledTabs>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <FlatItems />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <FlatItems />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <FlatItems />
            </TabPanel>
          </SwipeableViews>
        </Box>

        <Box
          sx={{
            borderBottom: "1px solid #ffff",
          }}
        >
          <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const propertyType =
                        localStorage.getItem("property_type");
                      if (propertyType) {
                        if (propertyType === "RENT")
                          history.push("/home/rental");
                        else if (propertyType === "FLATMATES") {
                          history.push("/home/flatmates");
                        } else if (propertyType === "RENT_SHARED") {
                          history.push("/home/pghostel");
                        } else {
                          history.push("/");
                        }
                      } else {
                        history.push("/");
                      }
                    }}
                  >
                    {LogoIcon}{" "}
                  </Box>
                  <Box sx={{ ml: "15px" }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#fff",
                      }}
                    >
                      Flat and Flatmates
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", fontSize: "10px" }}
                    >
                      {"© Copyright "}
                      Flat and Flatmates
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Grid
                    container
                    columnSpacing={2}
                    sx={{ order: { xs: 1, sm: 2 } }}
                  >
                    <Grid sx={{ display: "flex", alignItems: "center" }} onClick={() =>
                      window.open("https://www.facebook.com/flatandflatmates2021/", '_blank')
                    }>
                      {fbIcon}
                    </Grid>
                    <Grid sx={{ display: "flex", alignItems: "center" }} onClick={() =>
                      window.open("https://www.instagram.com/flatandflatmates_/", '_blank')
                    }>
                      {" "}
                      {instaIcon}
                    </Grid >
                    <Grid sx={{ display: "flex", alignItems: "center" }} onClick={() =>
                      window.open("https://twitter.com/", '_blank')
                    }>
                      {twiIcon}
                    </Grid>
                    <Grid sx={{ display: "flex", alignItems: "center" }} onClick={() =>
                      window.open("https://www.linkedin.com/company/flat-and-flatmates-solutions/", '_blank')
                    }>
                      {linkedinIcon}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {footerSecond.map((footerSecond) => (
                <Grid item xs={6} sm={4} md={3} key={footerSecond.title}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    {footerSecond.title}
                  </Typography>
                  <ul
                    style={{
                      listStyleType: "none",
                      padding: 0,
                    }}
                  >
                    {footerSecond.description.map((item) => (
                      <li key={item} style={{ marginBottom: "20px" }}>
                        <Link
                          href={item?.link}
                          variant="subtitle1"
                          color="text.secondary"
                          sx={{
                            textDecoration: "none",
                            color: "#fff",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          {item?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", p: 1 }}>
          <Typography
            sx={{ color: "#fff", fontWeight: "500", fontSize: "16px" }}
          >
            <span style={{ color: "#D7D7D7" }}> Mail Us :</span>{" "}
            help@flatandflatmates.com
          </Typography>

          <Typography sx={{ color: "#fff" }}>
            <span style={{ color: "#D7D7D7" }}> Address : </span> A 50,
            Gurugram, Haryana.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Footer;

const footers = [
  {
    description: [
      "Flats for Rent in Mumbai",
      "Flats for rent in Andheri West",
      "Flats for rent in Malad West",
      "Flats for rent in Andheri East",
      "Flats for rent in Powai",
      "Flats for rent in Thane West",
      "Flats for rent in Dombivli",
      "Flats for rent in Mira Road East",
      "Flats for rent in Kharghar",
      "Flats for rent in Navi Mumbai",
      "Flats for rent in Bandra West",
      "Properties in Mumbai with Heavy Deposit",
      "Flats for rent in Faridabad",
    ],
  },
  {
    description: [
      "Flats for Rent in Mumbai",
      "Flats for rent in Andheri West",
      "Flats for rent in Malad West",
      "Flats for rent in Andheri East",
      "Flats for rent in Powai",
      "Flats for rent in Thane West",
      "Flats for rent in Dombivli",
      "Flats for rent in Mira Road East",
      "Flats for rent in Kharghar",
      "Flats for rent in Navi Mumbai",
      "Flats for rent in Bandra West",
      "Properties in Mumbai with Heavy Deposit",
      "Flats for rent in Faridabad",
    ],
  },
  {
    description: [
      "Flats for Rent in Mumbai",
      "Flats for rent in Andheri West",
      "Flats for rent in Malad West",
      "Flats for rent in Andheri East",
      "Flats for rent in Powai",
      "Flats for rent in Thane West",
      "Flats for rent in Dombivli",
      "Flats for rent in Mira Road East",
      "Flats for rent in Kharghar",
      "Flats for rent in Navi Mumbai",
      "Flats for rent in Bandra West",
      "Properties in Mumbai with Heavy Deposit",
      "Flats for rent in Faridabad",
    ],
  },
  {
    description: [
      "Flats for Rent in Mumbai",
      "Flats for rent in Andheri West",
      "Flats for rent in Malad West",
      "Flats for rent in Andheri East",
      "Flats for rent in Powai",
      "Flats for rent in Thane West",
      "Flats for rent in Dombivli",
      "Flats for rent in Mira Road East",
      "Flats for rent in Kharghar",
      "Flats for rent in Navi Mumbai",
      "Flats for rent in Bandra West",
      "Properties in Mumbai with Heavy Deposit",
      "Flats for rent in Faridabad",
    ],
  },
];

const footerSecond = [
  {
    title: "Company",
    description: [{
      name: "About us",
      link: "/about-us"
    },{
      name: "Contact us",
      link: "/contact-us"
    },{
      name: "Career",
      link: "/career"
    }]
  },
  {
    title: "Policies",
    description: 
    [{
      name: "Privacy",
      link: "/privacy"
    },{
      name: "Terms and Conditions",
      link: "/terms-and-condition"
    },{
      name: "Help",
      link: "/help"
    }]
  },
];
