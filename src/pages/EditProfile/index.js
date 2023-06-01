import {
  Avatar, Badge, Box, CircularProgress, IconButton, Typography
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
// import { makeStyles } from "@material-ui/styles";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useHistory } from "react-router-dom";
import { getRequest, putRequest } from "../../apis/baseApi";
import banner from "../../assets/png/banner2.png";
import Layout from "../../component/Common/Layout/Layout";
import EditProfileTab from "../../component/Common/Tab/EditProfileTab";
// import { PhotoCamera } from "@material-ui/icons";
import PersonIcon from "@mui/icons-material/Person";
import ImageCropperDialog from "../../component/Input/ImageUpload/ImageCropperDialog";

const editIconButton = {
  position: "absolute",
  backgroundColor: "#FFEED6",
  border: "1px solid #FFA321",
  height: "30px",
  width: "30px",
  top: "80px",
  right: "10px",
  bottom: "0",
  "&:hover": {
    backgroundColor: "#fff",
  },
};

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     boxShadow: "none",
//     backgroundColor: "#94939F",
//     borderRadius: "20px",
//     padding: "25px",
//   },
//   navlink: {
//     color: "#94939F",
//     marginBottom: "20px",
//   },
//   divider: {
//     backgroundColor: "#94939F",
//   },
//   large: {
//     width: "15px",
//     height: "15px",
//     color: "#fff",
//     backgroundColor: "#94939F",
//   },
//   percentage: {
//     color: "#94939F",
//   },
//   person: {
//     display: "flex",
//     alignItems: "center",
//   },
//   fileInput: {
//     display: "none",
//   },
// }));

export default function EditProfile() {
  const [data, setData] = useState({});
  const alert = useAlert();
  const history = useHistory();
  // const classes = useStyles();

  useEffect(() => {
    getRequest("authentications/user_details/")
      .then((res) => {
        if (res?.data?.status) {
          setData(res?.data?.data);
          localStorage.setItem("user_details", JSON.stringify(res?.data?.data));
        } else {
          alert.error(res?.data?.msg);
          history.push("/continue");
        }
      })
      .catch((err) => {
        alert.error("Error in fetching user details");
      });
  }, []);

  const [profilePic, setProfilePic] = useState();
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [fileName, setFileName] = useState();
  const fileInputRefNew = useRef();

  const fileInputClickedNew = (e) => {
    fileInputRefNew.current.click();
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setProfilePic(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setFileName(e.target.files[0].name);
      addDetailsImage(e.target.files[0]);
      // handleClickOpen();
    }
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const addDetailsImage = (prevImg) => {
    const fd = new FormData();
    if (prevImg) {
      // dataURLtoFile(prevImg, fileName)
      fd.append("profile_pic", prevImg);
    } else {
      alert.error("Image Error!!");
      return;
    }
    setSaveLoaderImage(true);
    putRequest(
      `authentications/user_details/`,
      fd
    )
      .then((res) => {
        if (res?.data?.data) {
          alert.success("Profile Image Updated successfully!!");
          localStorage.setItem("profile_image", res.data.data?.image);
          setData(res?.data?.data);
        } else {
          alert.error("Something went wrong!");
        }
        // setIsLoading(false);
        setSaveLoaderImage(false);
      })
      .catch((err) => {
        alert.error("Something went wrong!");
        setSaveLoaderImage(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [saveLoaderImage, setSaveLoaderImage] = useState(false);
  const [profilePicChanged, setProfilePicChanged] = useState(false);

  return (
    <>
      <Layout>
        <ImageCropperDialog
          open={open}
          setOpen={setOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          setPreviewImage={setPreviewImage}
          setProfilePicChanged={setProfilePicChanged}
          addDetailsImage={addDetailsImage}
        />
        <Box
          sx={{
            border: "1px solid #D7D7D7",
            marginTop: "20px",
            borderRadius: "7px",
          }}
        >
          <Box sx={{ backgroundColor: "#F6F6F6" }}>
            {" "}
            <img
              src={banner}
              height="200px"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                width: "100%",
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
              }}
              alt="user-banner"
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: -8,
                px: 5,
                py: 5,
                pt: 0,
                pb: 2,
              }}
            >
              <Box sx={{ position: "relative" }}>
                <div>
                  <input
                    style={{ display: "none" }}
                    ref={fileInputRefNew}
                    // className={classes.fileInput}
                    type="file"
                    id="file"
                    onChange={(e) => {
                      onSelectFile(e);
                    }}
                    accept="image/*"
                  />
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    style={{ marginBottom: 40 }}
                    badgeContent={
                      <IconButton
                        style={{
                          background: "#fff",
                          padding: 6,
                          boxShadow: "0 25px 30px 0 rgba(0, 0, 0, 0.1)",
                          border: "solid 1px #f1f1f1",
                        }}
                        onClick={(e) => fileInputClickedNew(e)}
                      >
                        {saveLoaderImage ? (
                          <CircularProgress isWhite={false} />
                        ) : (
                          <PhotoCamera
                            style={{ fontSize: 20, color: "#FFC067" }}
                          />
                        )}
                      </IconButton>
                    }
                  >
                    {/* <Avatar alt="Travis Howard" style={{ height: "100px", width: "100px" }} src={saveLoaderImage ? circular_loader : previewImage} /> */}
                    {previewImage ? (
                      <Avatar
                        alt="Travis Howard"
                        sx={{ height: "110px", width: "110px" }}
                        src={previewImage}
                      />
                    ) : data?.profile_pic ? (
                      <Avatar
                        alt="Travis Howard"
                        sx={{ height: "110px", width: "110px" }}
                        src={data?.profile_pic}
                      />
                    ) : (
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ height: "110px", width: "110px" }}
                      >
                        <PersonIcon style={{ fontSize: "70px" }} />
                      </Avatar>
                    )}
                  </Badge>
                </div>
              </Box>
              <Box sx={{ mx: 2, marginTop: "40px" }}>
                <Typography variant="h6">{`${data?.first_name} ${
                  data?.last_name ? data?.last_name : ""
                }`}</Typography>

                <Typography variant="body2">Renter</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ backgroundColor: "#fff", p: [1, 2, 4] }}>
            <EditProfileTab data={data} setData={setData} />
          </Box>
        </Box>
      </Layout>
    </>
  );
}
