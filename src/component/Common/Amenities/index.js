import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  AmenitiesToggleButton
} from "../../Cards/Common/CustomIcon/CustomIcon";

function AmenitiesComponent({value, setAmenities, amenity}) {
    return(
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
                selected={amenity}
                onChange={() => {
                  setAmenities(!amenity);
                }}
              >
                {value.icon}
              </AmenitiesToggleButton>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: amenity ? "#FFA321" : "#ABA7A7",
                }}
              >
                {value.name}
              </Typography>
            </Grid>
    )
}

export default AmenitiesComponent;