import {
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
} from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CommonButton } from "../../Cards/Common/CommonButton";
import { styled } from "@mui/material/styles";
import {
  AmenitiesToggleButton,
  R1Icon,
  R2Icon,
  R3Icon,
  R4Icon,
  R5Icon,
  R6Icon,
} from "../../Cards/Common/CustomIcon/CustomIcon";

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

function ListYourPg({setStep}) {
  const [currentButtonVariant, setCurrentButtonVariant] = useState("outlined");

  const handleButtonVariantChange = () => {
    if (currentButtonVariant === "outlined") {
      setCurrentButtonVariant("contained");
    } else {
      setCurrentButtonVariant("outlined");
    }
  };

  const [selected, setSelected] = React.useState(false);

  const handleChangeR = (event, newR) => {
    setSelected(newR);
  };

  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const [gender, setGender] = React.useState("female");

  const handleChange = (event, newGender) => {
    setGender(newGender);
  };

  const control = {
    value: gender,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <>
      <Typography variant="h6">List your PG/ Hostel with us </Typography>
      <Typography variant="body1" sx={{ color: "#ABA7A7" }}>
        Kindly fill out this form*
      </Typography>
      <br />
      <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
        Location
      </Typography>
      <Grid container spacing={2}>
        <Grid md={6} style={{ display: "grid" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={top100Films}
            renderInput={(params) => (
              <TextField {...params} placeholder="Availability" />
            )}
          />
        </Grid>
        <Grid md={6} style={{ display: "grid" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={top100Films}
            renderInput={(params) => (
              <TextField {...params} placeholder="Availability" />
            )}
          />
        </Grid>{" "}
        <Grid md={6} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            Monthly rent
          </Typography>

          <TextField placeholder="Monthly rent" color="primary" size="small" />
        </Grid>{" "}
        <Grid md={6} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            Monthly deposit
          </Typography>

          <TextField
            placeholder="Monthly deposit"
            color="primary"
            size="small"
          />
        </Grid>{" "}
        <Grid md={6} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            Monthly Maintanance
          </Typography>

          <TextField
            placeholder="Monthly Maintanance "
            color="primary"
            size="small"
          />
        </Grid>{" "}
        <Grid md={6} style={{ display: "grid" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            Area Size
          </Typography>

          <TextField placeholder="Area Size " color="primary" size="small" />
        </Grid>{" "}
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
          <NewToggleButton value="full">Full Furnished</NewToggleButton>
          <NewToggleButton value="semi">Semi Furnished</NewToggleButton>
          <NewToggleButton value="unfurnished">Unfurnished</NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          Preferred Tenants
        </Typography>
        <StyledToggleButtonGroup
          sx={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gridGap: "20px",
          }}
          {...control}
          aria-label="text formatting"
        >
          <NewToggleButton value="female" key="female">
            Female
          </NewToggleButton>
          <NewToggleButton value="male" key="male">
            Male
          </NewToggleButton>
          <NewToggleButton value="both" key="both">
            Both
          </NewToggleButton>
        </StyledToggleButtonGroup>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
          Amenities
        </Typography>

        <Grid container spaacing={4}>
          {bhk.map((value, index) => (
            <Grid
              xs={4}
              md={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <AmenitiesToggleButton
                key={value.key}
                value={value.key}
                selected={selected}
                onChange={() => {
                  setSelected(!selected);
                }}
              >
                {value.icon}
              </AmenitiesToggleButton>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: selected ? "#FFA321" : "#ABA7A7",
                }}
              >
                {value.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>

      <div
        style={{
          position: "relative",
          float: "right",
        }}
      >
        <CommonButton onClick={() => {setStep(4)}}>Next</CommonButton>
      </div>
    </>
  );
}

export default ListYourPg;

const bhk = [
  {
    key: 0,
    icon: <R1Icon />,
    name: "Clubhouse",
  },
  {
    key: 1,
    icon: <R2Icon />,
    name: "Shopping Center",
  },
  {
    key: 2,
    icon: <R3Icon />,
    name: "Park",
  },
  {
    key: 3,
    icon: <R4Icon />,
    name: "Fire Safety",
  },
  {
    key: 4,
    icon: <R5Icon />,
    name: "Swimming Pool",
  },
  {
    key: 5,
    icon: <R6Icon />,
    name: "Internet Services",
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

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
];
