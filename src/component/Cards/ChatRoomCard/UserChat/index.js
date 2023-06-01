import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
// import loo from "../../../../assets/png/default_college.png";
import PersonIcon from "@mui/icons-material/Person";
import { alpha, useTheme } from "@mui/material/styles";
import ChatMobileView from "../../../Dialog/ChatMobile/ChatMobileView";

export default function UserChat({data, setSelectedRoom, setRoomId, selectedRoom, roomId, isOwner=false, deleteChatGroup=() => {}}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [detail, setDetail] = useState({});

  const handleClickOpen = () => {
    setSelectedRoom(data);
    setRoomId(data?._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(data){
      setDetail(data);
    }
  }, [data])

  return (
    <>
      <Box
        onClick={handleClickOpen}
        sx={{
          backgroundColor: data?._id === roomId ? alpha(theme.palette.primary.main, 0.2) :"#FAFCFC",
          // width: "380px",
          borderRadius: "12px",
          // height: "50px",
          margin: `${theme.spacing(1)}px auto`,
          padding: theme.spacing(2),
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          },
          cursor: "pointer",
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
              src={detail?.groupIcon ? detail?.groupIcon : <PersonIcon />}
              sx={{
                borderColor: theme.palette.primary.main,
                border: "1px solid",
              }}
            />
          </Grid>
          <Grid container spacing={2} style={{ display: "contents" }}>
            <Grid>
              <Typography variant="body2" noWrap style={{ fontWeight: 600 }}>
                {detail?.name} {isOwner ? `(${detail?.userName})` : ""}
              </Typography>
              <Typography
                variant="overline"
                wrap
                style={{ lineHeight: "0.5" }}
              >
                {detail?.area}
              </Typography>
              <br />
              <Typography
                // variant="overline"
                noWrap
                style={{ color: "#7a7e83", lineHeight: "1.5", textOverflow: "ellipsis" }}
                
              >
                {detail?.latestMessage?.text}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <ChatMobileView
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        selectedRoom={selectedRoom}
        roomId={roomId}
        deleteChatGroup={deleteChatGroup}
      />
    </>
  );
}
