import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import usericon from ".././../assets/png/user.jpg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Divider } from "@mui/material";

const emails = ["Anushk Singh", "Ranjit", "FEYGUFWEchdscghdshvegvr ygurwu"];

export default function UsersDialog(props) {
  return (
    <div>
      <Dialog onClose={props.handleClose} open={props.open}>
        <DialogTitle sx={{ m: 0, p: 1 }}>
          Leads
          <IconButton
            aria-label="close"
            onClick={props.handleClose}
            sx={{
              position: "absolute",
              right: 8,

              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <>
              <ListItem button key={email}>
                <ListItemAvatar>
                  <Avatar
                    sx={{ bgcolor: blue[100], color: blue[600] }}
                    src={usericon}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ width: "140px" }}
                  primary={
                    <>
                      <Typography
                        // sx={{ display: "inline" }}
                        noWrap
                        variant="body2"
                        color="text.primary"
                      >
                        {email}
                      </Typography>
                    </>
                  }
                />
                <IconButton>
                  <WhatsAppIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
