import { Container, Paper } from "@mui/material";
import { useState } from "react";
import SecondLayout from "../../component/Common/Layout/SecondLayout";

import { styled } from "@mui/material/styles";
import { useAlert } from "react-alert";
import { postRequest } from "../../apis/baseApi";
import bg from "../../assets/svg/bg.svg";
import Successfully from "../../component/Dialog/Successfully";
import AddImage from "../../component/Input/ListRentalProperty/AddImage";
import PropertyDetail1 from "../../component/Input/ListRentalProperty/PropertyDetail1";
import PropertyDetail2 from "../../component/Input/ListRentalProperty/PropertyDetail2";
import PropertyDetail3 from "../../component/Input/ListRentalProperty/PropertyDetail3";

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

export default function ListRentalProperty() {
  const [step, setStep] = useState(2);
  const alert = useAlert();
  const [listingSuccess, setListingSuccess] = useState(false);

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
      preferrerTenants: "",
      monthlyMaintainence: "",
      areaSize: "",
      waterSupply: "",
      availableFor: "",
      food: false,
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

  const [rentalDetail, setRentalDetail] = useState(initialState);

  const ceateRentalListingRequest = () => {
    return {
      property_code: "",
      adress_line_1: rentalDetail?.step3?.addressLine,
      adress_line_2: "",
      area: rentalDetail?.step3?.area,
      city: rentalDetail?.step3?.city,
      pincode: rentalDetail?.step3?.pincode,
      state: "",
      lat: rentalDetail?.step3?.lat,
      long: rentalDetail?.step3?.long,
      property_class: "public",
      avialable_for: rentalDetail?.step2?.preferrerTenants,
      avilable_for: rentalDetail?.step2?.availableFor,
      expected_rent: rentalDetail?.step2?.expectedRent,
      expected_deposit: rentalDetail?.step2?.expectedDeposit,
      area_size: rentalDetail?.step2?.areaSize,
      availibilty: rentalDetail?.step2?.availableFrom,
      property_type: rentalDetail?.step1?.propertyType,
      bedrooms: rentalDetail?.step1?.bhk,
      washrooms: rentalDetail?.step1?.bathrooms,
      furnishing: rentalDetail?.step1?.furnishingType,
      maid: rentalDetail?.step2?.otherAmenities?.maid,
      guest_or_opposite_sex_allow: rentalDetail?.step2?.guest,
      floors: rentalDetail?.step2?.floor,
      total_floor: rentalDetail?.step2?.totalFloors,
      monthly_maintenance: rentalDetail?.step2?.monthlyMaintainence,
      property_age: rentalDetail?.step1?.propertyAge,
      parking: rentalDetail?.step1?.parking,
      balcony: rentalDetail?.step1?.balcony,
      preferred_tennants: rentalDetail?.step2?.preferrerTenants,
      club_house: rentalDetail?.step2?.otherAmenities?.clubhouse,
      water_purifier: rentalDetail?.step2?.otherAmenities?.waterPurifier,
      gym: rentalDetail?.step2?.otherAmenities?.gym,
      water_supply: rentalDetail?.step2?.waterSupply,
      laundary: rentalDetail?.step2?.otherAmenities?.laundary,
      wifi: rentalDetail?.step2?.otherAmenities?.wifi,
      lift: rentalDetail?.step2?.otherAmenities?.lift,
      security_gaurd: rentalDetail?.step2?.otherAmenities?.security,
      cctv: rentalDetail?.step2?.otherAmenities?.cctv,
      owner_name: "",
      ac: rentalDetail?.step2?.otherAmenities?.ac,
      fb_user_name: rentalDetail?.step3?.facebookUsername,
      description: rentalDetail?.step3?.description,
      contact_number: rentalDetail?.step3?.whatsAppNumber,
      food_allow: rentalDetail?.step2?.vegetarian,
    };
  };

  const [propertyId, setPropertyId] = useState(null);

  const createRentalListing = (setLoading) => {
    if (
      rentalDetail?.step4?.images &&
      rentalDetail?.step4?.images.length >= 1
    ) {
      if (!propertyId) {
        const body = ceateRentalListingRequest();
        setLoading(true);
        postRequest("seller_dasboard/rent_properties_list/", body)
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
      rentalDetail?.step4?.images &&
      rentalDetail?.step4?.images.length >= 1
    ) {
      const body = new FormData();
      rentalDetail?.step4?.images.forEach((item) => {
        body.append("image", item);
      });

      setLoading(true);
      postRequest(
        `seller_dasboard/rent_properties_add_property_images/${proId}/`,
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
            flatmateDetail={rentalDetail}
            setFlatMateDetail={setRentalDetail}
          />
        );
      case 3:
        return (
          <PropertyDetail2
            setStep={setStep}
            flatmateDetail={rentalDetail}
            setFlatMateDetail={setRentalDetail}
          />
        );
      case 4:
        return (
          <PropertyDetail3
            setStep={setStep}
            flatmateDetail={rentalDetail}
            setFlatMateDetail={setRentalDetail}
          />
        );
      case 5:
        return (
          <AddImage
            setStep={setStep}
            flatmateDetail={rentalDetail}
            setFlatMateDetail={setRentalDetail}
            createFlatmateListing={createRentalListing}
          />
        );
      default:
        return (
          <PropertyDetail1
            setStep={setStep}
            flatmateDetail={rentalDetail}
            setFlatMateDetail={setRentalDetail}
          />
        );
    }
  }

  return (
    <>
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
    </>
  );
}
