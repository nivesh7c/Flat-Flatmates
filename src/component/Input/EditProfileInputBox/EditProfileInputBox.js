import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useAlert } from "react-alert";
import { putRequest } from "../../../apis/baseApi";
import { CommonButton } from "../../Cards/Common/CommonButton";
import PreferenceDialog from "../../Dialog/PreferenceDialog";
import CustomCircularProgressBar from "../../ProgressBar/CustomCircularProgressBar";

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

export default function EditProfileInputBox({ data, setData }) {
  const [isLoading, setLoading] = useState(false);
  const alert = useAlert();
  const [open, setOpen] = useState(false);

  function updateBasicInfo() {
    setLoading(true);
    const body = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      phone_number: data?.phone_number ? `+91${getPhoneNumber()}` : "",
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

          p: [2, 2, 4],
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
          <Grid xs={12} sm={12} md={6} sx={{ display: "grid" }}>
            <RedditTextField
              label="Full Name"
              value={`${data?.first_name
              }`}
              variant="filled"
              style={{ marginTop: 11 }}
              required
              onChange={(event) => {
                setData({ ...data, first_name: event.target.value });
              }}
            />
          </Grid>
          <Grid xs={12} sm={12} md={6} sx={{ display: "grid" }}>
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
          <Grid xs={12} sm={12} md={6} sx={{ display: "grid" }}>
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
      <br />
      <Box
        sx={{
          border: "1px solid #d1d1d1",

          px: 4,
          py: 4,
          pt: 2,
          pb: 4,
          borderRadius: "5px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1"> Edit Preferences </Typography>{" "}
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
        {/* <Grid container spacing={2}>
          <Grid md={6} sx={{ display: "grid" }}>
            <CommonInputFieldPaper>
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  fontSize: "14px",
                }}
                value="Udyog Vhiar,  Cyber city "
                inputProps={{ "aria-label": "search google maps" }}
              />
            </CommonInputFieldPaper>
          </Grid>
          <Grid md={6} sx={{ display: "grid" }}>
            <CommonInputFieldPaper>
              <CommonAutoComplete icon={Neighbour} fieldlabel="Shared Space " />

              <div
                style={{
                  borderRight: "1px solid #D7D7D7",
                  width: "1%",
                  height: "30px",
                }}
              />
              <CommonAutoComplete icon={Studio} fieldlabel="2BHK" />
            </CommonInputFieldPaper>
          </Grid>
          <Grid md={6} sx={{ display: "grid" }}>
            <CommonInputFieldPaper>
              <CommonAutoComplete icon={Gender} fieldlabel="Male" />

              <div
                style={{
                  borderRight: "1px solid #D7D7D7",
                  width: "1%",
                  height: "30px",
                }}
              />
              <CommonAutoComplete icon={Armchair} fieldlabel="furnished" />
            </CommonInputFieldPaper>
          </Grid>
          <Grid md={6} sx={{ display: "grid" }}>
            <CommonInputFieldPaper>
              <CommonPrimeAutoComplete
                icon={Calendar}
                fieldlabel="13-07-2022"
              />
            </CommonInputFieldPaper>
          </Grid>
          <Grid md={6} sx={{ display: "grid" }}>
            <CustomSlider />
          </Grid>
          <Grid md={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CommonButton >Save and continue</CommonButton>
          </Grid>
        </Grid> */}
      </Box>
      <PreferenceDialog
        open={open}
        setOpen={setOpen}
        type={"rental"}
        isEditPreference={true}
      />
    </>
  );
}
