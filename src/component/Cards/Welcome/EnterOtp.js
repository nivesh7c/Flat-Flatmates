import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, TextField, Typography, CircularProgress, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useAlert } from "react-alert";
import { CommonButton } from "../Common/CommonButton";
import { postRequest } from "../../../apis/baseApi";

export default function EnterOtp({setFlowStep, mobileNumber}) {
  const [otp, setOtp] = useState("");
  const [isError, setIsError] = useState(false);
  const alert = useAlert();
  const [loading, setLoading] = useState(false);


  const verifiyOTP = () => {
    const body = {
      phone_number: mobileNumber,
      otp: otp
    }
    setLoading(true);
    postRequest("authentications/verify_mob_otp/", body).then(res => {
      if(res?.data?.status){
        localStorage.setItem('token', res?.data?.token);
        setFlowStep(5);
      }else{
        alert.error(res?.data?.msg)
      }
      setLoading(false);
      
    }).catch(err => {
      setLoading(false);
      alert.error("Something went wrong. Please try again!!");
      setFlowStep(4);
    })
  }


  const resendOTP = () => {
    const body = {
      phone_number: mobileNumber
    }
    setLoading(true);
    postRequest("authentications/send_mobile_otp/", body)
      .then((res) => {
        if (res?.data?.status) {
          alert.success("OTP resent successfully!!");
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
            <IconButton color="primary">
              <ArrowBackIosIcon onClick={() => {
                setFlowStep(2);
              }}/>
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
            OTP sent to {mobileNumber}
          </Typography>

          <div>
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid md={12} style={{ display: "grid" }}>
                <TextField
                  variant="outlined"
                  label="Enter OTP"
                  size="small"
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  onChange={(event) => {
                    setOtp(event.target.value);
                    if(event.target.value){
                      setIsError(false);
                    }
                  }}
                  value={otp}
                  error={isError}
                  helperText={isError ? "Please Enter correct OTP" : ""}
                />
              </Grid>
            </Grid> 
            <div style={{alignItems: "right"}}>
            <Button
        style={{ color: "#787878", padding: "0px", textTransform: "inherit" }}
        variant="text"
        onClick={() => {
          // setFlowStep(5);
          resendOTP();
        }}
      >
        Resend OTP
      </Button>
      </div>
          </div>
        </div>
        <br />
        
        <CommonButton onClick={() => {
          if(!otp){
            setIsError(true);
          }
          else
          {
            verifiyOTP();
          }
        }}>{loading ? <CircularProgress /> : "Verify" }</CommonButton>
      </div>
    </>
  );
}
