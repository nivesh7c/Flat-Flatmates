import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import React from "react";
import s0 from "../../../assets/png/icon/Apartment.png";
import s1 from "../../../assets/png/icon/City.png";
import s2 from "../../../assets/png/icon/Meeting.png";
import s3 from "../../../assets/png/icon/Todo.png";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

export const FlatPaper = styled(Paper)(({ theme }) => ({
  width: 128,
  height: 128,
  boxShadow: "0px 1px 4px 0px #00000040",
  display: "flex",
  borderRadius: "6px",
  cursor: "pointer",

  "&:hover": {
    border: "1px solid #FFA321",
    width: 127,
    height: 127,
    // display: "block",
  },
}));

export const FlatImage = styled("img")(({ theme }) => ({
  margin: "auto",
  display: "block !important",
  height: "70px",
  width: "70px !important",
  maxWidth: "100%",
  maxHeight: "100%",
}));

export default function CardSelection({ setFlowStep }) {
  const history = useHistory();
  const alert = useAlert();

  return (
    <>
      <div
        style={{
          marginTop: "10px",
          padding: "13px",
          marginBottom: "10px",
          backgroundColor: "#fff",
          height: "350px",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            xs={6}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
            }}
            onClick={() => {
              localStorage.setItem("property_type", "RENT");
              setFlowStep(6);
            }}
          >
            <FlatPaper>
              <FlatImage src={s1} />
            </FlatPaper>
            <Typography>Rent Place</Typography>
          </Grid>
          <Grid
            xs={6}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
            }}
            onClick={() => {
              localStorage.setItem("property_type", "RENT_SHARED");
              setFlowStep(6);
            }}
          >
            <FlatPaper>
              <FlatImage src={s0} />
            </FlatPaper>
            <Typography> Rent a shared space </Typography>
          </Grid>
          <Grid
            md={6}
            xs={6}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
            }}
            onClick={() => {
              localStorage.setItem("property_type", "LIST_PROPERTY");
              if (localStorage.getItem("token"))
                history.push("/listing-option");
              else {
                alert.error("Login/Signup to start listing your property!");
                history.push("/listing-option");
              }
            }}
          >
            <FlatPaper>
              <FlatImage src={s3} />
            </FlatPaper>
            <Typography>List your property</Typography>
          </Grid>
          <Grid
            xs={6}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
            }}
            onClick={() => {
              localStorage.setItem("property_type", "FLATMATES");
              setFlowStep(6);
            }}
          >
            <FlatPaper>
              <FlatImage src={s2} />
            </FlatPaper>
            <Typography>Find Flatmates</Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
