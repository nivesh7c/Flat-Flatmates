import React from "react";
import bg from "../../assets/svg/bg.svg";
import bg2 from "../../assets/png/men.png";
import { styled } from "@mui/material/styles";
import ListingOptionComponent from "../../component/Cards/ListingOption";

const BackPanel = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${bg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  position: "fixed",
  // [theme.breakpoints.only("xs")]: {
  //   backgroundImage: `url(${bg2})`,
  // },
}));

export default function ListingOption() {
  return (
    <>
      <BackPanel>
        <ListingOptionComponent />
      </BackPanel>
    </>
  );
}
