import {
  Autocomplete,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useAlert } from "react-alert";
import { AMENITIES, FLOORS, TOTAL_FLOORS } from "../../../constant";
import { CommonButton } from "../../Cards/Common/CommonButton";
import AmenitiesComponent from "../../Common/Amenities";
import CustomAvailability from "../CustomAvailability";
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

function PropertyDetail2({
  setStep,
  flatmateDetail,
  setFlatMateDetail,
  isEdit = false,
}) {
  const alert = useAlert();

  const [error, setError] = useState({
    floor: "",
    totalFloors: "",
    availableFrom: "",
    expectedRent: "",
    expectedDeposit: "",
    monthlyMaintainence: "",
    areaSize: "",
    preferrerTenants: ""
  })

  const handleFormatNew = (event, value, key) => {
    setFlatMateDetail({
      ...flatmateDetail,
      step2: { ...flatmateDetail.step2, [key]: value },
    });
    setError({...error, [key]: ""});
  };

  const handleChangeTextField = (prop) => (event) => {
    setFlatMateDetail({
      ...flatmateDetail,
      step2: { ...flatmateDetail.step2, [prop]: event.target.value },
    });
    setError({...error, [prop]: ""});
  };

  const validateStep2 = () => {

    let isNotError = true;
    let errorValues = {
      floor: "",
      totalFloors: "",
      availableFrom: "",
      expectedRent: "",
      expectedDeposit: "",
      monthlyMaintainence: "",
      areaSize: "",
      preferrerTenants: ""
    }

    if (!flatmateDetail?.step2?.floor) {
      // alert.error("Please select floor");
      // return false;
      errorValues.floor = "Please select floor";
      isNotError = false;
      
    }
    if (!flatmateDetail?.step2?.totalFloors) {
      // alert.error("Please select Total Floors");
      // return false;
      errorValues.totalFloors = "Please select Total Floors";
      isNotError = false;
    }
    if (!flatmateDetail?.step2?.availableFrom) {
      // alert.error("Please enter Available From");
      // return false;
      errorValues.availableFrom = "Please enter Available From";
      isNotError = false;
    }
    if (!flatmateDetail?.step2?.expectedRent) {
      // alert.error("Please enter Expected Rent");
      // return false;
      errorValues.expectedRent = "Please enter Expected Rent";
      isNotError = false;
    }
    if (!flatmateDetail?.step2?.expectedDeposit) {
      // alert.error("Please enter Expected Deposit");
      // return false;
      errorValues.expectedDeposit = "Please enter Expected Deposit";
      isNotError = false;
    }
    if (!flatmateDetail?.step2?.monthlyMaintainence) {
      // alert.error("Please enter Monthly Maintenance");
      // return false;
      errorValues.monthlyMaintainence = "Please enter Monthly Maintenance";
      isNotError = false;
    }
    if (!flatmateDetail?.step2?.areaSize) {
      // alert.error("Please enter Area Size");
      // return false;
      errorValues.areaSize = "Please enter Area Size";
      isNotError = false;
    }
    // if(!flatmateDetail?.step2?.waterSupply){
    //   alert.error("Please select Water Supply");
    //   return false;
    // }
    if (!flatmateDetail?.step2?.preferrerTenants) {
      // alert.error("Please select Preferred Tenants");
      // return false;
      errorValues.preferrerTenants = "Please select Preferred Tenants";
      isNotError = false;
    }
    if (!flatmateDetail?.step2?.otherAmenities) {
      alert.error("Please select Amenities");
      return false;
    }
    setError(errorValues);
    if(!isNotError){
      alert.error("Please fill all details!");
    }
    return isNotError;
  };

  const getValue = (dataList, value) => {
    let data = {};
    data = dataList.find((item) => item?.value === value);
    return data || {};
  };

  return (
    <>
      <Typography variant="h6">
        {isEdit
          ? "Edit your Rental Property Listing"
          : "List your Rental property with us"}
      </Typography>
      {!isEdit && (
        <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
          Kindly fill out this form*
        </Typography>
      )}
      <br />

      <Grid container spacing={2}>
        <Grid xs={6} sx={6} md={6} style={{ display: "grid" }}>
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
            options={FLOORS}
            value={getValue(FLOORS, flatmateDetail?.step2?.floor)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Floor" />
            )}
            onChange={(e, item) => {
              if (item) {
                setFlatMateDetail({
                  ...flatmateDetail,
                  step2: { ...flatmateDetail.step2, floor: item.value },
                });
              } else {
                setFlatMateDetail({
                  ...flatmateDetail,
                  step2: { ...flatmateDetail.step2, floor: "" },
                });
              }
            }}
          />
        </Grid>
        <Grid xs={6} sx={6} md={6} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            {/* Total Floors* */}
            <span style={{ color: error?.totalFloors ? "Red" : "#000" }}>
            Total Floors*
            </span>
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={TOTAL_FLOORS}
            value={getValue(TOTAL_FLOORS, flatmateDetail?.step2?.totalFloors)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Total Floors" />
            )}
            onChange={(e, item) => {
              if (item) {
                setFlatMateDetail({
                  ...flatmateDetail,
                  step2: { ...flatmateDetail.step2, totalFloors: item.value },
                });
              } else {
                setFlatMateDetail({
                  ...flatmateDetail,
                  step2: { ...flatmateDetail.step2, totalFloors: "" },
                });
              }
            }}
          />
        </Grid>{" "}
        <Grid xs={12} sx={6} md={6} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            {/* Expected Rent(Monthly)* */}
            <span style={{ color: error?.expectedRent ? "Red" : "#000" }}>
            Expected Rent(Monthly)*
            </span>
          </Typography>

          <TextField
            placeholder="Expected Rent"
            color="primary"
            size="small"
            type="number"
            onChange={handleChangeTextField("expectedRent")}
            value={flatmateDetail?.step2?.expectedRent}
          />
        </Grid>{" "}
        <Grid xs={12} sx={6} md={6} style={{ display: "grid" }}>
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
        {/* <Grid md={6} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            Monthly Maintanance
          </Typography>

          <TextField
            placeholder="Monthly Maintanance "
            color="primary"
            size="small"
            type="number"
            onChange={handleChangeTextField("monthlyMaintainence")}
            value={flatmateDetail?.step2?.monthlyMaintainence}
          />
        </Grid>{" "} */}
        <Grid md={12} sm={12} xs={12} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            {/* Area Size(in Sq.Ft.)* */}
            <span style={{ color: error?.areaSize ? "Red" : "#000" }}>
            Area Size(in Sq.Ft.)*
            </span>
          </Typography>

          <TextField
            placeholder="Area Size "
            color="primary"
            size="small"
            type="number"
            onChange={handleChangeTextField("areaSize")}
            value={flatmateDetail?.step2?.areaSize}
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
        <CustomAvailability
          availability={flatmateDetail?.step2?.availableFrom}
          setAvailability={(item) =>
            setFlatMateDetail({
              ...flatmateDetail,
              step2: { ...flatmateDetail?.step2, availableFrom: item?.title },
            })
          }
        />
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Monthly Maintainence* */}
          <span style={{ color: error?.monthlyMaintainence ? "Red" : "#000" }}>
          Monthly Maintainence*
            </span>
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          exclusive
          value={flatmateDetail?.step2?.monthlyMaintainence}
          onChange={(event, value) =>
            handleFormatNew(event, value, "monthlyMaintainence")
          }
          aria-label="text formatting"
        >
          <NewToggleButton value="None" key="male">
            None
          </NewToggleButton>
          <NewToggleButton value="Maintenance Included" key="female">
            Maintenance Included
          </NewToggleButton>
          <NewToggleButton value="Maintenance Extra" key="both">
            Maintenance Extra
          </NewToggleButton>
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
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          exclusive
          value={flatmateDetail?.step2?.preferrerTenants}
          onChange={(event, value) =>
            handleFormatNew(event, value, "preferrerTenants")
          }
          aria-label="text formatting"
        >
          <NewToggleButton value="family" key="male">
            Family
          </NewToggleButton>
          <NewToggleButton value="bachelor" key="female">
            Bachelors
          </NewToggleButton>
          <NewToggleButton value="both" key="both">
            Any
          </NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          Amenities
        </Typography>

        <Grid container spaacing={4}>
          {AMENITIES.map((value, index) => (
            <AmenitiesComponent
              value={value}
              amenity={flatmateDetail?.step2?.otherAmenities[value.key]}
              setAmenities={(value1) => {
                setFlatMateDetail({
                  ...flatmateDetail,
                  step2: {
                    ...flatmateDetail?.step2,
                    otherAmenities: {
                      ...flatmateDetail?.step2?.otherAmenities,
                      [value.key]: value1,
                    },
                  },
                });
              }}
            />
          ))}
        </Grid>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            position: "relative",
            float: "left",
          }}
        >
          <Button
            onClick={() => {
              setStep(2);
            }}
          >
            Back
          </Button>
        </div>

        <div
          style={{
            position: "relative",
            // float: "right",
          }}
        >
          <CommonButton
            onClick={() => {
              if (validateStep2()) {
                setStep(4);
              }
            }}
          >
            Next
          </CommonButton>
        </div>
      </div>
    </>
  );
}

export default PropertyDetail2;
