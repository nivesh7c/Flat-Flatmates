import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import RentalCard from "../../component/Cards/ContactedProperties/RentalCard";
import { Box, IconButton, Typography } from "@mui/material";
import Layout from "../../component/Common/Layout/Layout";
import editpic from "../../assets/png/icon/Edit.png";
// import PropertyDetail1 from "../../component/Input/ListFlatmate/PropertyDetail1";
import EditFlatmateListing from "../../component/Input/EditFlatmateListing";
import EditRentalListing from "../../component/Input/EditRentalListing";
import EditPGHostelListing from "../../component/Input/EditPGHostelListing";
import { useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import { getRequest, getWWWRequest } from "../../apis/baseApi";
import PropertyCard from "../../component/Cards/Common/PropertyCard";

const editIcon = <img src={editpic} />;

function EditProperty() {
  const location = useLocation();
  const alert = useAlert();

  const propertyId = new URLSearchParams(location.search).get("propertyId");
  const propertyType = new URLSearchParams(location.search).get("propertyType");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const getDetailUrl = () => {
    switch (propertyType) {
      case "flatmates":
        return `seller_dasboard/flatmates_details/${propertyId}/`;
        break;
      case "rent_properties":
        return `seller_dasboard/rent_properties_details_view/${propertyId}/`;
        break;
      case "pg_hostel":
        return `seller_dasboard/pg_hostel_details/${propertyId}/`;
        break;
      default:
        return ``;
    }
  };

  useEffect(() => {
    if (!propertyId || !propertyType) {
      alert.error("Invalid property Details");
      return;
    }
    const url = getDetailUrl();
    setLoading(true);
    getRequest(url)
      .then((res) => {
        if (res?.data?.status) {
          setData(res?.data?.data);
        } else {
          alert.error("Error in fetching data");
        }
      })
      .catch((err) => {
        alert.error("Something went wrong!");
      });
  }, [propertyId, propertyType]);

  const getEditComponent = () => {
    switch (propertyType) {
      case "flatmates":
        return <EditFlatmateListing data={data} />;
      case "rent_properties":
        return <EditRentalListing data={data} />;
      case "pg_hostel":
        return <EditPGHostelListing data={data} />;
    }
  };

  return (
    <>
      <Layout>
        <div style={{ marginTop: "4%", paddingBottom: "50px" }}>
          <Box sx={{ border: "1px solid #D7D7D7", borderRadius: "10px" }}>
            <div style={{ borderBottom: "1px solid #D7D7D7" }}>
              <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#4A4A4A",
                  }}
                >
                  Edit Property
                </Typography>
                <IconButton>{editIcon}</IconButton>
              </Box>
            </div>
            <div style={{ padding: "10px" }}>
              <Grid container spacing={2}>
                <Grid
                  xs={12}
                  sm={5}
                  sx={{
                    borderRight: "1px solid #D7D7D7",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Box sx={{ p: 4 }}>
                    <PropertyCard
                      propertyType={propertyType}
                      data={data}
                      propertyId={propertyId}
                      isEdit={true}
                    />
                  </Box>
                </Grid>
                <Grid xs={12} sm={7}>
                  <Box sx={{ p: [0, 1, 2] }}>{getEditComponent()}</Box>
                </Grid>
              </Grid>
            </div>
          </Box>
        </div>
      </Layout>
    </>
  );
}

export default EditProperty;
