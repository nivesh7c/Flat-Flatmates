import { Container, Paper, Box } from "@mui/material";
import React, { useState } from "react";
import SecondLayout from "../../component/Common/Layout/SecondLayout";

import { styled } from "@mui/material/styles";
import { useAlert } from "react-alert";
import { postRequest } from "../../apis/baseApi";
import bg from "../../assets/svg/bg.svg";
import Successfully from "../../component/Dialog/Successfully";
import AddImage from "../../component/Input/ListFlatmate/AddImage";
import PropertyDetail1 from "../../component/Input/ListFlatmate/PropertyDetail1";
import PropertyDetail2 from "../../component/Input/ListFlatmate/PropertyDetail2";
import PropertyDetail3 from "../../component/Input/ListFlatmate/PropertyDetail3";

import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BackPanel = styled("div")(({ theme }) => ({
  width: "100%",
  height: "auto",
  position: "absolute",
  backgroundImage: `url(${bg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  //position: "fixed",
  [theme.breakpoints.only("xs")]: {
    backgroundImage: "none",
    backgroundColor: "#fff",
    height: "auto",
  },
}));

export default function ListFlatmates() {
  const [step, setStep] = useState(2);
  const alert = useAlert();
  const initialState = {
    step1: {
      propertyType: "",
      propertyAge: "",
      furnishingType: "",
      bhk: "",
      bathrooms: "",
      balcony: "",
      preferrerTenants: "",
      parking: "",
    },
    step2: {
      floor: "Ground Floor",
      totalFloors: "Ground Only",
      availableFrom: "immediate",
      expectedRent: "",
      expectedDeposit: "",
      monthlyMaintainence: "",
      areaSize: "",
      waterSupply: "",
      availableFor: "",
      otherAmenities: {
        ac: false,
        wifi: false,
        lift: false,
        laundary: false,
        swimming: false,
        gym: false,
        shopping: false,
        waterPurifier: false,
        security: false,
        maid: false,
        clubhouse: false,
        park: false,
        cctv: false,
      },
      guest: "",
      vegetarian: "",
    },
    step3: {
      description: "",
      area: "",
      addressLine: "",
      pincode: "",
      city: "Delhi",
      whatsAppNumber: "",
      facebookUsername: "",
      lat: "",
      long: ""
    },
    step4: {
      images: [],
    },
  };
  const [flatmateDetail, setFlatMateDetail] = useState(initialState);
  const [listingSuccess, setListingSuccess] = useState(false);

  const [propertyId, setPropertyId] = useState(null);

  const ceateFlatmateListingRequest = () => {
    return {
      property_code: "",
      address_line_1: flatmateDetail?.step3?.addressLine,
      address_line_2: "",
      area: flatmateDetail?.step3?.area,
      city: flatmateDetail?.step3?.city,
      pincode: flatmateDetail?.step3?.pincode,
      state: "",
      lat: flatmateDetail?.step3?.lat,
      long: flatmateDetail?.step3?.long,
      avialable_for: flatmateDetail?.step1?.preferrerTenants,
      avilable_for: flatmateDetail?.step2?.availableFor,
      expected_rent: flatmateDetail?.step2?.expectedRent,
      expected_deposit: flatmateDetail?.step2?.expectedDeposit,
      area_size: flatmateDetail?.step2?.areaSize,
      availibilty: flatmateDetail?.step2?.availableFrom,
      property_type: flatmateDetail?.step1?.propertyType,
      bedrooms: flatmateDetail?.step1?.bhk,
      washrooms: flatmateDetail?.step1?.bathrooms,
      furniture_type: flatmateDetail?.step1?.furnishingType,
      maid: flatmateDetail?.step2?.otherAmenities?.maid,
      guest_or_opposite_sex_allow: flatmateDetail?.step2?.guest,
      floors: flatmateDetail?.step2?.floor,
      total_floor: flatmateDetail?.step2?.totalFloors,
      monthly_maintenance: flatmateDetail?.step2?.monthlyMaintainence,
      property_age: flatmateDetail?.step1?.propertyAge,
      parking: flatmateDetail?.step1?.parking,
      balcony: flatmateDetail?.step1?.balcony,
      club_house: flatmateDetail?.step2?.otherAmenities?.clubhouse,
      water_purifier: flatmateDetail?.step2?.otherAmenities?.waterPurifier,
      gym: flatmateDetail?.step2?.otherAmenities?.gym,
      water_supply: flatmateDetail?.step2?.waterSupply,
      laundary: flatmateDetail?.step2?.otherAmenities?.laundary,
      wifi: flatmateDetail?.step2?.otherAmenities?.wifi,
      lift: flatmateDetail?.step2?.otherAmenities?.lift,
      security_gaurd: flatmateDetail?.step2?.otherAmenities?.security,
      cctv: flatmateDetail?.step2?.otherAmenities?.cctv,
      owner_name: "",
      ac: flatmateDetail?.step2?.otherAmenities?.ac,
      fb_link: flatmateDetail?.step3?.facebookUsername,
      description: flatmateDetail?.step3?.description,
      contact_number: flatmateDetail?.step3?.whatsAppNumber,
      food_allow: flatmateDetail?.step2?.vegetarian,
    };
  };

  const createFlatmateListing = (setLoading) => {
    if (
      flatmateDetail?.step4?.images &&
      flatmateDetail?.step4?.images.length >= 1
    ) {
      if (!propertyId) {
        const body = ceateFlatmateListingRequest();
        setLoading(true);
        postRequest("seller_dasboard/flatmates_list/", body)
          .then((res) => {
            if (res?.data?.status) {
              alert.success(
                "Listing added successfully. Uploading Property Image.."
              );
              setPropertyId(res?.data?.data?.id);
              addImages(res?.data?.data?.id, setLoading);
            } else {
              alert.error("Error in listing flatmates!!");
              setLoading(false);
            }
          })
          .catch((err) => {
            setLoading(false);
            alert.error("Something went wrong. Please try again!!");
          });
      } else {
        setLoading(true);
        addImages(propertyId, setLoading);
      }
    } else {
      alert.error("Please add atleast 1 property image!");
    }
  };

  const addImages = (proId, setLoading) => {
    if (
      proId &&
      flatmateDetail?.step4?.images &&
      flatmateDetail?.step4?.images.length >= 1
    ) {
      const body = new FormData();
      flatmateDetail?.step4?.images.forEach((item) => {
        body.append("image", item);
      });

      setLoading(true);
      postRequest(
        `seller_dasboard/flatmates_add_properties_images/${proId}/`,
        body
      )
        .then((res) => {
          if (res?.data?.status) {
            alert.success("Images Uploaded Successfully!!");
            setListingSuccess(true);
          } else {
            alert.error("Error in uploading Images!!");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          alert.error("Something went wrong. Please try again!!");
        });
    } else {
      alert.error("Please add atleast 1 property image!");
    }
  };

  function getStepComponent() {
    switch (step) {
      // case 1:
      //     return <UserDetail setStep={setStep}/>
      case 2:
        return (
          <PropertyDetail1
            setStep={setStep}
            flatmateDetail={flatmateDetail}
            setFlatMateDetail={setFlatMateDetail}
          />
        );
      case 3:
        return (
          <PropertyDetail2
            setStep={setStep}
            flatmateDetail={flatmateDetail}
            setFlatMateDetail={setFlatMateDetail}
          />
        );
      case 4:
        return (
          <PropertyDetail3
            setStep={setStep}
            flatmateDetail={flatmateDetail}
            setFlatMateDetail={setFlatMateDetail}
          />
        );
      case 5:
        return (
          <AddImage
            setStep={setStep}
            flatmateDetail={flatmateDetail}
            setFlatMateDetail={setFlatMateDetail}
            createFlatmateListing={createFlatmateListing}
          />
        );
      default:
        return (
          <PropertyDetail1
            setStep={setStep}
            flatmateDetail={flatmateDetail}
            setFlatMateDetail={setFlatMateDetail}
          />
        );
    }
  }

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box>
        <SecondLayout>
          <BackPanel>
            <Container
              maxWidth="lg"
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {" "}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  maxWidth: 460,
                  minHeight: "500px",
                  mt: [2, 5, 10],
                  borderRadius: "16px",
                  flexGrow: 1,
                  mb: 10,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                {getStepComponent()}
              </Paper>
              <Successfully open={listingSuccess} setOpen={setListingSuccess} />
            </Container>
          </BackPanel>
        </SecondLayout>
      </Box>
      {/* <Box>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          sx={{ display: { xs: "block", sm: "none", md: "none" } }}
        >
          <AppBar
            sx={{
              position: "relative",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 2px 0px #0000005E",
            }}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="primary"
                onClick={handleClose}
                aria-label="close"
              >
                <ArrowBackIosIcon />
              </IconButton>
              <Typography
                color="primary"
                sx={{ ml: 2, flex: 1, textAlign: "center" }}
                variant="h6"
                component="div"
              >
                Flat and Flatmates
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ p: 2 }}> {getStepComponent()}</Box>
        </Dialog>
      </Box> */}
    </>
  );
}
