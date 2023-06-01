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
import MsgPanel from "../../Cards/ChatRoomCard/Message/MsgPanel";

const adjusticon = <img src={adjust} />;
const hearticon = <img src={heart} />;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatMobileView({ open, handleClose, selectedRoom, roomId, deleteChatGroup }) {
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
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                textAlign: "center",
                zIndex: "-10",
              }}
              variant="h6"
              component="div"
            >
              Chat
            </Typography>
            {/* <IconButton color="inherit" onClick={handleClose}>
              {adjusticon}
            </IconButton>
            <IconButton color="inherit" onClick={handleClose}>
              {hearticon}
            </IconButton> */}
          </Toolbar>
        </AppBar>

        <Box sx={{ borderBottom: "1px solid #e2e6ea" }}>
          <MsgPanel roomDetails={selectedRoom} roomId={roomId}  deleteChatGroup={deleteChatGroup}/>
        </Box>
      </Dialog>
    </div>
  );
}
