import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useAlert } from "react-alert";
import { CommonButton } from "../../Cards/Common/CommonButton";
import { useState } from "react";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    // width: "50%",
    //margin: theme.spacing(0.5),
    // margin: "10px",
    border: "1px solid #D7D7D7 !important",
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      border: "1px solid #D7D7D7 !important",
      // margin: "10px !important",
      // width: "50%",
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const RoomToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    // width: "50%",
    //margin: theme.spacing(0.5),
    // margin: "10px",
    border: "1px solid #D7D7D7 !important",
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: "50%",
      border: "1px solid #D7D7D7 !important",
      // margin: "10px !important",
      // width: "50%",
    },
    "&:first-of-type": {
      borderRadius: "50%",
    },
  },
}));

const NewToggleButton = styled(ToggleButton)({
  height: "45px",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#FFA321",
  },
});

const RoomToggleButton = styled(ToggleButton)({
  height: "30px",
  width: "30px",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#FFA321",
    borderRadius: "50%",
  },
});

function PropertyDetail1({
  setStep,
  flatmateDetail,
  setFlatMateDetail,
  isEdit = false,
}) {
  const alert = useAlert();
  const handleFormat = (event, value, key) => {
    setFlatMateDetail({
      ...flatmateDetail,
      step1: { ...flatmateDetail.step1, [key]: value },
    });
    setError({...error, [key]: ""})
  };

  const [error, setError] = useState({
    propertyType: "",
    propertyAge: "",
    furnishingType: "",
    bhk: "",
    bathrooms: "",
    balcony: "",
    preferrerTenants: "",
    parking: ""
  })

  const validateStep1 = () => {
    let isNotError = true;
    let errorValues = {propertyType: "",
    propertyAge: "",
    furnishingType: "",
    bhk: "",
    bathrooms: "",
    balcony: "",
    preferrerTenants: "",
    parking: ""}
    if (!flatmateDetail?.step1?.propertyType) {
      // alert.error("Please select Property Type");
      errorValues.propertyType = "Please select Property Type";
      isNotError = false;
    }
    if (!flatmateDetail?.step1?.propertyAge) {
      // alert.error("Please enter Property Age");
      errorValues.propertyAge = "Please enter Property Age";
      isNotError = false;
    }
    
    if (!flatmateDetail?.step1?.furnishingType) {
      // alert.error("Please select Furnishing Type");
      // return false;
      errorValues.furnishingType = "Please select Furnishing Type";
      isNotError = false;
    }
    if (!flatmateDetail?.step1?.bhk && flatmateDetail?.step1?.bhk !== 0) {
      // alert.error("Please select BHK");
      // return false;
      errorValues.bhk = "Please select BHK";
      isNotError = false;
    }
    if (
      !flatmateDetail?.step1?.bathrooms &&
      flatmateDetail?.step1?.bathrooms !== 0
    ) {
      // alert.error("Please select Bathrooms");
      // return false;
      errorValues.bathrooms = "Please select Bathrooms";
      isNotError = false;
    }
    if (!flatmateDetail?.step1?.balcony) {
      // alert.error("Please select Balcony");
      // return false;
      errorValues.balcony = "Please select Balcony";
      isNotError = false;
    }
    if (!flatmateDetail?.step1?.preferrerTenants) {
      // alert.error("Please select Preferred Tenants");
      // return false;
      errorValues.preferrerTenants = "Please select Preferred Tenants";
      isNotError = false;
    }
    if (!flatmateDetail?.step1?.parking) {
      // alert.error("Please select Parking");
      // return false;
      errorValues.parking = "Please select Parking";
      isNotError = false;
    }
    setError(errorValues);
    if(!isNotError){
      alert.error("Please fill all details!");
    }
    return isNotError;
  };

  return (
    <>
      <Typography variant="h6">
        {isEdit ? "Edit your flatmate Listing" : "Listing for Flatmates"}
      </Typography>
      {!isEdit && (
        <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
          Kindly fill out this form*
        </Typography>
      )}
      <br />

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>

          <span style={{ color: error?.propertyType ? "Red" : "#000" }}>
          Property Type* 
          </span>
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            //width: "100%",
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          exclusive
          value={
            flatmateDetail?.step1?.propertyType
              ? flatmateDetail?.step1?.propertyType
              : null
          }
          onChange={(event, value) =>
            handleFormat(event, value, "propertyType")
          }
          aria-label="text formatting"
        >
          <NewToggleButton value="Builder Floor" key="builder">
            Builder Floor
          </NewToggleButton>
          <NewToggleButton value="High Rise Apartment" key="apartment">
            High Rise Apartment
          </NewToggleButton>
          <NewToggleButton value="Villa" key="villa">
            Villa
          </NewToggleButton>
          <NewToggleButton value="Studio" key="studio">
            Studio
          </NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <Grid md={12} style={{ display: "grid" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
        <span style={{ color: error?.propertyAge ? "Red" : "#000" }}>
        Property Age(in years)*
          </span>
        </Typography>

        <TextField
          type={"number"}
          placeholder="Property Age"
          value={flatmateDetail?.step1?.propertyAge}
          onChange={(e) => {
            setFlatMateDetail({
              ...flatmateDetail,
              step1: { ...flatmateDetail.step1, propertyAge: e.target.value },
            });
            setError({...error, propertyAge: ""})
          }}
          color="primary"
        />
      </Grid>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
        <span style={{ color: error?.furnishingType ? "Red" : "#000" }}>
        Furnishing Type*
          </span>
          
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            //width: "100%",
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          exclusive
          value={flatmateDetail?.step1?.furnishingType}
          onChange={(event, value) =>
            handleFormat(event, value, "furnishingType")
          }
          aria-label="text formatting"
        >
          <NewToggleButton value="fully furnished" key="fully furnished">
            Full Furnished
          </NewToggleButton>
          <NewToggleButton value="semi furnished" key="semi furnished">
            Semi Furnished
          </NewToggleButton>
          <NewToggleButton value="unfurnished" key="unfurnished">
            Unfurnished
          </NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* BHK* */}
          <span style={{ color: error?.bhk ? "Red" : "#000" }}>
          BHK*
          </span>
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gridGap: "20px",
          }}
          exclusive
          value={flatmateDetail?.step1?.bhk}
          onChange={(event, value) => handleFormat(event, value, "bhk")}
          aria-label="text formatting"
        >
          <NewToggleButton value={0}>1RK</NewToggleButton>
          <NewToggleButton value={1}>1BHK</NewToggleButton>
          <NewToggleButton value={2}>2BHK</NewToggleButton>
          <NewToggleButton value={3}>3BHK</NewToggleButton>
          <NewToggleButton value={4}>4BHK</NewToggleButton>
          <NewToggleButton value={5}>4+BHK</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Bathrooms* */}
          <span style={{ color: error?.bathrooms ? "Red" : "#000" }}>
          Bathrooms*
          </span>
        </Typography>
        <RoomToggleButtonGroup
          sx={{
            display: "grid",
            gridTemplateColumns:
              "auto auto auto auto auto auto auto auto auto auto auto auto auto",
            gridGap: "10px",
          }}
          exclusive
          value={flatmateDetail?.step1?.bathrooms}
          onChange={(event, value) => handleFormat(event, value, "bathrooms")}
          aria-label="text formatting"
        >
          <RoomToggleButton value={0}>0</RoomToggleButton>
          <RoomToggleButton value={1}>1</RoomToggleButton>
          <RoomToggleButton value={2}>2</RoomToggleButton>
          <RoomToggleButton value={3}>3</RoomToggleButton>
          <RoomToggleButton value={4}>4</RoomToggleButton>
          <RoomToggleButton value={5}>4+</RoomToggleButton>
        </RoomToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          
          <span style={{ color: error?.balcony ? "Red" : "#000" }}>
          Balcony*
          </span>
        </Typography>
        <RoomToggleButtonGroup
          sx={{
            display: "grid",
            gridTemplateColumns:
              "auto auto auto auto auto auto auto auto auto auto auto auto auto ",
            gridGap: "10px",
          }}
          exclusive
          value={flatmateDetail?.step1?.balcony}
          onChange={(event, value) => handleFormat(event, value, "balcony")}
          aria-label="text formatting"
        >
          <RoomToggleButton value="None">0</RoomToggleButton>
          <RoomToggleButton value="1">1</RoomToggleButton>
          <RoomToggleButton value="2">2</RoomToggleButton>
          <RoomToggleButton value="2+">2+</RoomToggleButton>
        </RoomToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Preferred Tenants* */}
          <span style={{ color: error?.preferrerTenants ? "Red" : "#000" }}>
          Preferred Tenants*
          </span>
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            //width: "100%",
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          exclusive
          value={flatmateDetail?.step1?.preferrerTenants}
          onChange={(event, value) =>
            handleFormat(event, value, "preferrerTenants")
          }
          aria-label="text formatting"
        >
          <NewToggleButton value="boys" key="male">
            Male
          </NewToggleButton>
          <NewToggleButton value="girls" key="female">
            Female
          </NewToggleButton>
          <NewToggleButton value="both" key="both">
            Any
          </NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
        <span style={{ color: error?.parking ? "Red" : "#000" }}>
        Parking*
          </span>
          {/* Parking* */}
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            //width: "100%",
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          exclusive
          value={flatmateDetail?.step1?.parking}
          onChange={(event, value) => handleFormat(event, value, "parking")}
          aria-label="text formatting"
        >
          <NewToggleButton value="car only" key="car">
            Car
          </NewToggleButton>
          <NewToggleButton value="bike only" key="bike">
            Bike
          </NewToggleButton>
          <NewToggleButton value="both parking" key="both">
            Both
          </NewToggleButton>
          <NewToggleButton value="no parking" key="no">
            No Parking
          </NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div
        style={{
          position: "relative",
          float: "right",
        }}
      >
        <CommonButton
          onClick={() => {
            if (validateStep1()) {
              setStep(3);
            }
          }}
        >
          Next
        </CommonButton>
      </div>
    </>
  );
}

export default PropertyDetail1;
