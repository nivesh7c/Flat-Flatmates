import {
    TextField, ToggleButton,
    ToggleButtonGroup, Typography, Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React from "react";
import { useAlert } from "react-alert";
import { CommonButton } from "../../Cards/Common/CommonButton";
import CustomAutoFill from "../CustomAutoFill";
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
  
  const NewToggleButton = styled(ToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: "#FFA321",
    },
  });
  
  function PropertyDetail3({setStep, flatmateDetail, setFlatMateDetail, isEdit=false}) {
  
    const alert = useAlert();
  
    const handleChangeTextField = (prop) => (event) => {
      setFlatMateDetail({...flatmateDetail, step3: {...flatmateDetail.step3, [prop]: event.target.value}});
      setError({...error, [prop]: ""})
    }

    const [error, setError] = useState({
      description: "",
      city: "",
      area: "",
      pincode: "",
      whatsAppNumber: "",
      addressLine: "",
      facebookUsername: "",
      lat: "",
      long: ""
    })

    const validateStep3 = () => {
      let isNotError = true;
    let errorValues ={
      description: "",
      city: "",
      area: "",
      pincode: "",
      addressLine: "",
      whatsAppNumber: "",
      facebookUsername: "",
      lat: "",
      long: ""
    }

      if(!flatmateDetail?.step3?.description){
        // alert.error("Please add Property Description");
        // return false;
        errorValues.description = "Please add Property Description";
        isNotError = false;
      }
      if(!flatmateDetail?.step3?.city){
        // alert.error("Please select city");
        // return false;
        errorValues.city = "Please select city";
        isNotError = false;
      }
      if(!flatmateDetail?.step3?.area){
        // alert.error("Please enter Area");
        // return false;
        errorValues.area = "Please select Area";
        isNotError = false;
      }
      if(!flatmateDetail?.step3?.addressLine){
        // alert.error("Please enter Address");
        // return false;
        errorValues.addressLine = "Please select Area";
        isNotError = false;
      }
      if(!flatmateDetail?.step3?.pincode){
        // alert.error("Please enter Pincode");
        // return false;
        errorValues.pincode = "Please enter Pincode";
        isNotError = false;
      }
      else if(flatmateDetail?.step3?.pincode.length !== 6){
      //   // alert.error("Please enter 6 digit Pincode");
      //   // return false;
        errorValues.pincode = "Please enter 6 digit Pincode";
        isNotError = false;
        alert.error("Please enter 6 digit Pincode");
      }
      if(!flatmateDetail?.step3?.whatsAppNumber){
        // alert.error("Please enter WhatsApp Number");
        // return false;
        errorValues.whatsAppNumber = "Please enter WhatsApp Number";
        isNotError = false;
        
      }
      else if(flatmateDetail?.step3?.whatsAppNumber.length !== 10){
        // alert.error("Please enter valid WhatsApp Number");
        // return false;
        errorValues.whatsAppNumber = "Please enter valid WhatsApp Number";
        alert.error("Please enter valid WhatsApp Number");
        isNotError = false;
      }
      if(!flatmateDetail?.step3?.facebookUsername){
        // alert.error("Please enter Facebook Username");
        // return false;
        errorValues.facebookUsername = "Please enter Facebook Username";
        isNotError = false;
      }
      if(!isNotError){
        alert.error("Please fill all details!");
      }
      setError(errorValues);
      return isNotError;
    }
  
    return (
      <>
        <Typography variant="h6">{isEdit ? "Edit your flatmate Listing" : "Listing for Flatmates"}</Typography>
      {!isEdit && 
      <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
        Kindly fill out this form*
      </Typography>
      }
        <br />
        
        <Grid container spacing={2}>
          <Grid md={12} xs={12} sm={12} style={{ display: "grid" }}>
            <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
              
              <span style={{ color: error?.description ? "Red" : "#000" }}>
                Description*
              </span>
            </Typography>
  
            <TextField placeholder="Description"
             color="primary" 
             size="small"
             multiline
             row={6}
             onChange={handleChangeTextField("description")}
             value={flatmateDetail?.step3?.description}
             />
          </Grid>{" "}
          <Grid md={12} xs={12} sm={12} style={{ display: "grid" }}>
            <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            {/* Address* */}
            <span style={{ color: error?.addressLine ? "Red" : "#000" }}>
            Address*
              </span>
            </Typography>
  
            <TextField placeholder="Address"
             color="primary" 
             size="small"
             multiline
             row={6}
             onChange={handleChangeTextField("addressLine")}
             value={flatmateDetail?.step3?.addressLine}
             />
          </Grid>{" "}

          <Grid md={12} xs={12} sm={12} style={{ display: "grid" }}>
            <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
              {/* City & Area*  */}
              <span style={{ color: error?.city || error?.area ? "Red" : "#000" }}>
                City & Area* 
              </span>
            </Typography>

            <CustomAutoFill 
            setCity={(value) => {
                setFlatMateDetail({...flatmateDetail, step3: {...flatmateDetail.step3, city: value, area: ""}});
            }}
            setArea={(value) => {
                setFlatMateDetail({...flatmateDetail, step3: {...flatmateDetail.step3, area: value?.area, lat: value?.lat, long: value?.long}});
                setError({...error, area: ""})
            }}
            city={flatmateDetail?.step3?.city}
            area={flatmateDetail?.step3?.area}
            lat={flatmateDetail?.step3?.lat}
            long={flatmateDetail?.step3?.long}
            // setLat=
            />
            
          </Grid>{" "}
          <Grid md={12} xs={12} sm={12} style={{ display: "grid" }}>
            <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
              {/* Pincode* */}
              <span style={{ color: error?.pincode ? "Red" : "#000" }}>
              Pincode*
              </span>
            </Typography>
  
            <TextField placeholder="Pincode" color="primary" 
            size="small" 
            type="number"
            onChange={handleChangeTextField("pincode")}
            value={flatmateDetail?.step3?.pincode}
            />
          </Grid>{" "}

          <Grid md={12} xs={12} sm={12} style={{ display: "grid" }}>
            <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
              {/* WhatsApp Number* */}
              <span style={{ color: error?.whatsAppNumber ? "Red" : "#000" }}>
              WhatsApp Number*
              </span>
            </Typography>
  
            <TextField placeholder="WhatsApp Number" color="primary" 
            size="small" 
            type="number"
            onChange={handleChangeTextField("whatsAppNumber")}
            value={flatmateDetail?.step3?.whatsAppNumber}
            />
          </Grid>{" "}

          <Grid md={12} xs={12} sm={12} style={{ display: "grid" }}>
            <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
              {/* Facebook Username* */}
              <span style={{ color: error?.facebookUsername ? "Red" : "#000" }}>
              Facebook Username*
              </span>
            </Typography>
  
            <TextField placeholder="Facebook Username" color="primary" 
            size="small" 
            onChange={handleChangeTextField("facebookUsername")}
            value={flatmateDetail?.step3?.facebookUsername}
            />
          </Grid>{" "}
        </Grid>

        <div style={{display: "flex", justifyContent: "space-between",  marginTop: "20px"}}>
      <div
        style={{
          position: "relative",
          float: "left",
        }}
      >
        <Button onClick={() =>  {
          setStep(3)
          }}>Back</Button>
      </div>
  
        <div
          style={{
            position: "relative",
            // float: "right"
          }}
        >
          <CommonButton onClick={() =>  {
            
            if(validateStep3()){
            setStep(5)
            }
            }}>Next</CommonButton>
        </div>
        </div>
      </>
    );
  }
  
  export default PropertyDetail3;