import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { EffectFade, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import p1 from "../../../assets/png/icon/Banknotes.png";
import p6 from "../../../assets/png/icon/EmptyBed.png";
import p7 from "../../../assets/png/icon/Garage.png";
import p2 from "../../../assets/png/icon/Group.png";
import fmsg from "../../../assets/png/icon/messenger.png";
import p8 from "../../../assets/png/icon/Shower.png";
import p4 from "../../../assets/png/icon/smallApartment.png";
import p5 from "../../../assets/png/icon/Sofa.png";
import p3 from "../../../assets/png/icon/StudioFloor.png";
import whatsup from "../../../assets/png/icon/WhatsApp.png";
import home from "../../../assets/png/room.png";
import user from "../../../assets/png/user.jpg";
import { FiCard, FiCardActionArea, FiCardActions } from "./FullImageCard";
// Import Swiper styles
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { FURNISHING_TYPE_MAP, getBHKTitle, SHARING_TYPE_MAP } from "../../../constant";
import "../../../css/flatemateRentalDetail.css";
import { DislikeItem, HeartItem, LikeItem } from "./LikeItem";

import { AMENITIES } from "../../../constant";

import { useTheme } from "@mui/material/styles";
import {
  addDoc,
  collection, onSnapshot, query, where
} from "firebase/firestore";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { fireStoreDb } from "../../../utility/firebase";
import AmenitiesComponent from "../../Common/Amenities";
import ContactDetailDialog from "../../Dialog/ContactDetail";
import LoginDialog from "../../Dialog/LoginDialog";
import LatLongMapPicker from "../../Input/LatLongPicker";


SwiperCore.use([Navigation]);

const color4 = "#000000";
const color5 = "#37474F00";

// import "./styles.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: 0,
  // maxWidth: 400,
  color: theme.palette.text.primary,
}));

const p1icon = <img src={p1} style={{ marginRight: "5px" }} />;
const p2icon = <img src={p2} style={{ marginRight: "5px" }} />;
const p3icon = <img src={p3} style={{ marginRight: "5px" }} />;
const p4icon = <img src={p4} style={{ marginRight: "5px" }} />;
const p5icon = <img src={p5} style={{ marginRight: "5px" }} />;
const p6icon = <img src={p6} style={{ marginRight: "5px" }} />;
const p7icon = <img src={p7} style={{ marginRight: "5px" }} />;
const p8icon = <img src={p8} style={{ marginRight: "5px" }} />;

const whatupicon = <img src={whatsup} style={{ marginRight: "5px" }} />;
const fbicon = <img src={fmsg} style={{ marginRight: "5px" }} />;

const homePic = <img src={home} height="300px" />;

const whatupStyle = {
  borderColor: "#40C351",
  color: "#40C351",
  textTransform: "inherit",
  fontWeight: "600",
  "&:hover": {
    borderColor: "#40C351",
    color: "#40C351",
  },
};

const fmsgStyle = {
  borderColor: "#367CFF",
  color: "#367CFF",
  textTransform: "inherit",
  fontWeight: "600",
  "&:hover": {
    borderColor: "#367CFF",
    color: "#40C351",
  },
};

const rupee = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 25 25"
    fill="#000"
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

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
  marginLeft: "0px",
}));

