import { TextField, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CommonButton } from "../../Cards/Common/CommonButton";
function List({setStep}) {
  return (
    <>
      <Typography variant="h6">List your Rental property with us</Typography>
      <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
        Kindly fill out this form*
      </Typography>
      <br />
      <Typography variant="body1" sx={{ fontWeight: "500" }}>
        Basic Details
      </Typography>
      <Grid container spacing={2}>
        <Grid md={6} style={{ display: "grid" }}>
          <TextField placeholder="First name" color="primary" size="small" />
        </Grid>
        <Grid md={6} style={{ display: "grid" }}>
          <TextField placeholder="Last name" color="primary" size="small" />
        </Grid>{" "}
        <Grid md={6} style={{ display: "grid" }}>
          <TextField placeholder="Email Id" color="primary" size="small" />
        </Grid>{" "}
        <Grid md={6} style={{ display: "grid" }}>
          <TextField placeholder="Phone number" color="primary" size="small" />
        </Grid>
      </Grid>
      <div
        style={{
          position: "relative",
          float: "right",
          top: "250px",
          right: "0px",
        }}
      >
        <CommonButton onClick={() => {setStep(2)}}>Next</CommonButton>
      </div>
    </>
  );
}

export default List;
