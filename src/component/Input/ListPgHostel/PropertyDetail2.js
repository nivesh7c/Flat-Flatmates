import {
  Autocomplete, Button, TextField, ToggleButton,
  ToggleButtonGroup, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useAlert } from "react-alert";
import { AMENITIES, PG_FLOORS } from "../../../constant";
import { CommonButton } from "../../Cards/Common/CommonButton";
import AmenitiesComponent from "../../Common/Amenities";
import CustomAvailability from "../CustomAvailability";
import {useState} from "react";

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

const NewToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#FFA321",
  },
});

function PropertyDetail2({setStep, flatmateDetail, setFlatMateDetail, isEdit=false}) {

  const alert = useAlert();

  const [error, setError] = useState({
    floor: "",
    availableFrom: "",
    expectedRent: "",
    expectedDeposit: "",
    waterSupply: "",
    food: "",
    guest: "",
    availableFor: ""
  })

  const handleFormatNew = (event, value, key) => {
    setFlatMateDetail({...flatmateDetail, step2: {...flatmateDetail.step2, [key]: value}});
    setError({...error, [key]: ""});
  };

  const handleChangeTextField = (prop) => (event) => {
    setFlatMateDetail({...flatmateDetail, step2: {...flatmateDetail.step2, [prop]: event.target.value}});
    setError({...error, [prop]: ""});
  }

  

  const validateStep2 = () => {

    let isNotError = true;
    let errorValues = {
      floor: "",
      availableFrom: "",
      expectedRent: "",
      expectedDeposit: "",
      waterSupply: "",
      food: "",
      guest: "",
      availableFor: ""
    }

    if(!flatmateDetail?.step2?.floor){
      // alert.error("Please select floor");
      // return false;
      errorValues.floor = "Please select floor";
      isNotError = false;
    }
    // if(!flatmateDetail?.step2?.totalFloors){
    //   alert.error("Please select Total Floors");
    //   return false;
    // }
    if(!flatmateDetail?.step2?.availableFrom){
      // alert.error("Please enter Available From");
      // return false;
      errorValues.availableFrom = "Please select Available From";
      isNotError = false;
    }
    if(!flatmateDetail?.step2?.expectedRent){
      // alert.error("Please enter Expected Rent");
      // return false;
      errorValues.expectedRent = "Please select Expected Rent";
      isNotError = false;
    }
    if(!flatmateDetail?.step2?.expectedDeposit){
      // alert.error("Please enter Expected Deposit");
      // return false;
      errorValues.expectedDeposit = "Please select Expected Deposit";
      isNotError = false;
    }
    
    if(!flatmateDetail?.step2?.waterSupply){
      // alert.error("Please select Water Supply");
      // return false;
      errorValues.waterSupply = "Please select Water Supply";
      isNotError = false;
    }

    if(!flatmateDetail?.step2?.availableFor){
      // alert.error("Please select Water Supply");
      // return false;
      errorValues.availableFor = "Please select Available For";
      isNotError = false;
    }
    
    if(!flatmateDetail?.step2?.guest && flatmateDetail?.step2?.guest!== false){
      // alert.error("Please choose Guest");
      // return false;
      errorValues.guest = "Please choose Guest";
      isNotError = false;
    }
    if(!flatmateDetail?.step2?.food && flatmateDetail?.step2?.food !== false){
      // alert.error("Please choose Non-Vegetarian Allowed");
      // return false;
      errorValues.food = "Please choose Non-Vegetarian Allowed";
      isNotError = false;
    }
    // if(!flatmateDetail?.step2?.otherAmenities){
    //   alert.error("Please select Amenities");
    //   return false;
    // }
    setError(errorValues);
    if(!isNotError){
      alert.error("Please fill all details!");
    }
    return isNotError;
  }

  const getValue = (dataList, value) => {
    let data = {};
    data = dataList.find(item => 
      item?.value === value
      );
    return data || {};
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
      
      <Grid container spacing={2}>
        <Grid md={12} sm={12} xs={12} style={{ display: "grid" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            {/* Floor* */}
            <span style={{ color: error?.floor ? "Red" : "#000" }}>
                Floor*
            </span>
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={PG_FLOORS}
            value={getValue(PG_FLOORS, flatmateDetail?.step2?.floor)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Floor" />
            )}
            onChange={(e, item) => {
              if(item){
                setFlatMateDetail({...flatmateDetail, step2:{...flatmateDetail.step2, floor: item.value}})
              }else{
                setFlatMateDetail({...flatmateDetail, step2:{...flatmateDetail.step2, floor: ""}})
              }
            }}
          />
        </Grid>

        <Grid md={6} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            {/* Expected Rent(Monthly)* */}
            <span style={{ color: error?.expectedRent ? "Red" : "#000" }}>
                Expected Rent(Monthly)*
            </span>
          </Typography>

          <TextField placeholder="Expected Rent"
           color="primary" 
           size="small"
           type="number"
           onChange={handleChangeTextField("expectedRent")}
           value={flatmateDetail?.step2?.expectedRent}
           />
        </Grid>{" "}
        <Grid md={6} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Expected Deposit* */}
            <span style={{ color: error?.expectedDeposit ? "Red" : "#000" }}>
                Expected Deposit*
            </span>
          </Typography>

          <TextField
            placeholder="Monthly deposit"
            color="primary"
            size="small"
            type="number"
            onChange={handleChangeTextField("expectedDeposit")}
            value={flatmateDetail?.step2?.expectedDeposit}
          />
        </Grid>{" "}
        
      </Grid>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Available From* */}
          <span style={{ color: error?.availableFrom ? "Red" : "#000" }}>
              Available From*
          </span>
        </Typography>
        
        <CustomAvailability availability={flatmateDetail?.step2?.availableFrom} setAvailability={(item) => setFlatMateDetail({...flatmateDetail, step2: {...flatmateDetail?.step2, availableFrom: item?.title}})} />
      </div>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Available For */}
          <span style={{ color: error?.availableFor ? "Red" : "#000" }}>
              Available For*
          </span>
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gridGap: "20px",
          }}
          exclusive
          aria-label="text formatting"
          value={flatmateDetail?.step2?.availableFor}
          onChange={(event, value) => handleFormatNew(event, value, "availableFor")}
        >
          <NewToggleButton value="student only" key="female">
            Student
          </NewToggleButton>
          <NewToggleButton value="professional only" key="male">
            Professional
          </NewToggleButton>
          <NewToggleButton value="for all" key="both">
            All
          </NewToggleButton>
        </StyledToggleButtonGroup>
      </div>
      
