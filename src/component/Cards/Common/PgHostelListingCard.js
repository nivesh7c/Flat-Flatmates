import { Box, Paper, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import p1 from "../../../assets/png/icon/Banknotes.png";
import p2 from "../../../assets/png/icon/Group.png";
import p4 from "../../../assets/png/icon/Planner.png";
import p3 from "../../../assets/png/icon/StudioFloor.png";
import home from "../../../assets/png/room.png";
import {
    FiCard,
    FiCardActionArea,
    FiCardActions,
    FiCardContent
} from "../ContactedProperties/FullImageCard";
import { SHARING_TYPE_MAP, FURNISHING_TYPE_MAP } from "../../../constant";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";



const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: 0,
  // maxWidth: 400,
  color: theme.palette.text.primary,
}));

const p1icon = <img src={p1} style={{ marginRight: "5px", width: "auto" }} />;
const p2icon = <img src={p2} style={{ marginRight: "5px", width: "auto" }} />;
const p3icon = <img src={p3} style={{ marginRight: "5px", width: "auto" }} />;
const p4icon = <img src={p4} style={{ marginRight: "5px", width: "auto" }} />;

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

export default function PgHostelListing({data, selectedPropertyId}) {
  return (
    <>
      <Box
        sx={{
          border: data?.id === selectedPropertyId ? "2px solid #ffa321" : "1px solid #D9D9D9",
          p: 1,
          borderRadius: "5px",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <StyledPaper
            sx={{
              boxShadow: "none",
              mb: 1,
            }}
          >
            {/* <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar sx={{ width: 56, height: 56 }} src={user} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography noWrap variant="body2" sx={{ fontWeight: "500" }}>
                  Madhav
                </Typography>
                <Typography
                  noWrap
                  sx={{ fontWeight: "500", color: "#787878", fontSize: "12px" }}
                >
                  Looking for a male roomate
                </Typography>{" "}
                <Typography
                  noWrap
                  sx={{ fontWeight: "500", color: "#787878", fontSize: "12px" }}
                >
                  in Gurgaon
                </Typography>
              </Grid>
            </Grid> */}
          </StyledPaper>
        </Box>
        <FiCard
          sx={{
            card: {
              maxWidth: 345,
            },
            boxShadow: "none",
          }}
        >
          <FiCardActionArea>
            <FiCardContent
              sx={{
                color: "#ffffff",
                backgroundImage: `url(${data?.images ? data?.images : home})`,
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
                    {rupee} {data?.expected_rent}/mo
                  </Typography>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    //pl: 1,
                    pr: 1,
                  }}
                >
                  {/* <IconButton sx={{ color: "#fff" }}>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton sx={{ color: "#fff" }}>
                    <ShareIcon />
                  </IconButton> */}
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
                {/* 2BHK Apartment in {data?.city} */}
                {data?.sharing ? SHARING_TYPE_MAP[data?.sharing] : ""} Sharing PG/Hostel in {data?.city}
              </Typography>
              <Typography
                sx={{ color: "#6B6B6B", fontWeight: "500", fontSize: "12px" }}
              >
                {data?.area}
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
                      {data?.sharing ? SHARING_TYPE_MAP[data?.sharing] : ""} Sharing
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
                      {data?.furniture_type ? FURNISHING_TYPE_MAP[data?.furniture_type] : ""}
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
                      Deposit- {data?.expected_deposit ? data?.expected_deposit : "NA"}
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
                      Availability- {data?.availibilty}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </FiCardActions>
        </FiCard>
      </Box>
    </>
  );
}
