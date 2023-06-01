import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";

const rupee = (
  <svg
    width="25"
    height="19"
    viewBox="0 0 25 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="24.4942" height="19" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_974_8642"
          transform="translate(0.112153) scale(0.00808015 0.0104167)"
        />
      </pattern>
      <image
        id="image0_974_8642"
        width="96"
        height="96"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

const IOSSlider = styled(Slider)(({ theme }) => ({
  color:
    " linear-gradient(270deg, #FFA321 16.97%, #FFA321 19.3%, #FFC148 100%)",
  height: 3,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#FF9703",
    // boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      //   boxShadow:
      //     "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",

      "@media (hover: none)": {
        // boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

const amount = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: "0px",
};

export default function CustomSlider({ value, setValue }) {
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleInputChange = (event) => {
  //   setValue(event.target.value === "" ? "" : Number(event.target.value));
  // };

  // const handleBlur = () => {
  //   if (value < 0) {
  //     setValue(0);
  //   } else if (value > 100) {
  //     setValue(100);
  //   }
  // };

  return (
    <Box
      sx={{
        width: "98%",
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ paddingLeft: "0px", paddingRight: "0px" }}
      >
        <Grid xs={12} style={amount}>
          <div>
            <Typography
              style={{ fontSize: "14px", color: "#ABA7A7", display: "flex" }}
            >
              {rupee} Budget
            </Typography>
          </div>

          <div>
            <Typography style={{ fontSize: "14px", color: "#ABA7A7" }}>
              {value}
            </Typography>
          </div>
        </Grid>
        <Grid xs={12}>
          <IOSSlider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={500000}
            step={500}
            // marks  
          />
        </Grid>
      </Grid>
    </Box>
  );
}
