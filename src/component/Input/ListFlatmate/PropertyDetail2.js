import {
  Autocomplete,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, {useState} from "react";
import { useAlert } from "react-alert";
import {
  AMENITIES,
  FLOORS,
  TOTAL_FLOORS,
  AVAILABILITY,
} from "../../../constant";
import { CommonButton } from "../../Cards/Common/CommonButton";
import AmenitiesComponent from "../../Common/Amenities";
import CustomDatePicker from "../CustomDatePicker";
import CustomAvailability from "../CustomAvailability";

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
  const [selected, setSelected] = React.useState(false);

  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const alert = useAlert();
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

  const [error, setError] = useState({
    floor: "",
    totalFloors: "",
    availableFrom: "",
    expectedRent: "",
    expectedDeposit: "",
    monthlyMaintainence: "",
    areaSize: "",
    guest: "",
    waterSupply: "",
    availableFor: ""
  })

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
      guest: "",
      waterSupply: "",
      availableFor: "",
      vegetarian: ""
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
    if (!flatmateDetail?.step2?.guest && flatmateDetail?.step2?.guest !== false) {
      // alert.error("Please select guest");
      // return false;
      errorValues.guest = "Please select guest";
      isNotError = false;
    }
    if (!flatmateDetail?.step2?.waterSupply) {
      // alert.error("Please select Water Supply");
      // return false;
      errorValues.waterSupply = "Please select Water Supply";
      isNotError = false;
      
    }
    if (!flatmateDetail?.step2?.vegetarian) {
      // alert.error("Please select Water Supply");
      // return false;
      errorValues.vegetarian = "Please select Non vegetarian allowed or not";
      isNotError = false;
      
    }
    if (!flatmateDetail?.step2?.availableFor) {
      // alert.error("Please select Available For");
      // return false;
      errorValues.availableFor = "Please select Available For";
      isNotError = false;
    }
    // if (!flatmateDetail?.step2?.otherAmenities) {
    //   alert.error("Please select Amenities");
    //   return false;
    // }
    if(!isNotError){
      alert.error("Please fill all details!");
    }
    setError(errorValues);
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
        {isEdit ? "Edit your flatmate Listing" : "Listing for Flatmates"}
      </Typography>
      {!isEdit && (
        <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
          Kindly fill out this form*
        </Typography>
      )}
      <br />

      <Grid container spacing={2}>
        <Grid xs={6} sm={6} md={6} style={{ display: "grid" }}>
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
            getOptionLabel={(option) => option?.label}
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
        <Grid xs={6} sm={6} md={6} style={{ display: "grid" }}>
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
            getOptionLabel={(option) => option?.label}
            renderInput={(params) => (
              <TextField {...params} placeholder="Total Floors" />
            )}
            value={getValue(TOTAL_FLOORS, flatmateDetail?.step2?.totalFloors)}
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
        <Grid xs={12} sm={12} md={6} style={{ display: "grid" }}>
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
        <Grid xs={12} sm={12} md={6} style={{ display: "grid" }}>
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
        <Grid md={12} xs={12} sm={12} style={{ display: "grid" }}>
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
          {/* Available From */}
          <span style={{ color: error?.availableFrom ? "Red" : "#000" }}>
          Available From*
            </span>
        </Typography>
        {/* <CustomDatePicker value={flatmateDetail?.step2?.availableFrom} setValue={(newValue) => {
          setFlatMateDetail({...flatmateDetail, step2: {...flatmateDetail?.step2, availableFrom: newValue}})
        }}/> */}
        <CustomAvailability
          availability={flatmateDetail?.step2?.availableFrom}
          setAvailability={(item) => {
            setFlatMateDetail({
              ...flatmateDetail,
              step2: { ...flatmateDetail?.step2, availableFrom: item?.title },
            })
            setError({...error, availableFrom: ""});
          }}
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
            Maintainance Included
          </NewToggleButton>
          <NewToggleButton value="Maintenance Extra" key="both">
            Maintainance Extra
          </NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          {/* Water Supply */}
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
          onChange={(event, value) =>
            handleFormatNew(event, value, "waterSupply")
          }
          aria-label="text formatting"
          exclusive
        >
          <NewToggleButton value="24 hour">24 Hours</NewToggleButton>
          <NewToggleButton value="limited time">Limited</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
        <span style={{ color: error?.guest ? "Red" : "#000" }}>
        Guest or Opposite Sex Allowed?*
            </span>
          {/* Guest or Opposite Sex Allowed? */}
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
          {/* Non Vegetarian Allowed? */}
          <span style={{ color: error?.vegetarian ? "Red" : "#000" }}>
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
          value={flatmateDetail?.step2?.vegetarian}
          // onChange={handleFormatNew("vegetarian")}
          onChange={(event, value) =>
            handleFormatNew(event, value, "vegetarian")
          }
          aria-label="text formatting"
          exclusive
        >
          <NewToggleButton value="all">Yes</NewToggleButton>
          <NewToggleButton value="veg only">No</NewToggleButton>
        </StyledToggleButtonGroup>
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
          onChange={(event, value) =>
            handleFormatNew(event, value, "availableFor")
          }
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
          Amenities
        </Typography>

        <Grid container spacing={4}>
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
