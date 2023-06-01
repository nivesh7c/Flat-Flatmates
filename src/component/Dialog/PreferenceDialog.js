import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useHistory } from "react-router-dom";
import FlatmatePreference from "../Cards/Common/FlatmatePreference";
import RentPreference from "../Cards/Common/RentPreference";
import RentSharedPreference from "../Cards/Common/RentSharedPreference";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";

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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function PreferenceDialog({
  open,
  setOpen,
  type,
  setRefresh = () => {},
  isListing = false,
  isEditPreference = false,
}) {
  const theme = useTheme();
  const [maxWidth, setMaxWidth] = React.useState("xs");
  const fullScreen = useMediaQuery(theme.breakpoints.only("xs"));

  const [value, setValue] = React.useState(
    type === "flatmates" ? 2 : type === "pghostel" ? 1 : 0
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        PaperProps={{
          style: {
            // padding: "20px",
            borderRadius: "12px",
            border: "1px solid #d9d9d9",
            // width: "400px",
          },
        }}
        open={open}
        maxWidth={maxWidth}
        aria-labelledby="responsive-dialog-title"
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={() => {
              setOpen(false);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ bgcolor: "background.paper" }}>
            <AppBar
              position="static"
              sx={{ backgroundColor: "#fff", boxShadow: "none" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Rental" {...a11yProps(0)} />
                <Tab label="PG/ Hostel" {...a11yProps(1)} />
                <Tab label="Flatmates " {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <RentPreference
                  isDialog={true}
                  handleClose={() => {
                    setRefresh(true);
                    setOpen(false);
                  }}
                  isListing={isListing}
                  isEditPreference={isEditPreference}
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <RentSharedPreference
                  isDialog={true}
                  handleClose={() => {
                    setRefresh(true);
                    setOpen(false);
                  }}
                  isListing={isListing}
                  isEditPreference={isEditPreference}
                />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <FlatmatePreference
                  isDialog={true}
                  handleClose={() => {
                    setRefresh(true);
                    setOpen(false);
                  }}
                  isListing={isListing}
                  isEditPreference={isEditPreference}
                />
              </TabPanel>
            </SwipeableViews>
          </Box>
          {/* {getPreferenceComponent()} */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
