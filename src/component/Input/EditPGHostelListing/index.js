import { Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";

import { useAlert } from "react-alert";
import { postRequest, putRequest, putWWWRequest } from "../../../apis/baseApi";
import Successfully from "../../Dialog/Successfully";
import AddImage from "../../Input/ListPgHostel/AddImage";
import PropertyDetail1 from "../../Input/ListPgHostel/PropertyDetail1";
import PropertyDetail2 from "../../Input/ListPgHostel/PropertyDetail2";
import PropertyDetail3 from "../../Input/ListPgHostel/PropertyDetail3";

export default function EditPGHostelListing({ data }) {
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
      foodAllowed: "",
      sharing: "",
    },
    step2: {
      floor: "ground floor",
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
      setPgDetail({
        step1: {
          propertyType: data?.property_type,
          propertyAge: data?.property_age,
          furnishingType: data?.furniture_type,
          bhk: data?.bedrooms,
          bathrooms: data?.bathroom,
          balcony: data?.balcony,
          preferrerTenants: data?.avialable_for,
          parking: data?.parking,
          sharing: data?.sharing,
          foodAllowed: data?.food_allow,
        },
        step2: {
          floor: data?.on_floor,
          totalFloors: data?.total_floor,
          availableFrom: data?.availibilty,
          expectedRent: data?.expected_rent,
          expectedDeposit: data?.expected_deposit,
          monthlyMaintainence: data?.monthly_maintenance,
          areaSize: data?.area_size,
          waterSupply: data?.water_supply,
          availableFor: data?.avilable_for,
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
          addressLine: data?.address_line_1,
          pincode: data?.pincode,
          city: data?.city,
          whatsAppNumber: data?.contact_number,
          facebookUsername: data?.fb_link,
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

  const [pgDetail, setPgDetail] = useState(initialState);

  const ceatePgHostelListingRequest = () => {
    return {
      property_code: "",
      address_line_1: pgDetail?.step3?.addressLine,
      address_line_2: "",
      area: pgDetail?.step3?.area,
      city: pgDetail?.step3?.city,
      pincode: pgDetail?.step3?.pincode,
      state: "",
      lat: pgDetail?.step3?.lat,
      long: pgDetail?.step3?.long,
      avialable_for: pgDetail?.step2?.preferrerTenants,
      avilable_for: pgDetail?.step2?.availableFor,
      expected_rent: pgDetail?.step2?.expectedRent,
      expected_deposit: pgDetail?.step2?.expectedDeposit,
      area_size: pgDetail?.step2?.areaSize,
      availibilty: pgDetail?.step2?.availableFrom,
      property_type: pgDetail?.step2?.propertyType,
      bedrooms: pgDetail?.step1?.bedrooms,
      bathroom: pgDetail?.step1?.bathrooms,
      furniture_type: pgDetail?.step1?.furnishingType,
      maid: pgDetail?.step2?.otherAmenities?.maid,
      guest_or_opposite_sex_allow: pgDetail?.step2?.guest,
      on_floor: pgDetail?.step2?.floor,
      total_floor: pgDetail?.step2?.totalFloors,
      monthly_maintenance: pgDetail?.step2?.monthlyMaintainence,
      property_age: pgDetail?.step1?.propertyAge,
      parking: pgDetail?.step1?.parking,
      balcony: pgDetail?.step1?.balcony,
      club_house: pgDetail?.step2?.otherAmenities?.clubhouse,
      water_purifier: pgDetail?.step2?.otherAmenities?.waterPurifier,
      gym: pgDetail?.step2?.otherAmenities?.gym,
      water_supply: pgDetail?.step2?.waterSupply,
      laundary: pgDetail?.step2?.otherAmenities?.laundary,
      wifi: pgDetail?.step2?.otherAmenities?.wifi,
      lift: pgDetail?.step2?.otherAmenities?.lift,
      security_gaurd: pgDetail?.step2?.otherAmenities?.security,
      cctv: pgDetail?.step2?.otherAmenities?.cctv,
      owner_name: "",
      ac: pgDetail?.step2?.otherAmenities?.ac,
      fb_link: pgDetail?.step3?.facebookUsername,
      description: pgDetail?.step3?.description,
      contact_number: pgDetail?.step3?.whatsAppNumber,
      food_allow: pgDetail?.step1?.foodAllowed,
      food: pgDetail?.step2?.food,
      sharing: pgDetail?.step1?.sharing,
    };
  };

  const [propertyId, setPropertyId] = useState(null);

  const createPgHostelListing = (setLoading) => {
    if (propertyId) {
      const body = ceatePgHostelListingRequest();
      setLoading(true);
      putRequest(
        `seller_dasboard/pg_hostel_details/${propertyId}/`,
        body
      )
        .then((res) => {
          if (res?.data?.status) {
            if (
              pgDetail?.step4?.images &&
              pgDetail?.step4?.images.length >= 1
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
      pgDetail?.step4?.images.forEach((item) => {
        body.append("image", item);
      });

      setLoading(true);
      postRequest(
        `seller_dasboard/pg_hostel_add_properties_images/${proId}/`,
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
            flatmateDetail={pgDetail}
            setFlatMateDetail={setPgDetail}
            isEdit={true}
          />
        );
      case 3:
        return (
          <PropertyDetail2
            setStep={setStep}
            flatmateDetail={pgDetail}
            setFlatMateDetail={setPgDetail}
            isEdit={true}
          />
        );
      case 4:
        return (
          <PropertyDetail3
            setStep={setStep}
            flatmateDetail={pgDetail}
            setFlatMateDetail={setPgDetail}
            isEdit={true}
          />
        );
      case 5:
        return (
          <AddImage
            setStep={setStep}
            flatmateDetail={pgDetail}
            setFlatMateDetail={setPgDetail}
            createFlatmateListing={createPgHostelListing}
            isEdit={true}
            propertyId={propertyId}
          />
        );
      default:
        return (
          <PropertyDetail1
            setStep={setStep}
            flatmateDetail={pgDetail}
            setFlatMateDetail={setPgDetail}
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
