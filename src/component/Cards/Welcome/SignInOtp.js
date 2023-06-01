import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Button
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { CommonButton } from "../Common/CommonButton";
import { postRequest } from "../../../apis/baseApi";
import { useAlert } from "react-alert";

export default function SignInOtp({ setFlowStep, setMobileNumberBase }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const alert = useAlert();
  const [loading, setLoading] = useState(false);

  const sendOTP = () => {
    const body = {
      phone_number: `+91${mobileNumber}`
    }
    setLoading(true);
    postRequest("authentications/send_mobile_otp/", body)
      .then((res) => {
        if (res?.data?.status) {
          alert.success(res?.data?.data);
          setMobileNumberBase(`+91${mobileNumber}`);
          setFlowStep(3);
        } else {
          alert.error(res?.data?.msg);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert.error("Something went wrong. Please try again!!");
      });
  };

  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <div style={{ width: "2%" }}>
            <IconButton
              color="primary"
              onClick={() => {
                setFlowStep(1);
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </div>
          <div style={{ textAlign: "center", width: "98%" }}>
            <Typography
              variant="body1"
              style={{ fontWeight: "600", color: "#4A4A4A" }}
            >
              To Continue....
            </Typography>
          </div>
        </div>

        <div
          style={{
            marginTop: "10px",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          <Typography
            variant="body1"
            color="primary"
            style={{ fontWeight: "500" }}
          >
            Sign in with OTP using Mobile number
          </Typography>

          <div>
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid xs={12} sm={12} md={12} style={{ display: "grid" }}>
                <TextField
                  variant="outlined"
                  label="Enter Mobile Number "
                  type="number"
                  size="small"
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  onChange={(event) => {
                    setMobileNumber(event.target.value);
                    if (event.target.value) {
                      setIsError(false);
                    }
                  }}
                  value={mobileNumber}
                  error={isError}
                  helperText={
                    isError ? "Please Enter correct Mobile Number" : ""
                  }
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <br />
        <CommonButton onClick={() => {
          if(!mobileNumber || mobileNumber?.length !== 10)
          {
            setIsError(true);
          }
          else{
          sendOTP();
          }
        }}>{loading ? <CircularProgress /> : "Send OTP" }</CommonButton>
      </div>
      <div style={{alignItems: "right", marginTop: "10px" }}>
            <Button
        style={{ color: "#787878", padding: "0px", textTransform: "inherit" }}
        variant="text"
        onClick={() => {
          setFlowStep(7);
          // resendOTP();
        }}
      >
        Trouble Sign In? SignIn using Email!
      </Button>
      </div>
    </>
  );
}