export default function ViewApartment({
  propertyData,
  type,
  listType = null,
  setCurrentIndex = () => {},
  currentIndex = null,
  liked = false,
  loved = false,
}) {

  const history = useHistory();

  const getDetailString = () => {
    let retStr = "";
    if (type === "pghostel")
      retStr += `${
        propertyData?.sharing ? SHARING_TYPE_MAP[propertyData?.sharing] : ""
      } Sharing PG/Hostel in ${propertyData?.city}`;
    else {
      retStr += `${
        propertyData?.bedrooms === 0 ? "1RK" : getBHKTitle(propertyData?.bedrooms)
      }  ${propertyData?.property_type} in ${propertyData?.city}`;
    }
    return retStr;
  };

  const getAmenityValue = (key) => {
    switch (key) {
      case "swimming":
        return propertyData?.swimming ? true : false;
      case "park":
        return propertyData?.park ? true : false;
      case "laundary":
        return propertyData?.laundary ? true : false;
      case "shopping":
        return propertyData?.shopping ? true : false;
      case "clubhouse":
        return propertyData?.club_house ? true : false;
      case "maid":
        return propertyData?.maid ? true : false;
      case "cctv":
        return propertyData?.cctv ? true : false;
      case "wifi":
        return propertyData?.wifi ? true : false;
      case "security":
        return propertyData?.security_gaurd ? true : false;
      case "gym":
        return propertyData?.gym ? true : false;
      case "waterPurifier":
        return propertyData?.water_purifier ? true : false;
      case "lift":
        return propertyData?.lift ? true : false;
      case "ac":
        return propertyData?.ac ? true : false;
    }
  };

  const isLoggedIn = localStorage?.getItem("token") ? true : false;

  const [open, setOpen] = useState(false);

  const [contactOpen, setContactOpen] = useState(false);

  const theme = useTheme();

  const alert = useAlert();

  const chatWithOwner = () => {
    const groupName = getDetailString();
    const userDetails = JSON.parse(localStorage.getItem('user_details'));
    let alreadyContacted = false;
    const chatRoomQuery = query(
      collection(fireStoreDb, "CHATROOM"),
      where("propertyType", "==", type),
      where("propertyId", "==", propertyData?.id),
      where("userSlug", "==", userDetails?.slug),
      where("ownerSlug", "==", propertyData?.posted_by?.slug),
      // where("deleted", "!=", true)
    );
    
    const test = onSnapshot(chatRoomQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        alreadyContacted = true;
      });
      if(!alreadyContacted){
      const data = { 
        name: groupName,
        //  groupTab: currentTab, 
         id: Math.floor(Math.random() * 100000), 
         latestMessage: { text: `Hi, I am interested in ${groupName}.`, createdAt: new Date().getTime(), }, 
         propertyType: type,
         propertyId: propertyData?.id,
         userSlug: userDetails?.slug,
         ownerSlug: propertyData?.posted_by?.slug,
         userName: userDetails?.first_name + " " + userDetails?.last_name,
         ownerName: propertyData?.posted_by?.first_name + " " + propertyData?.posted_by?.last_name,
         groupCreatedAt: new Date().getTime(),
         groupIcon: propertyData?.images?.length > 0 ? propertyData?.images[0] : "",
         area: propertyData?.area,
         city: propertyData?.city,
         deleted: false
        };
        
         const docRef = addDoc(
          collection(fireStoreDb, "CHATROOM"),
          data
        ).then((res) =>
          addDoc(collection(res, "MESSAGES"), {
            text: `Hi, I am interested in ${groupName}.`,
            createdAt: new Date().getTime(),
            system: true,
          })
        );
      }
      const pushUrl = `/chat-with-owner/?propertyType=${type}&propertyId=${propertyData?.id}`
      history.push(pushUrl);
    });
    
  }


  return (
    <>
      <Box
        sx={{
          border: "1px solid #D9D9D9",
          p: 1,
          borderRadius: "5px",
          backgroundColor: "#fff",
        }}
      >
        <FiCard
          sx={{
            card: {
              maxWidth: 345,
            },
            boxShadow: "none",
          }}
        >
          <FiCardActionArea>
            <Swiper
              id="swiper-detail"
              spaceBetween={30}
              effect={"fade"}
              navigation={true}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              modules={[EffectFade, Navigation, Pagination]}
              // className="mySwiper"
            >
              {propertyData &&
                propertyData?.images?.map((item) => {
                  return (
                    <SwiperSlide>
                    <div style={{alignItems: "center", display: "flex",
  alignItems: "center",
  justifyContent: "center"}}>  
                      <img src={item} height="300px" />
                    </div>
                    </SwiperSlide>
                  );
                })}
              {propertyData?.images?.length === 0 && (
                <SwiperSlide>{homePic}</SwiperSlide>
              )}
            </Swiper>
            {type === "flatmates" && (
              <Box
                sx={{
                  // flexGrow: 1,
                  // overflow: "hidden",
                  backgroundImage: `linear-gradient(to right,  ${color4} 0%,${color5} 100%)`,
                  position: "absolute",
                  marginTop: "-80px",
                  zIndex: "10000",
                  width: "95%",
                }}
              >
                <StyledPaper
                  sx={{
                    boxShadow: "none",
                    mb: 1,
                  }}
                >
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar
                        sx={{ width: 56, height: 56, border: "2px solid #fff" }}
                        src={
                          propertyData?.posted_by?.profile_pic
                            ? propertyData?.posted_by?.profile_pic
                            : user
                        }
                      />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography
                        noWrap
                        variant="body2"
                        sx={{ fontWeight: "500", color: "#fff" }}
                      >
                        {!(
                          propertyData?.posted_by?.first_name ||
                          propertyData?.posted_by?.last_name
                        )
                          ? "FNF User"
                          : `${propertyData?.posted_by?.first_name} ${
                              propertyData?.posted_by?.last_name
                                ? propertyData?.posted_by?.last_name
                                : ""
                            }`}
                      </Typography>
                      <Typography
                        noWrap
                        sx={{
                          fontWeight: "500",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      >
                        Looking for a{" "}
                        {propertyData?.preferred_tennants
                          ? propertyData?.preferred_tennants
                          : propertyData?.avialable_for}{" "}
                        flatmate
                      </Typography>{" "}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          noWrap
                          variant="body2"
                          sx={{ fontWeight: "500", color: "#fff" }}
                        >
                          in {propertyData?.city}
                        </Typography>

                        <Typography
                          noWrap
                          sx={{
                            fontWeight: "500",
                            color: "#fff",
                            fontSize: "12px",
                          }}
                        >
                          {propertyData?.images?.length}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </Box>
            )}
          </FiCardActionArea>
          <FiCardActions
            sx={{
              display: "flex",
              flexDirection: "column",
              // height: "200px",
              height: "30vh",
              [theme.breakpoints.only("xs")]: {
                height: "35.6vh",
              },
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
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
                {getDetailString()}
              </Typography>
              <Typography
                sx={{ color: "#6B6B6B", fontWeight: "500", fontSize: "12px" }}
              >
                {propertyData?.area}
              </Typography>
            </div>
            <br />
            <div
              style={{
                width: "100%",
                margin: 0,
              }}
            >
              <Grid container spacing={2}>
                <Grid sm={12} md={12} xs={12}>
                  {getShortInfo(propertyData, type)}
                  <Grid md={12}>
                    <Typography
                      sx={{ color: "#6B6B6B", fontWeight: "600" }}
                      variant="body2"
                    >
                      Description
                    </Typography>
                  </Grid>
                  <Grid md={12}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      {propertyData?.description}
                    </Typography>
                  </Grid>
                  <Grid md={12}>
                    <Typography
                      sx={{ color: "#6B6B6B", fontWeight: "600" }}
                      variant="body2"
                    >
                      Amenities
                    </Typography>
                  </Grid>
                  <Grid md={12}>
                    <Grid container spacing={4}>
                      {AMENITIES.map((value, index) => (
                        <AmenitiesComponent
                          value={value}
                          amenity={getAmenityValue(value?.key)}
                          setAmenities={(value1) => {}}
                        />
                      ))}
                    </Grid>
                  </Grid>

                  {isLoggedIn && (
                      <>
                        <Grid container xs={12} sm={12} md={12}>
                          <Typography
                            sx={{ color: "#6B6B6B", fontWeight: "600" }}
                            variant="body2"
                          >
                            Contact Owner
                          </Typography>
                        </Grid>
                        {/* <div style={{display: "flex"}}> */}
                        <Grid xs={12} sm={12} md={12}>
                          <Grid container spacing={2}>
                            <Grid xs={6} sm={4} md={3} sx={{ display: "grid" }}>
                              <Button
                                variant="outlined"
                                style={whatupStyle}
                                onClick={() => {
                                  if (localStorage?.getItem("token")) {
                                    const url = `https://wa.me/${propertyData?.contact_number}`;
                                    window.open(url, "_blank");
                                    // setContactOpen(true);
                                  } else {
                                    setOpen(true);
                                  }
                                }}
                              >
                                {whatupicon} Whatsapp
                              </Button>
                            </Grid>
                            <Grid xs={6} sm={4} md={3} sx={{ display: "grid" }}>
                              <Button
                                variant="outlined"
                                style={fmsgStyle}
                                onClick={() => {
                                  if (localStorage?.getItem("token")) {
                                    const url = propertyData?.fb_link;
                                    window.open(url, "_blank");
                                  } else {
                                    setOpen(true);
                                  }
                                }}
                              >
                                {fbicon} Messenger
                              </Button>
                            </Grid>
                            <Grid
                              xs={6} sm={4} md={3}
                              sx={{ display: "grid" }}
                            >
                              <Button
                                variant="contained"
                                sx={{
                                  color: "#ffff",
                                  textTransform: "inherit",
                                  fontWeight: "500",
                                  boxShadow: "none",
                                  background:
                                    " linear-gradient(270deg, #FFA321 16.97%, #FFA321 19.3%, #FFC148 100%)",
                                }}
                                onClick={() => {
                                  if (localStorage?.getItem("token")) {
                                    // const url = `https://wa.me/${propertyData?.contact_number}`;
                                    // window.open(url, "_blank");
                                    setContactOpen(true);
                                  } else {
                                    setOpen(true);
                                  }
                                }}
                              >
                                Call owner
                              </Button>
                            </Grid>
                            <Grid
                              xs={6} sm={4} md={3}
                              sx={{ display: "grid" }}
                            >
                              <Button
                                variant="contained"
                                sx={{
                                  color: "#ffff",
                                  textTransform: "inherit",
                                  fontWeight: "500",
                                  boxShadow: "none",
                                  background:
                                    " linear-gradient(270deg, #FFA321 16.97%, #FFA321 19.3%, #FFC148 100%)",
                                }}
                                onClick={() => {
                                  if (localStorage?.getItem("token")) {
                                    // const url = `https://wa.me/${propertyData?.contact_number}`;
                                    // window.open(url, "_blank");
                                    chatWithOwner();
                                    
                                  } else {
                                    setOpen(true);
                                  }
                                }}
                              >
                                Chat
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>{" "}
                        {/* </div> */}
                      </>
                    )}
                  {propertyData?.lat && propertyData?.long ? (
                    <>
                      <Grid md={12}>
                        <Typography
                          sx={{ color: "#6B6B6B", fontWeight: "600" }}
                          variant="body2"
                        >
                          Maps
                        </Typography>
                      </Grid>

                      <Grid md={12}>
                        <LatLongMapPicker
                          lat={propertyData?.lat}
                          long={propertyData?.long}
                        />
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </Grid>
            </div>
          </FiCardActions>
        </FiCard>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-35px",
        }}
      >
        <DislikeItem
          type={type}
          propertyData={propertyData}
          listType={listType}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <HeartItem
          type={type}
          propertyData={propertyData}
          listType={listType}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          selected={loved}
        />
        <LikeItem
          type={type}
          propertyData={propertyData}
          listType={listType}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          selected={liked}
        />
      </div>
      <LoginDialog open={open} setOpen={setOpen} />
      <ContactDetailDialog
        open={contactOpen}
        setOpen={setContactOpen}
        type={type}
        ownerDetail={{
          fullName:
            propertyData?.posted_by?.first_name +
            propertyData?.posted_by?.last_name
              ? propertyData?.posted_by?.last_name
              : "",
          phoneNumber: propertyData?.contact_number,
          id: propertyData?.id,
        }}
      />
    </>
  );
}

function getShortInfo(propertyData, type) {
  return (
    <Grid container spacing={2}>
      <Grid md={6} sm={6} xs={6} sx={{ p: 0, pb: 2 }}>
        <div
          style={{
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {p2icon}
          <Typography
            noWrap
            sx={{
              display: "block",
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            {type === "pghostel"
              ? `${
                  propertyData?.sharing
                    ? SHARING_TYPE_MAP[propertyData?.sharing]
                    : ""
                } Sharing`
              : propertyData?.bedrooms === 0
              ? "1RK"
              : getBHKTitle(propertyData?.bedrooms)
            }
          </Typography>
        </div>
      </Grid>
      {type !== "pghostel" && (
        <Grid xs={6} sx={{ p: 0, pb: 2 }}>
          <div
            style={{
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {p3icon}
            <Typography
              noWrap
              sx={{
                display: "block",
                fontSize: "12px",
                color: "#6B6B6B",
              }}
            >
              {/* {type === 'pghostel' ? `${propertyData?.sharing ? SHARING_TYPE_MAP[propertyData?.sharing] : ""} Sharing` : (propertyData?.bedrooms === 0 ? "1RK" : `${propertyData?.bedrooms} BHK`)} */}
              {propertyData?.property_type},{" "}
              {propertyData?.area_size ? propertyData?.area_size : "NA"} sq. ft
            </Typography>
          </div>
        </Grid>
      )}
      <Grid xs={6} sx={{ p: 0, pb: 2 }}>
        <div
          style={{
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {p1icon}
          <Typography
            noWrap
            sx={{
              display: "block",
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            Rent -{propertyData?.expected_rent}
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
          {p1icon}
          <Typography
            noWrap
            sx={{
              display: "block",
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            Deposit -{propertyData?.expected_deposit}
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
          {p5icon}
          <Typography
            noWrap
            sx={{
              display: "block",
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            {type === "rental"
              ? FURNISHING_TYPE_MAP[propertyData?.furnishing]
              : FURNISHING_TYPE_MAP[propertyData?.furniture_type]}
          </Typography>
        </div>
      </Grid>
      {type !== "pghostel" && (
        <Grid xs={6} sx={{ p: 0, pb: 2 }}>
          <div
            style={{
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {p4icon}
            <Typography
              noWrap
              sx={{
                display: "block",
                fontSize: "12px",
                color: "#6B6B6B",
              }}
            >
              Floor {propertyData.floors}
            </Typography>
          </div>
        </Grid>
      )}
      <Grid xs={6} sx={{ p: 0, pb: 2 }}>
        <div
          style={{
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
          }}
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
            Parking - {propertyData?.parking}
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
          {p6icon}
          <Typography
            noWrap
            sx={{
              display: "block",
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            {type === "pghostel" ? "Available for" : "Bed"} -{" "}
            {type === "pghostel"
              ? propertyData?.avialable_for
              : propertyData?.bedrooms}
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
          {p8icon}
          <Typography
            noWrap
            sx={{
              display: "block",
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            Bathrooms -{" "}
            {type === "pghostel"
              ? propertyData?.bathroom
              : propertyData?.washrooms}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
