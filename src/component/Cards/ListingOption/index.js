import { Paper, Box } from "@mui/material";
import { useState } from "react";
// import FirstSection from "../Welcome/FirstSection";
import ListingOption from "./Option";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import bg2 from "../../../assets/png/men.png";

export default function ListingOptionComponent({ step }) {
  const history = useHistory();

  const [flowStep, setFlowStep] = useState(step ? step : 0);
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        margin: "auto",
        // maxWidth: 260,
        height: "300px",
        borderRadius: "16px",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
        // backgroundColor: (theme) =>
        //   theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ListingOption index={0} />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ListingOption index={1} />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ListingOption index={2} />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              left: "0",
              right: "0",
            }}
          >
            <img src={bg2} height="300px" />
          </Box>
        </Grid>
      </Grid>
      {/* <div style={{marginRight: "30px"}}>
      <ListingOption index={0} />
      </div>
      <div style={{marginRight: "30px"}}>
      <ListingOption index={1}/>
      </div>
      <div style={{marginRight: "30px"}}>
      <ListingOption index={2}/>
      </div> */}
    </Paper>
  );
}
