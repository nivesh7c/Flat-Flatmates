import {
  Avatar,
  Button,
  Dialog,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import pSBC from "shade-blend-color";
import User from "../../../../assets/img/user.png";
import { db } from "../../../../utility/firebaseConfig";
import config from "../../../../config";
import { chatstatus } from "../../../../api/Chat/action";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  item: {
    backgroundColor: "#FAFCFC",
    //   width: "380px",
    borderRadius: "12px",
    height: "73px",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    "&:hover": {
      backgroundColor: pSBC(0.8, theme.palette.primary.main),
    },
  },
  add: {
    paddingTop: "40px",
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  btngrid: {
    //paddingTop: "20px",
    paddingLeft: "40px",
    paddingRight: "40px",
    display: "flex",
    paddingBottom: "40px",
  },
  root1: {
    borderRadius: "20px",
    border: ".5px solid #707070",
    boxShadow: "none",
  },
}));

const StyledMenu = withStyles({
  paper: {
    width: "150px",
    border: ".5px solid  #e0e0e0",
    borderRadius: "5px",
    boxShadow: "rgb(0 0 0 / 10%) 0px 8px 24px",
    marginTop: "-50px",
    justifyContent: "center",

    fontSize: "13px",
    display: "flex",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      //backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.black,
      },
    },
  },
}))(MenuItem);

export default function Member({ user, ThreadId, name, groupid }) {
  const classes = useStyles();
  const alert = useAlert();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeMember = async (user /* user_id */) => {
    if (user.id !== null) {
      const threadRef = doc(
        db,
        config.prod ? "CHATGROUP_PROD" : "CHATGROUP_DEV",
        ThreadId
      );
      const docSnap = await getDoc(threadRef);
      const temp = docSnap.data().users;
      const users = [];
      temp.forEach((element) => {
        if (element.id !== user.user_id) {
          users.push(element);
        }
      });
      await updateDoc(threadRef, {
        users: users,
      });
      setOpen(false);
      const payload = {
        group_id: groupid,
        group_name: name,
        type: "REMOVE_GROUP",
        user_ids: [user.user_id],
      };
      dispatch(chatstatus(alert, history, location, payload));
    }
  };

  var enrollment_id = "";
  if (user.enrollment_id !== "") {
    enrollment_id = user.enrollment_id;
  } else {
    enrollment_id = user.enrollment_id;
  }

  return (
    <>
      <div className={classes.item} onClick={handleClick}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar src={User} />
          </Grid>
          <Grid container spacing={2} style={{ display: "contents" }}>
            <Grid item xs={10}>
              <Typography variant="body2" noWrap style={{ fontWeight: 600 }}>
                {user?.name} {enrollment_id}
              </Typography>
              <Typography
                variant="overline"
                noWrap
                style={{ color: "#7a7e83" }}
              >
                {user?.department} {user?.branch}
              </Typography>
            </Grid>
            {user.is_admin ? (
              <Grid item xs={2}>
                <Typography variant="overline" style={{ fontWeight: 600 }}>
                  Admin
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*  <Link to="/" style={{ textDecoration: "none" }}>
          <StyledMenuItem>
            <ListItemText primary="View Info" />
          </StyledMenuItem>
        </Link> */}
        {/* <Link to="/" style={{ textDecoration: "none" }}> */}
        <StyledMenuItem onClick={() => setOpen(true)}>
          <ListItemText primary="Remove" />
        </StyledMenuItem>
        {/* </Link> */}
      </StyledMenu>
      <Dialog
        // fullScreen={fullScreen}
        maxWidth="md"
        PaperProps={{ classes: { root: classes.root1 } }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <div className={classes.add}>
          <div
            style={{
              // padding: "10px",
              // paddingLeft: "20px",
              display: "flex",
              marginBottom: "25px",

              marginLeft: "10px",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            <Typography variant="h6">
              Are you sure you want to remove {user?.name}
            </Typography>
          </div>
        </div>

        <div className={classes.btngrid}>
          <Button
            variant="outlined"
            // className={classes.button}
            onClick={() => setOpen(false)}
            style={{
              height: "40px",
              borderRadius: "30px",
              boxShadow: "none",
              marginRight: "10px",
              display: "flex",
            }}
            color="primary"
          >
            Cancel
          </Button>

          <Button
            autoFocus
            onClick={() => removeMember(user /* user?.id */)}
            // className={classes.button}
            variant="contained"
            color="primary"
            style={{
              height: "40px",
              borderRadius: "30px",
              boxShadow: "none",
              display: "flex",
            }}
          >
            Remove
          </Button>
        </div>
        {/* </DialogActions> */}
      </Dialog>
    </>
  );
}
