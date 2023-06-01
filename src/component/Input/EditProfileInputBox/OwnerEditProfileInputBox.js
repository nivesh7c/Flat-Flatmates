import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { getRequest, putRequest } from "../../../apis/baseApi";
import { CommonButton } from "../../Cards/Common/CommonButton";
import CustomCircularProgressBar from "../../ProgressBar/CustomCircularProgressBar";
import { useHistory } from "react-router-dom";

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    color: "#6F6F6F",
    borderRadius: 4,
    backgroundColor: "#fff",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function OwnerEditProfileInputBox() {
  const [isLoading, setLoading] = useState(false);
  const alert = useAlert();
  const [data, setData] = useState({});
  const history = useHistory();

  function updateBasicInfo() {
    setLoading(true);
    const body = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      phone_number: `+91${data?.phone_number}`,
      email: data?.email,
    };
    putRequest("authentications/user_details/", body)
      .then((res) => {
        if (res?.data?.status) {
          // setData(res?.data?.data);
          alert.success("Detail updated successfully!!");
        } else {
          alert.error("Error in updating profile!");
        }
        setLoading(false);
      })
      .catch((err) => {
        alert.error("Error in updating profile!");
        setLoading(false);
      });
  }

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

  const getPhoneNumber = () => {
    if(data?.phone_number){
      return `${data?.phone_number.replace('+91', '')}`
    }
    return ``;
  }

  return (
    <>
      <Box
        sx={{
          border: "1px solid #d1d1d1",
          p: [1, 2, 4],
          // px: 4,
          // py: 4,
          // pt: 2,
          // pb: 4,
          borderRadius: "5px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1">Basic Details</Typography>{" "}
          <IconButton>
            <EditIcon />
          </IconButton>
        </div>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={6} sx={{ display: "grid" }}>
            <RedditTextField
              label="Full Name"
              value={`${data?.first_name} ${
                data?.last_name ? data?.last_name : ""
              }`}
              variant="filled"
              style={{ marginTop: 11 }}
              required
              onChange={(event) => {
                setData({ ...data, first_name: event.target.value });
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} sx={{ display: "grid" }}>
            <RedditTextField
              label="Email id "
              value={`${data?.email ? data?.email : ""}`}
              required
              disabled
              variant="filled"
              style={{ marginTop: 11 }}
              onChange={(event) => {
                setData({ ...data, email: event.target.value });
              }}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} sx={{ display: "grid" }}>
            <RedditTextField
              label="Phone Number "
              type="number"
              required
              value={getPhoneNumber()}
              variant="filled"
              style={{ marginTop: 11 }}
              onChange={(event) => {
                setData({ ...data, phone_number: event.target.value });
              }}
            />
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CommonButton
              onClick={() => {
                updateBasicInfo();
              }}
            >
              {isLoading ? <CustomCircularProgressBar /> : "Save and continue"}
            </CommonButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
