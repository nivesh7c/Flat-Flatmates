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
import { CircularProgress, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { postRequest } from "../../../apis/baseApi";
import { useAlert } from "react-alert";
import { CommonButton } from "../../Cards/Common/CommonButton";

export default function ContactDetailDialog({open, setOpen, type, ownerDetail}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth, setMaxWidth] = React.useState("xs");
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const history = useHistory();

  const handleClose = () => {
    setStep(0);
    setOpen(false);
  };
  const [step, setStep] = useState(0);

  const getDialogTitle = () => {
    switch(step){
        case 0:
            return `Thank you for your interest!`
        case 1:
            return 'Verify Your Number'
        case 2:
            return `Your number has been verified`
        default:
            return `Thank you for your interest!`
    }
  }

  const [mobileNumber, setMobileNumber] = useState("");
  const [isMobileError, setIsMobileError] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const getDialogContent = () => {
    switch(step){
        case 0:
            return (
                <Grid md={12} style={{ display: "grid" }}>
                    <Typography variant="body2">
                        We hereby request you to type your number below to contact the owner.
                    </Typography>
                
                    <TextField
                    variant="outlined"
                    label="Enter Contact Number"
                    size="small"
                    type="number"
                    InputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    onChange={(event) => {
                        setMobileNumber(event.target.value);
                        if(event.target.value)
                            setIsMobileError(false);
                        else{
                            setIsMobileError(true);
                        }
                    }}
                    value={mobileNumber}
                    error={isMobileError}
                    helperText={isMobileError ? "Please enter valid contact number" : ""}
                    />
                
              </Grid>
            )
        case 1:
            return (
                <Grid md={12} style={{ display: "grid" }}>
                    <Typography variant="body2">
                        Enter the OTP that we have sent through SMS to +91{mobileNumber}
                    </Typography>
                
                    <TextField
                    variant="outlined"
                    label="Enter OTP"
                    size="small"
                    InputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    onChange={(event) => {
                        setOtp(event.target.value);
                        if(event.target.value)
                            setOtpError(false);
                        else{
                            setOtpError(true);
                        }
                    }}
                    value={otp}
                    error={otpError}
                    helperText={otpError ? "Please enter 4 digit OTP" : ""}
                    />
                    <Button
        style={{ color: "#787878", padding: "0px", textTransform: "inherit" }}
        variant="text"
        onClick={() => {
          resendOTP();
        }}
      >
        Resend OTP
      </Button>
                
              </Grid>
            )
        case 2:
            return (
                <Grid md={12} style={{ display: "grid" }}>
                    <Typography variant="body2">
                        Owner's Contact Details
                    </Typography>
                <TextField
                    variant="outlined"
                    label="Name"
                    size="small"
                    InputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    disabled
                    value={ownerDetail?.fullName}
                   
                />
                <br/>
                <TextField
                    variant="outlined"
                    label="Contact Number"
                    size="small"
                    InputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    disabled
                    value={ownerDetail?.phoneNumber}
                   
                />
                </Grid>
            )
    }
  }

  const sendOTP = () => {
    const body = {
      phone_number: `+91${mobileNumber}`
    }
    setLoading(true);
    postRequest("authentications/send-mob-verification/", body)
      .then((res) => {
        if (res?.data?.status) {
          alert.success(res?.data?.data);
          setStep(1);
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

  const onSubmit = () => {
    switch(step){
        case 0:
            if(!mobileNumber || mobileNumber.length !== 10){
                setIsMobileError(true);
                return;
            }
            sendOTP();
            break;
        case 1:
            // sendContactedProperties();
            if(!otp && otp.length !== 4){
                setOtpError(true);
                return;
            }
            verifiyOTP();
            break;
        case 2:
            setOpen(false);
    }
  }

  const resendOTP = () => {
    const body = {
      phone_number: `+91${mobileNumber}`
    }
    
    postRequest("authentications/send-mob-verification/", body)
      .then((res) => {
        if (res?.data?.status) {
          alert.success("OTP resent successfully!");
        } else {
          alert.error(res?.data?.msg);
        }
      })
      .catch((err) => {
        alert.error("Something went wrong. Please try again!!");
      });
  };

  const verifiyOTP = () => {
    const body = {
      phone_number: `+91${mobileNumber}`,
      otp: otp
    }
    setLoading(true);
    postRequest("authentications/verify-mob-number/", body).then(res => {
      if(res?.data?.status){
        alert.success(res?.data?.data);
        sendContactedProperties();
        setStep(2);
      }else{
        // sendContactedProperties();
        alert.error(res?.data?.msg);
      }
      setLoading(false);
      
    }).catch(err => {
      setLoading(false);
      alert.error("Something went wrong. Please try again!!");
    })
  }

  const sendContactedProperties = () => {
    let body = {};
    if(type === 'rental'){
        body={
            property_type : 1,
            rent_property: ownerDetail?.id
        }
    }else if(type === 'pghostel'){
        body={
            property_type : 2,
            pg_property: ownerDetail?.id
        }
    }else{
        body={
            property_type : 3,
            flatmates_property: ownerDetail?.id
        }
    }
    postRequest("seller_dasboard/add-leads/", body).then(res => {
       if(res?.status === 200){
        
       }
    }).catch(err => {
        alert.error("Error in getting contact details!!")
    })
  }

  return (
    <div>
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
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ fontSize: "16px", fontWeight: "500" }}
        >
          {getDialogTitle()}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "12px", color: "#787878" }}>
            {getDialogContent()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
            <Grid xs={12} sm={6} sx={{ display: "grid" }}>
              <CommonButton
                variant="contained"
                onClick={() => {
                    onSubmit();
                }}
              >
                {loading ? <CircularProgress /> :  "Submit"}
              </CommonButton>
            </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
