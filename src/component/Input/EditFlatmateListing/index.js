import { Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";

import { useAlert } from "react-alert";
import { postRequest, putRequest, putWWWRequest } from "../../../apis/baseApi";
import Successfully from "../../Dialog/Successfully";
import AddImage from "../../Input/ListFlatmate/AddImage";
import PropertyDetail1 from "../../Input/ListFlatmate/PropertyDetail1";
import PropertyDetail2 from "../../Input/ListFlatmate/PropertyDetail2";
import PropertyDetail3 from "../../Input/ListFlatmate/PropertyDetail3";

export default function EditFlatmateListing({ data }) {
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
    },
    step4: {
      images: [],
    },
  };

  useEffect(() => {
    if (data) {
      setFlatMateDetail({
        step1: {
          propertyType: data?.property_type,
          propertyAge: data?.property_age,
          furnishingType: data?.furniture_type,
          bhk: data?.bedrooms,
          bathrooms: data?.washrooms,
          balcony: data?.balcony,
          preferrerTenants: data?.avialable_for,
          parking: data?.parking,
        },
        step2: {
          floor: data?.floors,
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
    if (propertyId) {
      const body = ceateFlatmateListingRequest();
      setLoading(true);
      putRequest(
        `seller_dasboard/flatmates_details/${propertyId}/`,
        body
      )
        .then((res) => {
          if (res?.data?.status) {
            if (
              flatmateDetail?.step4?.images &&
              flatmateDetail?.step4?.images.length >= 1
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
            isEdit={true}
          />
        );
      case 3:
        return (
          <PropertyDetail2
            setStep={setStep}
            flatmateDetail={flatmateDetail}
            setFlatMateDetail={setFlatMateDetail}
            isEdit={true}
          />
        );
      case 4:
        return (
          <PropertyDetail3
            setStep={setStep}
            flatmateDetail={flatmateDetail}
            setFlatMateDetail={setFlatMateDetail}
            isEdit={true}
          />
        );
      case 5:
        return (
          <AddImage
            setStep={setStep}
            flatmateDetail={flatmateDetail}
            setFlatMateDetail={setFlatMateDetail}
            createFlatmateListing={createFlatmateListing}
            isEdit={true}
            propertyId={propertyId}
          />
        );
      default:
        return (
          <PropertyDetail1
            setStep={setStep}
            flatmateDetail={flatmateDetail}
            setFlatMateDetail={setFlatMateDetail}
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
