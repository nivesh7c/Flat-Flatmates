import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import adjust from "../../../assets/png/icon/Adjust.png";
import heart from "../../../assets/png/icon/heartone.png";
import { Box } from "@mui/material";

const adjusticon = <img src={adjust} />;
const hearticon = <img src={heart} />;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListFlatmatesDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "#fff",
            boxShadow: "0px 0px 2px 0px #0000005E",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography
              color="primary"
              sx={{ ml: 2, flex: 1, textAlign: "center" }}
              variant="h6"
              component="div"
            >
              Matches
            </Typography>
            <IconButton color="inherit" onClick={handleClose}>
              {adjusticon}
            </IconButton>
            <IconButton color="inherit" onClick={handleClose}>
              {hearticon}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
}
