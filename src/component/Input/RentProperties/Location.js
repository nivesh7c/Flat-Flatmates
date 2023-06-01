import {
  TextField,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CommonButton } from "../../Cards/Common/CommonButton";
import { styled } from "@mui/material/styles";

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

// const styleObj = {
//   "&:hover": {
//     backgroundColor: "red",
//   },
//   "&:active": {
//     backgroundColor: "blue",
//   },
// };

// const successVars = {
//   height: "50px",
//   color: "#fff",
//   backgroundColor: "#FFA321",
//   border: "1px solid #FFA321",
//   fontStyle: "normal",
//   textTransform: "inherit",
//   width: "100%",
// };

// const defaultVars = {
//   height: "50px",
//   color: "#787878",
//   border: "1px solid #D7D7D7",
//   fontStyle: "normal",
//   textTransform: "inherit",
//   width: "100%",
// };

function Location({setStep}) {
  // const users = ["James", "Nora", "Matthew", "Joe", "Susan"];

  // function deleteUserWithName(name) {
  //   if (vars === defaultVars) {
  //     setVars(successVars);
  //   } else {
  //     setVars(defaultVars);
  //   }
  // }

  // const [vars, setVars] = React.useState(defaultVars);

  // const handleChange = () => {
  //   // setVars(event.target.checked ? successVars : defaultVars);
  //   if (vars === defaultVars) {
  //     setVars(successVars);
  //   } else {
  //     setVars(defaultVars);
  //   }
  // };

  const [currentButtonVariant, setCurrentButtonVariant] = useState("outlined");

  const handleButtonVariantChange = () => {
    if (currentButtonVariant === "outlined") {
      setCurrentButtonVariant("contained");
    } else {
      setCurrentButtonVariant("outlined");
    }
  };
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle
    setIsActive((current) => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };
  const [selected, setSelected] = React.useState(false);

  const [formats, setFormats] = React.useState(() => ["bold", "italic"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <>
      <Typography variant="h6">List your Rental property with us</Typography>
      <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
        Kindly fill out this form*
      </Typography>
      <br />
      <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
        Location
      </Typography>
      <Grid container spacing={2}>
        <Grid md={6} style={{ display: "grid" }}>
          <TextField placeholder="City" color="primary" size="small" />
        </Grid>
        <Grid md={6} style={{ display: "grid" }}>
          <TextField placeholder="Pincode" color="primary" size="small" />
        </Grid>{" "}
        <Grid md={12} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            Address
          </Typography>

          <TextField placeholder="Email Id" color="primary" size="small" />
        </Grid>{" "}
        {/* {bhk.map((val, index) => (
          <Grid md={3} SX={{ display: "grid" }}>
            <Button key={index} style={vars} onClick={handleChange}>
              {val.name}
            </Button>
          </Grid>
        ))} */}
      </Grid>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          Property Type
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            //width: "100%",
            display: "grid",
            gridTemplateColumns: "49% auto",
            gridGap: "20px",
          }}
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <NewToggleButton value="builder">Builder Floor</NewToggleButton>
          <NewToggleButton value="apartment">
            High Rise Apartment
          </NewToggleButton>
          <NewToggleButton value="villa">Villa</NewToggleButton>
          <NewToggleButton value="studio">Studio</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          BHK
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gridGap: "20px",
          }}
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <NewToggleButton value="1rk">1RK</NewToggleButton>
          <NewToggleButton value="1bhk">1BHK</NewToggleButton>
          <NewToggleButton value="2bhk">2BHK</NewToggleButton>
          <NewToggleButton value="3bhk">3BHK</NewToggleButton>
          <NewToggleButton value="4bhk">4BHK</NewToggleButton>
          <NewToggleButton value="4+bhk">4+BHK</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          Bathrooms
        </Typography>
        <RoomToggleButtonGroup
          sx={{
            display: "grid",
            gridTemplateColumns:
              "auto auto auto auto auto auto auto auto auto auto auto auto auto",
            gridGap: "10px",
          }}
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <RoomToggleButton value="0">0</RoomToggleButton>
          <RoomToggleButton value="1">1</RoomToggleButton>
          <RoomToggleButton value="2">2</RoomToggleButton>
          <RoomToggleButton value="3">3</RoomToggleButton>
          <RoomToggleButton value="4">4</RoomToggleButton>
          <RoomToggleButton value="5">4+</RoomToggleButton>
        </RoomToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          Balcony
        </Typography>
        <RoomToggleButtonGroup
          sx={{
            display: "grid",
            gridTemplateColumns:
              "auto auto auto auto auto auto auto auto auto auto auto auto auto ",
            gridGap: "10px",
          }}
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <RoomToggleButton value="0r">0</RoomToggleButton>
          <RoomToggleButton value="1r">1</RoomToggleButton>
          <RoomToggleButton value="2r">2</RoomToggleButton>
          <RoomToggleButton value="3r">3</RoomToggleButton>
          <RoomToggleButton value="4r">4</RoomToggleButton>
          <RoomToggleButton value="5r">4+</RoomToggleButton>
        </RoomToggleButtonGroup>
      </div>
      <div
        style={{
          position: "relative",
          float: "right",
        }}
      >
        <CommonButton onClick={() => {setStep(3)}}>Next</CommonButton>
      </div>
    </>
  );
}

export default Location;

const bhk = [
  {
    name: "1RK",
  },
  {
    name: "1BHK",
  },
  {
    name: "2BHK",
  },
  {
    name: "3BHK",
  },
  {
    name: "4BHK",
  },
  {
    name: "4+BHK",
  },
];

const bk = [
  {
    name: "1RK",
  },
  {
    name: "1BHK",
  },
  {
    name: "2BHK",
  },
  {
    name: "3BHK",
  },
  {
    name: "4BHK",
  },
  {
    name: "4+BHK",
  },
];
