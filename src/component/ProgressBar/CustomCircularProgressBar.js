import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

function CustomCircularProgressBar({ isWhite = true }) {
  return <CircularProgress sx={{ color: "#fff" }} size={14} />;
}

export default CustomCircularProgressBar;
