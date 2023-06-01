import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useHistory } from "react-router-dom";

export default function LoginDialog({open, setOpen}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth, setMaxWidth] = React.useState("xs");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Successfully listed your property
      </Button> */}
      <Dialog
        // fullScreen={fullScreen}
        PaperProps={{
          style: {
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #d9d9d9",
            width: "400px",
          },
        }}
        open={open}
        maxWidth={maxWidth}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        
        <DialogContent>
          <DialogContentText sx={{ fontSize: "12px", color: "#787878" }}>
            Please login/signup to Flat and Flatmates to perform this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid xs={12} sm={6} sx={{ display: "grid" }}>
              <Button
                variant="outlined"
                sx={{ textTransform: "inherit", color: "#4A4A4A" }}
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid xs={12} sm={6} sx={{ display: "grid" }}>
              <Button
                variant="contained"
                sx={{
                  boxShadow: "none",
                  background:
                    " linear-gradient(270deg, #FFA321 16.97%, #FFA321 19.3%, #FFC148 100%)",
                  color: "#fff",
                  textTransform: "inherit",
                }}
                onClick={() => {
                  history.push("/continue");
                  handleClose();
                }}
              >
                Login/Signup
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
