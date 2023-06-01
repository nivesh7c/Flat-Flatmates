// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import ImageCropper from "./ImageCropper";

export default function ImageCropperDialog({
  open,
  setOpen,
  handleClickOpen,
  handleClose,
  profilePic,
  setProfilePic,
  setPreviewImage,
  setProfilePicChanged,
  addDetailsImage,
}) {
  const [makeCanvas, setMakeCanvas] = React.useState();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" "}
          Crop & Save your profile pic
        </DialogTitle>
        <DialogContent>
          <ImageCropper
            upImg={profilePic}
            setUpImg={setProfilePic}
            setPreviewImage={setPreviewImage}
            setMakeCanvas={setMakeCanvas}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setPreviewImage(makeCanvas);
              setProfilePicChanged(true);
              addDetailsImage(makeCanvas);
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
