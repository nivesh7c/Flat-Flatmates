import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import adjust from "../../../assets/png/icon/Adjust.png";
import heart from "../../../assets/png/icon/heartone.png";
import ViewApartment from "../../Cards/ContactedProperties/ViewApartment";

const adjusticon = <img src={adjust} />;
const hearticon = <img src={heart} />;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PropertyViewMobile({
  open,
  setOpen,
  propertyData,
  type,
  setCurrentIndex = () => {},
  currentIndex = 0,
  liked = false,
  loved = false,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ display: { sm: "none", xs: "block" } }}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "#fff",
            boxShadow: "0px 0px 2px 0px #0000005E",
          }}
        >
          <Toolbar>
            
            <Typography
              color="primary"
              sx={{
                flex: 1,
                textAlign: "center",
                position: "absolute",
                left: 0,
                right: 0,
              }}
              variant="h6"
              component="div"
            >
              Details
            </Typography>
            <IconButton
              // edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIosIcon />
            </IconButton>
            {/* <IconButton color="inherit" onClick={handleClose}>
              {adjusticon}
            </IconButton>
            <IconButton color="inherit" onClick={handleClose}>
              {hearticon}
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Box>
          <ViewApartment
            propertyData={propertyData}
            type={type}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            liked={liked}
            loved={loved}
          />
        </Box>
      </Dialog>
    </div>
  );
}
