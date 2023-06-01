import { Box, Container, Paper } from "@mui/material";
import { useState } from "react";
import SecondLayout from "../../component/Common/Layout/SecondLayout";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import bg from "../../assets/svg/backpanel2.svg";
import RecentApartment from "../../component/Cards/ContactedProperties/RecentApartment";
import ViewApartment from "../../component/Cards/ContactedProperties/ViewApartment";
import PropertyViewMobile from "../../component/Dialog/Property/PropertyViewMobile";
import HomeFilter from "../../component/Common/Filter/HomeFilter";

const BackPanel = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  position: "fixed",
  backgroundImage: `url(${bg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: "#FEF8F0",
  display: "flex",
  justifyContent: "center",
  //position: "fixed",
}));

export default function PropertyView() {
  return (
    <>
      <SecondLayout>
        <BackPanel>
          <Container maxWidth="lg">
            <HomeFilter />
            <Grid container spacing={2}>
              <Grid
                sm={5}
                className="scrollgrid"
                sx={{
                  overflowY: "scroll",
                  height: "80vh",
                }}
              >
                <RecentApartment />
                <br />
                <RecentApartment />
                <br />
                <RecentApartment />
                <br />
                <RecentApartment />
              </Grid>
              <Grid sm={7}>
                <ViewApartment />
              </Grid>
            </Grid>
          </Container>
        </BackPanel>
      </SecondLayout>
      <PropertyViewMobile />
    </>
  );
}
