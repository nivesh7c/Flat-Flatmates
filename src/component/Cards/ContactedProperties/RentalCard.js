import React, { useState } from "react";
import {
  Typography,
  Button,
  IconButton,
  Box,
  Paper,
  Avatar,
  Divider,
  Stack,
  Switch,
  Link,
} from "@mui/material";
import {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia,
} from "./FullImageCard";
import user from "../../../assets/png/user.jpg";
import home from "../../../assets/png/room.png";
import p1 from "../../../assets/png/icon/Banknotes.png";
import p2 from "../../../assets/png/icon/Group.png";
import p3 from "../../../assets/png/icon/StudioFloor.png";
import p4 from "../../../assets/png/icon/Planner.png";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FmdGoodIcon from "@mui/icons-material/Room";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import p5 from "../../../assets/png/icon/Eye.png";
import p6 from "../../../assets/png/icon/Heart.png";
import p7 from "../../../assets/png/icon/Topic.png";
import p8 from "../../../assets/png/icon/Edit.png";
import p9 from "../../../assets/png/icon/Trash.png";
import UsersDialog from "../../Dialog/UsersDialog";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#2d8716",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const p1icon = <img src={p1} style={{ marginRight: "5px" }} />;
const p2icon = <img src={p2} style={{ marginRight: "5px" }} />;
const p3icon = <img src={p3} style={{ marginRight: "5px" }} />;
const p4icon = <img src={p4} style={{ marginRight: "5px" }} />;
const p5icon = <img src={p5} />;
const p6icon = <img src={p6} />;
const p7icon = <img src={p7} />;
const p8icon = <img src={p8} style={{ marginLeft: "5px" }} />;
const p9icon = <img src={p9} style={{ marginLeft: "5px" }} />;

const color4 = "#000000";
const color5 = "#37474F00";

const rupee = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="25" height="25" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_972_6078" transform="scale(0.0104167)" />
      </pattern>
      <image
        id="image0_972_6078"
        width="96"
        height="96"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADsUlEQVR4nO3cz6tVVRjG8efVTLKyH2IWFFo4KqIfFGla2Q+NS2DppIn/gtNGQbNo0qj+gy7qIPDeUgeCWilZllppKaiokIKghGQGefPb4OxAxNtZJ9da7z3rvp/pPeznvfs5+3DOXntvKYQQQgghhBBCCCFMF1YrCNgk6e1aeZkcMbNHSwbMKLnxfwGzJY3UyMpsrHRAlQIkvSJpbqWsnMZLB9Qq4M1KOTmdlbSvdEjxAoAZklaXzilg3MwoHVLjCHhO0gMVcnIr/vEj1SlgGD9+LkraVSOoRgFvVcjIbZuZ/VUjqNrvgP8LmCNpnqSHJb0oaZWkFwbczClJz5jZhczjTU/A48AnwFXSbQdmes/eFGAFcGKAEt7xnrk5wL3Al4kF/AEs8p65OcBtwDeJJWz0nrdJwALgdEIBV+IoKAR4I/Eo+NB71mYB4wkFnAGm/FfwoQQsTzwKnvKeVZJuqRUErJT0dKW43yXd2ec17wF7+7zmspl9lGmmG6q5IvaDpCdq5WWy2czWlgyotSK2SMO386WGFmTWVMrJ6W9JW0uHxIrY5L4ys/OlQ2qsiM2TtKx0TgHNLMisVsVvWxl9ViMkVsRu7KCZnawRVOOdeUDS0Qo511olqd8PrYOStk/yt6/zjjPNAEcTfgmv956zScCzw3QqojnAtoSdf5o4GZcf8Friu/8D71mbA9xP7zRzPxPAI97zNgW4A9id+O4f9Z63KcA9wN7Enf8nsNh75mYArwInE3c+wLveMzcBeBLYwGAXZu0BZnnPfr0p/1WM3qWJCyQtlPSSpNclLR1wM2ckLTGzXzOPd9OKn4oAil9j38dvkkam4s6X6q0HeDkn6WUzO+Q9yGRaLuCApKVm9qP3IP+lxQImJL0v6flap5SntAG+pdysq8AY8Jj3/zyIYVyput4FSZ9K+tjMDnsPM6gaBYxKWpdhO1ckXVLv9tHjkvZL2i1pj5lNZNh+m4CZ9O5mSRVnKnPrShiNEhx1JWyIEhx1JWyMEhwBs4DNUYKjroSxKMERcCtpd7NECaV0JXweJTjqStgSJTgCZgNbowRH9G623hElOALmADujBEddCbuiBEfA7cAXUYKjroTUp6BECSUAc0l/CkqUUAJwF/BtlOCoK2FflOAIuBv4Lkpw1JXwfZTgiN7l6PujBEfAfOCnKMFRV8KhKMERcB9wOEpwRO9piT9HCY66En6JEhwBDwLHogRHXQnHowRHwEMM8EBv73lDCCGEEEIIIYQQwvTxDys9k3O0qSgTAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