<div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Water Supply* */}
          <span style={{ color: error?.waterSupply ? "Red" : "#000" }}>
              Water Supply*
          </span>
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            //width: "100%",
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          value={flatmateDetail?.step2?.waterSupply}
          // onChange={handleFormatNew("")}
          onChange={(event, value) => handleFormatNew(event, value, "waterSupply")}
          aria-label="text formatting"
          exclusive
        >
          <NewToggleButton value="24 hour">24 Hours</NewToggleButton>
          <NewToggleButton value="limited time">Limited</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Guest or Opposite Sex Allowed?* */}
          <span style={{ color: error?.guest ? "Red" : "#000" }}>
              Guest or Opposite Sex Allowed?*
          </span>
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            //width: "100%",
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          value={flatmateDetail?.step2?.guest}
          onChange={(event, value) => handleFormatNew(event, value, "guest")}
          aria-label="text formatting"
          exclusive
        >
          <NewToggleButton value={true}>Yes</NewToggleButton>
          <NewToggleButton value={false}>No</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Non Vegetarian Allowed?* */}
          <span style={{ color: error?.food ? "Red" : "#000" }}>
                Non Vegetarian Allowed?*
          </span>
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            //width: "100%",
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          value={flatmateDetail?.step2?.food}
          // onChange={handleFormatNew("vegetarian")}
          onChange={(event, value) => handleFormatNew(event, value, "food")}
          aria-label="text formatting"
          exclusive
        >
          <NewToggleButton value={true}>Yes</NewToggleButton>
          <NewToggleButton value={false}>No</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          Amenities
        </Typography>

        <Grid container spaacing={4}>
          {AMENITIES.map((value, index) => (
            <AmenitiesComponent value={value} amenity={flatmateDetail?.step2?.otherAmenities[value.key]} setAmenities={value1 => {
              setFlatMateDetail({...flatmateDetail, step2: {...flatmateDetail?.step2, otherAmenities: {...flatmateDetail?.step2?.otherAmenities, [value.key]: value1}}})
            }}/>
          ))}
        </Grid>
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <div
        style={{
          position: "relative",
          float: "left",
        }}
      >
        <Button onClick={() =>  {
          setStep(2)
          }}>Back</Button>
      </div>

      <div
        style={{
          position: "relative",
          // float: "right",
        }}
      >
        <CommonButton onClick={() =>  {
          
          if(validateStep2()){
          setStep(4)
          }
          }}>Next</CommonButton>
      </div>
      </div>
    </>
  );
}

export default PropertyDetail2;