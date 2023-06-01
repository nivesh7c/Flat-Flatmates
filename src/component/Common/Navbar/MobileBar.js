import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import MoreIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useLocation } from "react-router-dom";
import NavMenu from "./NavMenu";

export default function MobileBar() {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          display: { sm: "none", xs: "block" },
          backgroundColor: "#fff",
          boxShadow: "0px 0px 2px 0px #0000005E",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {navLinks &&
            navLinks.map((item, index) => {
              return <NavMenu items={item} key={index} />;
            })}
        </Toolbar>
      </AppBar>
    </>
  );
}

const navLinks = [
  { title: `Home`, path: `/home`, icon: <HomeIcon /> },
  { title: `My Matches`, path: `/listing`, icon: <SearchIcon /> },
  { title: `Shortlists`, path: `/my-shortlist`, icon: <FavoriteIcon /> },
  {
    title: `Profile`,
    path: `/edit-profile`,
    icon: <AccountCircleOutlinedIcon />,
  },
];
