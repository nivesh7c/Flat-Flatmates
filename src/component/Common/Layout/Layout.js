import { Container, Toolbar, Box } from "@mui/material";
import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar";
import MobileBar from "../Navbar/MobileBar";

export default function Layout({
  children,
  showCity = false,
  setRefresh = () => {},
  isRefresh = false,
}) {
  return (
    <>
      <Navbar
        showCity={showCity}
        setRefresh={setRefresh}
        isRefresh={isRefresh}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // height: "100vh",
          // overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" style={{ marginBottom: "20px" }}>
          {children}
        </Container>
      </Box>
      <Footer />
      <MobileBar />
    </>
  );
}
