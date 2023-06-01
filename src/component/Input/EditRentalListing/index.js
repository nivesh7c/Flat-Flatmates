import { Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";

import { useAlert } from "react-alert";
import { postRequest, putRequest, putWWWRequest } from "../../../apis/baseApi";
import Successfully from "../../Dialog/Successfully";
import AddImage from "../../Input/ListRentalProperty/AddImage";
import PropertyDetail1 from "../../Input/ListRentalProperty/PropertyDetail1";
import PropertyDetail2 from "../../Input/ListRentalProperty/PropertyDetail2";
import PropertyDetail3 from "../../Input/ListRentalProperty/PropertyDetail3";

export default function EditRentalListing({ data }) {
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
    },
    step4: {
      images: [],
    },
  };

  useEffect(() => {
    if (data) {
      setRentalDetail({
        step1: {
          propertyType: data?.property_type,
          propertyAge: data?.property_age,
          furnishingType: data?.furnishing,
          bhk: data?.bedrooms,
          bathrooms: data?.washrooms,
          balcony: data?.balcony,
          //   preferrerTenants: data?.avialable_for,
          parking: data?.parking,
        },
        step2: {
          floor: data?.floors,
          totalFloors: data?.total_floor,
          availableFrom: data?.availibilty,
          expectedRent: data?.expected_rent,
          expectedDeposit: data?.expected_deposit,
          monthlyMaintainence: data?.monthly_maintenance_choices,
          areaSize: data?.area_size,
          waterSupply: data?.water_supply,
          availableFor: data?.avilable_for,
          preferrerTenants: data?.preferred_tennants,
          otherAmenities: {
            ac: data?.ac ? data?.ac : false,
            wifi: data?.wifi ? data?.wifi : false,
            lift: data?.lift ? data?.lift : false,
            laundary: data?.laundary ? data?.laundary : false,
            swimming: data?.swimming ? data?.swimming : false,
            gym: data?.gym ? data?.gym : false,
            shopping: data?.shopping ? data?.shopping : false,
            waterPurifier: data?.water_purifier ? data?.water_purifier : false,
            security: data?.security_gaurd ? data?.security_gaurd : false,
            maid: data?.maid ? data?.maid : false,
            clubhouse: data?.club_house ? data?.club_house : false,
            park: data?.park ? data?.park : false,
            cctv: data?.cctv ? data?.cctv : false,
          },
          guest: data?.guest_or_opposite_sex_allow,
          vegetarian: data?.food_allow,
          food: data?.food,
        },
        step3: {
          description: data?.description,
          area: data?.area,
          addressLine: data?.adress_line_1,
          pincode: data?.pincode,
          city: data?.city,
          whatsAppNumber: data?.contact_number,
          facebookUsername: data?.fb_user_name,
          lat: data?.lat,
          long: data?.long
        },
        step4: {
          images: [],
        },
      });
      setPropertyId(data?.id);
    }
  }, [data]);

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
      preferred_tennants: rentalDetail?.step2?.preferrerTenants,
      avilable_for: rentalDetail?.step2?.availableFor,
      expected_rent: rentalDetail?.step2?.expectedRent,
      expected_deposit: rentalDetail?.step2?.expectedDeposit,
      area_size: rentalDetail?.step2?.areaSize,
      availibilty: rentalDetail?.step2?.availableFrom,
      property_type: rentalDetail?.step2?.propertyType,
      bedrooms: rentalDetail?.step1?.bedrooms,
      washrooms: rentalDetail?.step1?.bathrooms,
      furnishing: rentalDetail?.step1?.furnishingType,
      maid: rentalDetail?.step2?.otherAmenities?.maid,
      guest_or_opposite_sex_allow: rentalDetail?.step2?.guest,
      floors: rentalDetail?.step2?.floor,
      total_floor: rentalDetail?.step2?.totalFloors,
      monthly_maintenance_choices: rentalDetail?.step2?.monthlyMaintainence,
      property_age: rentalDetail?.step1?.propertyAge,
      parking: rentalDetail?.step1?.parking,
      balcony: rentalDetail?.step1?.balcony,
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
    if (propertyId) {
      const body = ceateRentalListingRequest();
      putRequest(
        `seller_dasboard/rent_properties_details_view/${propertyId}/`,
        body
      )
        .then((res) => {
          if (res?.data?.status) {
            if (
              rentalDetail?.step4?.images &&
              rentalDetail?.step4?.images.length >= 1
            ) {
              alert.success(
                "Listing Edited successfully. Updating Property Image.."
              );
              addImages(propertyId, setLoading);
            } else setListingSuccess(true);
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
      alert.error("Property missing!!");
    }
  };

  const addImages = (proId, setLoading) => {
    if (proId) {
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
            isEdit={true}
          />
        );
      case 3:
        return (
          <PropertyDetail2
            setStep={setStep}
            flatmateDetail={rentalDetail}
            setFlatMateDetail={setRentalDetail}
            isEdit={true}
          />
        );
      case 4:
        return (
          <PropertyDetail3
            setStep={setStep}
            flatmateDetail={rentalDetail}
            setFlatMateDetail={setRentalDetail}
            isEdit={true}
          />
        );
      case 5:
        return (
          <AddImage
            setStep={setStep}
            flatmateDetail={rentalDetail}
            setFlatMateDetail={setRentalDetail}
            createFlatmateListing={createRentalListing}
            isEdit={true}
            propertyId={propertyId}
          />
        );
      default:
        return (
          <PropertyDetail1
            setStep={setStep}
            flatmateDetail={rentalDetail}
            setFlatMateDetail={setRentalDetail}
            isEdit={true}
          />
        );
    }
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center", p: 0 }}
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
        <Successfully
          open={listingSuccess}
          setOpen={setListingSuccess}
          isEdit={true}
        />
      </Container>
    </>
  );
}
