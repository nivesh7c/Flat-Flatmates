import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { isEmail } from "../../../utility/common";
import { CommonButton } from "../Common/CommonButton";

export default function Proceed({setFlowStep}) {

  const initialState = {
    name: "",
    email: ""
  }
  const [values, setValues] = useState(initialState);
  const [errorValues, setErrorValues] = useState(initialState);
  const [isError, setIsError] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setErrorValues({...errorValues, [prop]: ""});
  };

  function validateForm(){
    let error = false;
    let nameError = "";
    let emailError = "";

    if(!values?.name){
      error = true;
      nameError= "Please enter full name"
    }
    if(!values?.email){
      error = true;
      emailError= "Please enter email";
    }else if(!isEmail(values?.email)){
      error = true;
      emailError= "Please enter valid email";
    }
    setErrorValues({
      name: nameError,
      email: emailError
    })
    setIsError(error);
    return error ?  false : true;
  }

  function proceed(){
    if(validateForm()){
      setFlowStep(5);
    }
  }


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
            <IconButton color="primary" onClick={() => {
          setFlowStep(3);
        }}>
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
              <Grid md={12} style={{ display: "grid" }}>
                <TextField
                  variant="outlined"
                  label="Enter Name"
                  size="small"
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  onChange={handleChange("name")}
                  value={values?.name}
                  error={isError}
                  helperText={isError ? errorValues?.name : ""}
                />
              </Grid>
              <Grid md={12} style={{ display: "grid" }}>
                <TextField
                  variant="outlined"
                  label="Enter Email ID"
                  size="small"
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                  onChange={handleChange("email")}
                  value={values?.email}
                  error={isError}
                  helperText={isError ? errorValues?.email : ""}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <br />
        <CommonButton onClick={() => {
          proceed();
        }}>Proceed</CommonButton>
      </div>
    </>
  );
}
