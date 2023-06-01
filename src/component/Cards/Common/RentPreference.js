import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// import CustomAutoFill from "../../Input/CustomAutoFill";
import CustomAutoFillMultiple from "../../Input/CustomAutoFillMultiple";
// import CustomProperty from "../../Input/CustomProperty";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { putRequest } from "../../../apis/baseApi";
import CustomAvailability from "../../Input/CustomAvailability";
import CustomPropertyBHK from "../../Input/CustomPropertyBHK";
import CustomSlider from "../../Input/CustomSlider";
import { CommonButton } from "./CommonButton";

export default function RentPreference({
  isDialog = false,
  handleClose = () => {},
  isListing = false,
  isEditPreference = false,
}) {
  const history = useHistory();
  const alert = useAlert();

  let userPreference = localStorage.getItem("RENT_PREFERENCES");

  const [preference, setPreference] = useState(
    userPreference && JSON.parse(userPreference)
      ? JSON.parse(userPreference)
      : {
          city: "Delhi",
          area: [],
          propertyType: "",
          bhk: "",
          availability: "",
          rent: 10000,
        }
  );

  const [loading, setLoading] = useState(false);

  function updatePreference() {
    setLoading(true);
    if (localStorage.getItem("token")) {
      let body = null;
      if (userPreference) {
        userPreference = JSON.parse(userPreference);
        userPreference["rent"] = preference;
        body = {
          preferences: userPreference,
        };
      } else {
        body = {
          preferences: {
            rent: preference,
          },
        };
      }
      putRequest("authentications/user_details/", body)
        .then((res) => {
          if (res?.data?.status) {
            alert.success("Preferences updated successfully!!");
          } else {
            alert.error("Error in updating preference!");
          }
          if (!isEditPreference)
            history.push(isListing ? "/listing/rental" : "/home/rental");
          localStorage.setItem("RENT_PREFERENCES", JSON.stringify(preference));
          setLoading(false);
          if (isDialog) {
            handleClose();
          }
        })
        .catch((err) => {
          alert.error("Error in updating profile!");
          setLoading(false);
        });
    } else {
      if (!isEditPreference)
        history.push(isListing ? "/listing/rental" : "/home/rental");
      localStorage.setItem("RENT_PREFERENCES", JSON.stringify(preference));
      if (isDialog) {
        handleClose();
      }
    }
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "20px",
          pl: [2, 2, 2],
          pr: [2, 2, 2],
          // paddingLeft: "20px",
          // paddingRight: "20px",
        }}
      >
        <Grid container spacing={4}>
          <Grid xs={12} sm={12} md={12}>
            <CustomAutoFillMultiple
              city={preference?.city}
              area={preference?.area}
              setCity={(value) => {
                setPreference({ ...preference, city: value, area: [] });
              }}
              setArea={(value) => {
                setPreference({ ...preference, area: value });
              }}
            />
          </Grid>
          <Grid md={12} xs={12} sm={12}>
            <CustomPropertyBHK
              propertyType={preference?.propertyType}
              bhk={preference?.bhk}
              setPropertyType={(value) => {
                setPreference({ ...preference, propertyType: value });
              }}
              setBhk={(value) => {
                setPreference({ ...preference, bhk: value });
              }}
            />
          </Grid>
          <Grid md={12} xs={12} sm={12}>
            <CustomAvailability
              availability={preference?.availability}
              setAvailability={(value) => {
                setPreference({ ...preference, availability: value?.title });
              }}
            />
          </Grid>
          <Grid md={12} xs={12} sm={12} sx={{ display: "grid" }}>
            <CustomSlider
              value={preference?.rent}
              setValue={(value) => {
                setPreference({ ...preference, rent: value });
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <br />
      <Box sx={{ display: "flex", justifyContent: "center", pb: "20px" }}>
        <CommonButton
          onClick={() => {
            updatePreference();
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : isEditPreference ? (
            "Save"
          ) : (
            "Search"
          )}
        </CommonButton>
      </Box>
    </>
  );
}
