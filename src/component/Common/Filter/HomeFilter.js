import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Chip, IconButton, ListItem, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import PreferenceDialog from "../../Dialog/PreferenceDialog";
import planner from "../../../assets/svg/Planner.svg";
import bhk from "../../../assets/svg/dot.svg";
import { GENDER_MAP, SHARING_TYPE_MAP, getBHKTitle } from "../../../constant";

const PlannerIcon = () => {
  return (
    <div style={{ padding: "5px", paddingBottom: "0px" }}>
      <img
        src={planner}
        height="20px"
        style={{ marginRight: "-10px" }}
        alt="icon"
      />
    </div>
  );
};

const BHKIcon = () => {
  return (
    <div style={{ padding: "5px", paddingBottom: "0px" }}>
      <img
        src={bhk}
        height="15px"
        style={{ marginRight: "-10px" }}
        alt="icon"
      />
    </div>
  );
};

export default function HomeFilter({
  type,
  refreshData = () => {},
  isListing = false,
  isRefresh = false
}) {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Location", icons: <LocationOnOutlinedIcon /> },
    { key: 1, label: "Budget", icons: <CurrencyRupee /> },
    { key: 2, label: "Apartment", icons: <ApartmentIcon /> },
    { key: 3, label: "Bedrooms", icons: <BHKIcon /> },
    { key: 4, label: "Availability", icons: <PlannerIcon /> },
  ]);
  const [open, setOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const propertyType = localStorage.getItem("property_type");

  const getPreference = () => {
    switch (propertyType) {
      case "RENT":
        return localStorage.getItem("RENT_PREFERENCES")
          ? JSON.parse(localStorage.getItem("RENT_PREFERENCES"))
          : {};
      case "RENT_SHARED":
        return localStorage.getItem("RENT_SHARED_PREFERENCES")
          ? JSON.parse(localStorage.getItem("RENT_SHARED_PREFERENCES"))
          : {};
      case "FLATMATES":
        return localStorage.getItem("FLATMATES_PREFERENCES")
          ? JSON.parse(localStorage.getItem("FLATMATES_PREFERENCES"))
          : {};
    }
  };

  const [prefData, setPrefData] = useState(getPreference());

  useEffect(() => {
    if (refresh) {
      setPrefData(getPreference());
      setRefresh(false);
      refreshData(true);
    }
  }, [refresh]);

  useEffect(() => {
    setPrefData(getPreference());
  }, [isRefresh])

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          className="scrollchipgrid"
          style={{ width: "85vw", overflowX: "scroll", marginRight: "10px" }}
        >
          <Paper
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              boxShadow: "none",
              listStyle: "none",
              p: 0.9,
              pl: 0,
              m: 0,
              backgroundColor: "transparent",
            }}
            component="ul"
          >
            {prefData?.city && (
              <ListItem key={prefData?.city} sx={{ pl: 0, width: "auto" }}>
                <Chip
                  variant="outlined"
                  icon={<LocationOnOutlinedIcon />}
                  label={prefData?.city}
                  sx={{ backgroundColor: "#FFF" }}
                />
              </ListItem>
            )}
            {prefData?.rent && (
              <ListItem key={prefData?.rent} sx={{ pl: 0, width: "auto" }}>
                <Chip
                  variant="outlined"
                  icon={<CurrencyRupee />}
                  label={prefData?.rent}
                  sx={{ backgroundColor: "#FFF" }}
                />
              </ListItem>
            )}
            {propertyType === "RENT" && prefData?.propertyType && (
              <ListItem
                key={prefData?.propertyType}
                sx={{ pl: 0, width: "auto" }}
              >
                <Chip
                  variant="outlined"
                  icon={<ApartmentIcon />}
                  label={prefData?.propertyType}
                  sx={{ backgroundColor: "#FFF" }}
                />
              </ListItem>
            )}
            {(propertyType === "RENT_SHARED" || propertyType === "FLATMATES") &&
              prefData?.gender && (
                <ListItem key={prefData?.gender} sx={{ pl: 0, width: "auto" }}>
                  <Chip
                    variant="outlined"
                    icon={<ApartmentIcon />}
                    label={GENDER_MAP[prefData?.gender]}
                    sx={{ backgroundColor: "#FFF" }}
                  />
                </ListItem>
              )}
            {prefData?.availability && (
              <ListItem
                key={prefData?.availability}
                sx={{ pl: 0, width: "auto" }}
              >
                <Chip
                  variant="outlined"
                  icon={<PlannerIcon />}
                  label={prefData?.availability}
                  sx={{ backgroundColor: "#FFF" }}
                />
              </ListItem>
            )}
            {((propertyType === "RENT" && prefData?.bhk) ||
              prefData?.bhk === 0) && (
              <ListItem key={prefData?.bhk} sx={{ pl: 0, width: "auto" }}>
                <Chip
                  variant="outlined"
                  icon={<BHKIcon />}
                  label={prefData?.bhk === 0 ? "1RK" : `${getBHKTitle(prefData?.bhk)}`}
                  sx={{ backgroundColor: "#FFF" }}
                />
              </ListItem>
            )}
            {(propertyType === "RENT_SHARED" || propertyType === "FLATMATES") &&
              prefData?.sharingType && (
                <ListItem
                  key={prefData?.sharingType}
                  sx={{ pl: 0, width: "auto" }}
                >
                  <Chip
                    variant="outlined"
                    icon={<BHKIcon />}
                    label={SHARING_TYPE_MAP[prefData?.sharingType]}
                    sx={{ backgroundColor: "#FFF" }}
                  />
                </ListItem>
              )}
          </Paper>
        </div>
        <div
          style={{ width: "15vw", paddingLeft: "20px", display: "contents" }}
        >
          <IconButton
            sx={{ border: "1px solid #ABA7A7", backgroundColor: "#FFF" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <FormatListBulletedRoundedIcon />
          </IconButton>
        </div>
      </div>
      <PreferenceDialog
        open={open}
        setOpen={setOpen}
        type={type}
        setRefresh={setRefresh}
        isListing={isListing}
      />
    </>
  );
}
