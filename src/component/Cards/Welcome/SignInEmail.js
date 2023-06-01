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
import { isEmail } from "../../../utility/common";

export default function SignInEmail({ setFlowStep }) {
  const [isError, setIsError] = useState(false);
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const validateForm = () => {
    let error = false;
    if(!email || !isEmail(email)){
        setIsError(true);
        error = true;
    }else if(!password){
        setIsError(true);
        error = true;
    }
    return error ? false : true;
  }

  const loginEmail = () => {
    const body = {
      user: {
        email: email,
        password: password
      }
    }
    setLoading(true);
    postRequest("authentications/login/", body)
      .then((res) => {
        if (res?.data?.status) {
            localStorage.setItem("token", res?.data?.token);
            localStorage.setItem("username", res?.data?.username);
            alert.success("Logged in successfully");
          setFlowStep(5);
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
            Sign in using Email and Password
          </Typography>

          <div>
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid xs={12} sm={12} md={12} style={{ display: "grid" }}>
                <TextField
                  variant="outlined"
                  label="Enter Email"
                  required
                //   type="number"
                  size="small"
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (event.target.value) {
                      setIsError(false);
                    }
                  }}
                  value={email}
                  error={isError}
                  helperText={
                    isError ? "Please Enter valid email" : ""
                  }
                />
                </Grid>
                <Grid xs={12} sm={12} md={12} style={{ display: "grid" }}>
                <TextField
                  variant="outlined"
                  label="Enter Password"
                  required
                  type="password"
                  size="small"
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (event.target.value) {
                      setIsError(false);
                    }
                  }}
                  value={password}
                  error={isError}
                  helperText={
                    isError && !password ? "Please Enter password" : ""
                  }
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <br />
        <CommonButton onClick={() => {
          if(validateForm())
          loginEmail();
        }}>{loading ? <CircularProgress /> : "Login" }</CommonButton>
        
      </div>
      <div style={{alignItems: "right", marginTop: "10px" }}>
            <Button
        style={{ color: "#787878", padding: "0px", textTransform: "inherit" }}
        variant="text"
        onClick={() => {
          setFlowStep(1);
          // resendOTP();
        }}
      >
        Not having an account? Create One.
      </Button>
      </div>
    </>
  );
}