export default function RentalCard({ deleted }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          border: "1px solid #D9D9D9",
          p: 1,
          borderRadius: "5px",
        }}
      >
        <FiCard
          sx={{
            card: {
              maxWidth: 345,
            },
            boxShadow: "none",
            backgroundImage: deleted
              ? `linear-gradient(to bottom,  ${color4} 0%,${color5} 100%)`
              : "none",
          }}
        >
          <FiCardActionArea>
            <FiCardContent
              sx={{
                color: "#ffffff",
                backgroundImage: `url(${home})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "184px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Box
                  sx={{
                    background: "rgba(0,0,0,0.6)",
                    display: "flex",
                    alignItems: "center",
                    //pl: 1,
                    pr: 1,
                  }}
                >
                  <Typography sx={{ display: "flex" }}>
                    {rupee} 9,000/mo
                  </Typography>
                </Box>
              </div>
            </FiCardContent>
          </FiCardActionArea>
          <FiCardActions sx={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                sx={{ color: "#6B6B6B", fontWeight: "600" }}
                variant="body1"
              >
                2BHK Apartment in Gurgaon
              </Typography>
              <Typography
                sx={{ color: "#6B6B6B", fontWeight: "500", fontSize: "12px" }}
              >
                23/6 Udyog Vihar, Phase 3, Gurgaon
              </Typography>
            </div>
            <br />
            <div
              style={{
                width: "100%",
                m: 0,
              }}
            >
              <Grid container spacing={2}>
                <Grid xs={6} sx={{ p: 0, pb: 2 }}>
                  <div
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    {p2icon}
                    <Typography
                      noWrap
                      sx={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      2 BHK
                    </Typography>
                  </div>
                </Grid>
                <Grid xs={6} sx={{ p: 0, pb: 2 }}>
                  <div
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    {p3icon}
                    <Typography
                      noWrap
                      sx={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      900 sq ft
                    </Typography>
                  </div>
                </Grid>
                <Grid xs={6} sx={{ p: 0 }}>
                  <div
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    {p1icon}
                    <Typography
                      noWrap
                      sx={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      Deposit- 20,000
                    </Typography>
                  </div>
                </Grid>
                <Grid xs={6} sx={{ p: 0 }}>
                  <div
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    {p4icon}
                    <Typography
                      noWrap
                      sx={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      Availability- Ready to move
                    </Typography>
                  </div>
                </Grid>
                <Grid md={12} sx={{ p: 0, mt: 1, mb: 1 }}>
                  <Divider />
                </Grid>
                <Grid md={12} sx={{ pl: 0 }}>
                  <Typography variant="body2">Responses</Typography>
                </Grid>

                <Grid md={4} sx={{ pl: 0 }}>
                  <div style={{ textAlign: "center" }}>
                    {p5icon}
                    <Typography
                      noWrap
                      sx={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      100 Views
                    </Typography>
                  </div>
                </Grid>
                <Grid md={4} sx={{ pl: 0 }}>
                  <div style={{ textAlign: "center" }}>
                    {p6icon}
                    <Typography
                      noWrap
                      sx={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      45 Shortlists
                    </Typography>
                  </div>
                </Grid>
                <Grid md={4} sx={{ pl: 0 }}>
                  <div
                    style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={handleClickOpen}
                  >
                    {p7icon}
                    <Typography
                      noWrap
                      sx={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      12 Leads
                    </Typography>
                  </div>
                </Grid>

                <Grid md={12} sx={{ p: 0, mt: 1, mb: 1 }}>
                  <Divider />
                </Grid>
                <Grid md={4} sx={{ pl: 0, pr: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "4px",
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      Active Property
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AntSwitch
                        defaultChecked
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    </Stack>
                  </div>
                </Grid>
                <Grid md={4} sx={{ pl: 0, pr: 1 }}>
                  <Link href="/edit-property" target={"_blank"} sx={{ textDecoration: "none" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        noWrap
                        sx={{
                          display: "block",
                          fontSize: "12px",
                          color: "#6B6B6B",
                          cursor: "pointer",
                        }}
                      >
                        Edit Property
                      </Typography>
                      {p8icon}
                    </div>
                  </Link>
                </Grid>
                <Grid md={4} sx={{ pl: 0, pr: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{
                        display: "block",
                        fontSize: "12px",
                        color: "#6B6B6B",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </Typography>
                    {p9icon}
                  </div>
                </Grid>
              </Grid>
            </div>
          </FiCardActions>
        </FiCard>
      </Box>
      <UsersDialog
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
      />
    </>
  );
}

const view = [
  {
    icon: p5icon,
    text: "100review",
  },
  {
    icon: p6icon,
    text: "100review",
  },
  {
    icon: p7icon,
    text: "100review",
  },
];
