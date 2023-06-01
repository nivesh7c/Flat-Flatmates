import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// import CustomAutoFill from "../../Input/CustomAutoFill";
import CustomAutoFillMultiple from "../../Input/CustomAutoFillMultiple";
import CustomAvailability from "../../Input/CustomAvailability";
import CustomSharingTypeGender from "../../Input/CustomSharingTypeGender";
import CustomSlider from "../../Input/CustomSlider";
import { CommonButton } from "./CommonButton";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useState } from "react";
import { putRequest } from "../../../apis/baseApi";

export default function RentSharedPreference({
  isDialog = false,
  handleClose = () => {},
  isListing = false,
  isEditPreference = false,
}) {
  const history = useHistory();
  const alert = useAlert();

  let userPreference = localStorage.getItem("RENT_SHARED_PREFERENCES");
  const [preference, setPreference] = useState(
    userPreference && JSON.parse(userPreference)
      ? JSON.parse(userPreference)
      : {
          city: "Delhi",
          area: [],
          availability: "",
          rent: 10000,
          sharingType: "",
          gender: "",
        }
  );

  const [loading, setLoading] = useState(false);

  function updatePreference() {
    setLoading(true);
    if (localStorage.getItem("token")) {
      userPreference = localStorage.getItem("user_preference");
      let body = null;
      if (userPreference) {
        userPreference = JSON.parse(userPreference);
        userPreference["shared"] = preference;
        body = {
          preferences: userPreference,
        };
      } else {
        body = {
          preferences: {
            shared: preference,
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
            history.push(isListing ? "/listing/pghostel" : "/home/pghostel");
          localStorage.setItem(
            "RENT_SHARED_PREFERENCES",
            JSON.stringify(preference)
          );
          setLoading(false);
          if (isDialog) {
            handleClose();
          }
        })
        .catch((err) => {
          alert.error("Error in updating preference!");
          setLoading(false);
        });
    } else {
      if (!isEditPreference)
        history.push(isListing ? "/listing/pghostel" : "/home/pghostel");
      localStorage.setItem(
        "RENT_SHARED_PREFERENCES",
        JSON.stringify(preference)
      );
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
          // paddingLeft: "20px",
          // paddingRight: "20px",
          pl: [2, 2, 2],
          pr: [2, 2, 2],
        }}
      >
        <Grid container spacing={4}>
          <Grid md={12} xs={12} sm={12}>
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
            {/* <CustomProperty /> */}
            <CustomSharingTypeGender
              sharingType={preference?.sharingType}
              gender={preference?.gender}
              setSharingType={(value) => {
                setPreference({ ...preference, sharingType: value });
              }}
              setGender={(value) => {
                setPreference({ ...preference, gender: value });
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
          <Grid md={12} xs={12} sm={12}>
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
