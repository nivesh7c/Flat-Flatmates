import {
  ToggleButton,
  ToggleButtonGroup, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
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

function PropertyDetail1({setStep, flatmateDetail, setFlatMateDetail, isEdit=false}) {
  const alert = useAlert();

  const [error, setError] = useState({
    foodAllowed: "",
    sharing: "",
    furnishingType: "",
    bathrooms: "",
    preferrerTenants: "",
    parking: ""
  })

  const handleFormat = (event, value, key) => {
    setFlatMateDetail({...flatmateDetail, step1: {...flatmateDetail.step1, [key]: value}});
    setError({...error, [key]: ""});
  };

  

  const validateStep1 = () => {

    let isNotError = true;
    let errorValues = {
      foodAllowed: "",
      sharing: "",
      furnishingType: "",
      bathrooms: "",
      preferrerTenants: "",
      parking: ""
    }

    if(!flatmateDetail?.step1?.sharing){
      // alert.error("Please select Sharing Type");
      // return false;
      errorValues.sharing = "Please select Sharing Type";
      isNotError = false;
    }
    // if(!flatmateDetail?.step1?.propertyAge){
    //   alert.error("Please enter Property Age");
    //   return false;
    // }
    if(!flatmateDetail?.step1?.furnishingType){
      // alert.error("Please select Furnishing Type");
      // return false;
      errorValues.furnishingType = "Please select Furnishing Type";
      isNotError = false;
    }
    // if(!flatmateDetail?.step1?.bhk && flatmateDetail?.step1?.bhk !== 0){
    //   alert.error("Please select BHK");
    //   return false;
    // }
    if(!flatmateDetail?.step1?.bathrooms){
      // alert.error("Please select Bathrooms");
      // return false;
      errorValues.bathrooms = "Please select Bathrooms";
      isNotError = false;
    }
    // if(!flatmateDetail?.step1?.balcony){
    //   alert.error("Please select Balcony");
    //   return false;
    // }
    if(!flatmateDetail?.step1?.preferrerTenants){
      // alert.error("Please select Preferred Tenants");
      // return false;
      errorValues.preferrerTenants = "Please select Preferred Tenants";
      isNotError = false;
    }
    if(!flatmateDetail?.step1?.parking){
      // alert.error("Please select Parking");
      // return false;
      errorValues.parking = "Please select Parking";
      isNotError = false;
    }
    if(!flatmateDetail?.step1?.foodAllowed){
      // alert.error("Please select Allowed Food");
      // return false;
      errorValues.foodAllowed = "Please select Allowed Food";
      isNotError = false;
    }
    setError(errorValues);
    if(!isNotError){
      alert.error("Please fill all details!");
    }
    return isNotError;
  }
 
  return (
    <>
      <Typography variant="h6">{isEdit ? "Edit your Pg/Hostel Listing" : "List your PG/Hostel with us"}</Typography>
      {!isEdit && 
      <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
        Kindly fill out this form*
      </Typography>
      }
      <br />
      
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          
          <span style={{ color: error?.sharing ? "Red" : "#000" }}>
            Sharing*
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
          value={flatmateDetail?.step1?.sharing ? flatmateDetail?.step1?.sharing : null}
          onChange={(event, value) => handleFormat(event, value, "sharing")}
          aria-label="text formatting"
        >
          <NewToggleButton value="single" key="builder">Single</NewToggleButton>
          <NewToggleButton value="double" key="apartment">
            Double
          </NewToggleButton>
          <NewToggleButton value="tripple" key="villa">Triple</NewToggleButton>
          <NewToggleButton value="all" key="studio">All</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>
      
      {/* <Grid md={12} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            Property Age(in years)*
          </Typography>

          <TextField 
          type={"number"} 
          placeholder="Property Age" 
          value={flatmateDetail?.step1?.propertAge}
          onChange={(e) => {setFlatMateDetail({...flatmateDetail, step1: {...flatmateDetail.step1, propertyAge: e.target.value}});}}
          color="primary" 
          size="small" />
      </Grid> */}
  
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Furnishing Type* */}
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
          onChange={(event, value) => handleFormat(event, value, "furnishingType")}
          aria-label="text formatting"
        >
          <NewToggleButton value="fully furnished" key="fully furnished">Full Furnished</NewToggleButton>
          <NewToggleButton value="semi furnished" key="semi furnished">Semi Furnished</NewToggleButton>
          <NewToggleButton value="unfurnished" key="unfurnished">Unfurnished</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Bathrooms* */}
          <span style={{ color: error?.bathrooms ? "Red" : "#000" }}>
                Bathrooms*
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
          value={flatmateDetail?.step1?.bathrooms}
          onChange={(event, value) => handleFormat(event, value, "bathrooms")}
          aria-label="text formatting"
        >
          <NewToggleButton value="attached" key="fully furnished">Attached</NewToggleButton>
          <NewToggleButton value="common" key="semi furnished">Common</NewToggleButton>
        </StyledToggleButtonGroup>
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
          onChange={(event, value) => handleFormat(event, value, "preferrerTenants")}
          aria-label="text formatting"
        >
          <NewToggleButton value="boys" key="male">Male</NewToggleButton>
          <NewToggleButton value="girls" key="female">Female</NewToggleButton>
          <NewToggleButton value="both" key="both">Any</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Parking* */}
          <span style={{ color: error?.parking ? "Red" : "#000" }}>
              Parking* 
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
          value={flatmateDetail?.step1?.parking}
          onChange={(event, value) => handleFormat(event, value, "parking")}
          aria-label="text formatting"
        >
          <NewToggleButton value="car only" key="car">Car</NewToggleButton>
          <NewToggleButton value="bike only" key="bike">Bike</NewToggleButton>
          <NewToggleButton value="both parking" key="both">Both</NewToggleButton>
          <NewToggleButton value="no parking" key="no">No Parking</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Food Allowed* */}
          <span style={{ color: error?.foodAllowed ? "Red" : "#000" }}>
          Food Allowed*
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
          value={flatmateDetail?.step1?.foodAllowed}
          onChange={(event, value) => handleFormat(event, value, "foodAllowed")}
          aria-label="text formatting"
        >
          <NewToggleButton value="veg only" key="car">Veg </NewToggleButton>
          <NewToggleButton value="non-veg" key="bike">Non-Veg</NewToggleButton>
          <NewToggleButton value="all" key="both">All Food</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div
        style={{
          position: "relative",
          float: "right",
        }}
      >
        <CommonButton onClick={() => {
          if(validateStep1()){
          setStep(3)
          }
          }}>Next</CommonButton>
      </div>
    </>
  );
}

export default PropertyDetail1;
