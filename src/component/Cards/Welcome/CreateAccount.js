import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, IconButton, TextField, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useAlert } from "react-alert";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { postRequest } from "../../../apis/baseApi";
import facebook from "../../../assets/png/icon/facebook.png";
import google from "../../../assets/png/icon/google.png";
import { isEmail } from "../../../utility/common";
import { CommonButton } from "../Common/CommonButton";
import CustomCircularProgressBar from "../../ProgressBar/CustomCircularProgressBar";

const Gicon = (
  <img
    src={google}
    height="20px"
    style={{ marginLeft: "10px" }}
    alt="google-icon"
  />
);
const ficon = (
  <img
    src={facebook}
    height="20px"
    style={{ marginLeft: "10px" }}
    alt="facebook-icon"
  />
);

export const SignButton = styled(Button)(({ theme }) => ({
  color: "#787878",
  borderColor:
    " linear-gradient(270deg, #FFA321 16.97%, #FFA321 19.3%, #FFC148 100%)",
  boxShadow: "none",
  //width: "225px",
  height: "40px",
  fontStyle: "normal",
  textTransform: "inherit",
}));

export default function CreateAccount({ setFlowStep }) {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID;
  const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
  const alert = useAlert();

  const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialState);
  const [errorValues, setErrorValues] = useState(initialState);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrorValues({ ...errorValues, [prop]: "" });
  };

  function validateForm() {
    let error = false;
    let nameError = "";
    let emailError = "";
    let mobileError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    if (!values?.name) {
      error = true;
      nameError = "Please enter full name";
    }
    if (!values?.email) {
      error = true;
      emailError = "Please enter email";
    } else if (!isEmail(values?.email)) {
      error = true;
      emailError = "Please enter valid email";
    }
    if (!values?.mobile) {
      error = true;
      mobileError = "Please enter Mobile Number";
    } else if (values?.mobile.length !== 10) {
      error = true;
      mobileError = "Please enter valid Mobile Number";
    }
    if (!values?.password) {
      error = true;
      passwordError = "Please enter strong password";
    }
    if (values?.password && values?.password !== values?.confirmPassword) {
      error = true;
      confirmPasswordError = "Both password are not same";
    }
    setErrorValues({
      name: nameError,
      email: emailError,
      password: passwordError,
      mobile: mobileError,
      confirmPassword: confirmPasswordError,
    });
    setIsError(error);
    return error ? false : true;
  }

  function CreateAccount() {
    if (validateForm()) {
      var firstName = values?.name.split(" ").slice(0, -1).join(" ");
      var lastName = values?.name.split(" ").slice(-1).join(" ");
      setIsloading(true);
      const body = {
        user: {
          email: values?.email,
          confirmPassword: values?.confirmPassword,
          first_name: firstName,
          last_name: lastName,
          password: values?.password,
          phone_number: `+91` + values?.mobile,
          provider: "usingemail",
        },
      };
      postRequest("authentications/register/", body)
        .then((result) => {
          if (
            (result?.status === 200 || result?.status === 201) &&
            result?.data?.status === true
          ) {
            localStorage.setItem("token", result?.data?.data?.token);
            alert.success("Registered successfully");
            setFlowStep(5);
            setValues(initialState);
            setErrorValues(initialState);
          } else {
            if (result?.data?.msg) {
              alert.error(result?.data?.msg);
            } else {
              alert.error("Error in user registration. Please try again!!");
            }
          }
          setIsloading(false);
        })
        .catch((err) => {
          setIsloading(false);
          alert.error("Error occurred!");
        });
    }
  }

  const socialLogin = (body) => {
    postRequest("authentications/social_login/", body)
      .then((result) => {
        if (result.status === 200 || result.status === 201) {
          localStorage.setItem("token", result?.data?.token);
          localStorage.setItem("username", result?.data?.username);
          alert.success("Logged in successfully");
          setFlowStep(5);
        } else {
          alert.error("Error in login. Please try again!");
        }
      })
      .catch((err) => {
        alert.error("Something went wrong!");
      });
  };

  const responseFacebook = (res) => {
    if(res?.accessToken){
    const body = {
      user: {
        email: res?.email,
        username: res?.name,
        provider: "facebook",
        token: res?.accessToken,
      },
    };
    socialLogin(body);
  }
  };

  const onLoginSuccess = (res) => {
    const body = {
      user: {
        email: res?.profileObj?.email,
        username: res?.profileObj?.name,
        provider: "google",
        token: res?.accessToken,
      },
    };
    socialLogin(body);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        {/* <div style={{ width: "2%" }}>
          <IconButton color="primary">
            <ArrowBackIosIcon />
          </IconButton>
        </div> */}
        <div style={{ textAlign: "center", width: "98%" }}>
          <Typography
            variant="body1"
            style={{ fontWeight: "600", color: "#4A4A4A" }}
          >
            To Continue....
          </Typography>
        </div>
      </div>
      <Box
        sx={{
          marginTop: "10px",
          pl: [2, 3, 4],
          pr: [2, 3, 4],
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={6} md={6} style={{ display: "grid" }}>
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText=""
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={true}
              render={(renderProps) => (
                <SignButton
                  variant="outlined"
                  onClick={() => {
                    renderProps.onClick();
                  }}
                >
                  Sign in with {Gicon}
                </SignButton>
              )}
            />
            {/* <SignButton variant="outlined">Sign in with {Gicon}</SignButton> */}
          </Grid>
          <Grid xs={6} md={6} style={{ display: "grid" }}>
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              callback={responseFacebook}
              fields="name,email,picture"
              disableMobileRedirect={true}
              isMobile={false}
              render={(renderProps) => (
                <SignButton variant="outlined" onClick={renderProps.onClick}>
                  Sign in with {ficon}
                </SignButton>
              )}
              
            />
          </Grid>
        </Grid>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Typography>or</Typography>
          <Button
            variant="text"
            color="primary"
            style={{ textTransform: "inherit" }}
            onClick={() => {
              setFlowStep(2);
            }}
          >
            Sign in with OTP using Mobile number
          </Button>
          <Typography>or</Typography>
        </div>
        <div>
          <Typography
            variant="body1"
            style={{ fontWeight: "600", color: "#4A4A4A" }}
          >
            Create an Account
          </Typography>
          <Grid container spacing={2} style={{ marginTop: "1px" }}>
            <Grid xs={12} md={12} style={{ display: "grid" }}>
              <TextField
                variant="outlined"
                required
                label="Full Name"
                size="small"
                InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                onChange={handleChange("name")}
                value={values?.name}
                error={isError}
                helperText={isError ? errorValues?.name : ""}
              />
            </Grid>
            <Grid xs={12} md={12} style={{ display: "grid" }}>
              <TextField
                variant="outlined"
                label="Enter Email Address"
                required
                size="small"
                InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                onChange={handleChange("email")}
                value={values?.email}
                error={isError}
                helperText={isError ? errorValues?.email : ""}
              />
            </Grid>
            <Grid xs={12} md={12} style={{ display: "grid" }}>
              <TextField
                variant="outlined"
                label="Enter Mobile Number"
                required
                type="number"
                size="small"
                InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                onChange={handleChange("mobile")}
                value={values?.mobile}
                error={isError}
                helperText={isError ? errorValues?.mobile : ""}
              />
            </Grid>
            <Grid xs={12} md={12} style={{ display: "grid" }}>
              <TextField
                variant="outlined"
                label="Password"
                required
                size="small"
                type="password"
                InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                onChange={handleChange("password")}
                value={values?.password}
                error={isError}
                helperText={isError ? errorValues?.password : ""}
              />
            </Grid>
            <Grid xs={12} md={12} style={{ display: "grid" }}>
              <TextField
                variant="outlined"
                label="Re-Enter password "
                required
                size="small"
                type="password"
                InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                onChange={handleChange("confirmPassword")}
                value={values?.confirmPassword}
                error={isError}
                helperText={isError ? errorValues?.confirmPassword : ""}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
      <br />
      <CommonButton
        onClick={() => {
          CreateAccount();
        }}
      >
        {isLoading ? <CustomCircularProgressBar /> : "Create Account"}
      </CommonButton>
      <Button
        style={{ color: "#787878", padding: "0px", textTransform: "inherit" }}
        variant="text"
        onClick={() => {
          setFlowStep(5);
        }}
      >
        Skip
      </Button>
    </>
  );
}
