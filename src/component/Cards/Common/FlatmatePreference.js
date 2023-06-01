import { Box, Typography, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import CustomAutoFill from "../../Input/CustomAutoFill";
import CustomAutoFillMultiple from "../../Input/CustomAutoFillMultiple";
import CustomAvailabilityGender from "../../Input/CustomAvailabilityGender";
import CustomPropertySharingType from "../../Input/CustomPropertySharingType";
import CustomSlider from "../../Input/CustomSlider";
import { CommonButton } from "./CommonButton";
import { putRequest } from "../../../apis/baseApi";
import { useAlert } from "react-alert";

export default function FlatmatePreference({
  isDialog = false,
  handleClose = () => {},
  isListing = false,
  isEditPreference = false,
}) {
  const history = useHistory();
  const alert = useAlert();

  let userPreference = localStorage.getItem("FLATMATES_PREFERENCES");

  const [preference, setPreference] = useState(
    userPreference && JSON.parse(userPreference)
      ? JSON.parse(userPreference)
      : {
          city: "Delhi",
          area: [],
          propertyType: "",
          sharingType: "",
          availability: "",
          preferredTenant: "",
          rent: 10000,
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
        userPreference["flatmates"] = preference;
        body = {
          preferences: userPreference,
        };
      } else {
        body = {
          preferences: {
            flatmates: preference,
          },
        };
      }
      putRequest("authentications/user_details/", body)
        .then((res) => {
          if (res?.data?.status) {
            alert.success("Preferences updated successfully!!");
          } else {
            alert.error("Error in updating preferencec!");
          }
          if (!isEditPreference)
            history.push(isListing ? "/listing/flatmates" : "/home/flatmates");
          localStorage.setItem(
            "FLATMATES_PREFERENCES",
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
        history.push(isListing ? "/listing/flatmates" : "/home/flatmates");
      localStorage.setItem("FLATMATES_PREFERENCES", JSON.stringify(preference));
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
          {!isDialog && (
            <Grid xs={12} sm={12} md={12}>
              <Link
                to="/list-flatmates"
                style={{ color: "primary", textDecoration: "none" }}
              >
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{
                    fontWeight: "700",
                    textAlign: "center",
                    marginTop: "-20px",
                  }}
                >
                  Have flat, looking for flatmates? list your requirement here
                </Typography>
              </Link>
            </Grid>
          )}
          <Grid xs={12} sm={12} md={12}>
            <CustomAutoFillMultiple
              city={preference?.city}
              area={preference?.area}
              setCity={(value) => {

                setPreference({ ...preference, city: value, area: [] });
                // setPreference({ ...preference, area: [] });
              }}
              setArea={(value) => {
                setPreference({ ...preference, area: value });
              }}
            />
          </Grid>
          <Grid xs={12} sm={12} md={12}>
            <CustomPropertySharingType
              propertyType={preference?.propertyType}
              sharingType={preference?.sharingType}
              setPropertyType={(value) => {
                setPreference({ ...preference, propertyType: value });
              }}
              setSharingType={(value) => {
                setPreference({ ...preference, sharingType: value });
              }}
            />
          </Grid>
          <Grid md={12} xs={12} sm={12}>
            <CustomAvailabilityGender
              availability={preference?.availability}
              setAvailability={(value) => {
                setPreference({ ...preference, availability: value });
              }}
              gender={preference?.gender}
              setGender={(value) => {
                setPreference({ ...preference, gender: value });
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
