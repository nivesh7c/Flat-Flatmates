import { Box, Toolbar } from "@mui/material";
import Navbar from "../Navbar";
import MobileBar from "../Navbar/MobileBar";

export default function SecondLayout({ children, showCity=false, isListing=false, setRefresh=() => {}, isRefresh=false }) {
  return (
    <>
      <Navbar showCity={showCity} isListing={isListing} setRefresh={setRefresh} isRefresh={isRefresh}/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {children}
      </Box>
      {/* <Footer /> */}
      <MobileBar />
    </>
  );
}
