import PropTypes from "prop-types";
// import SwipeableViews from "react-swipeable-views";
import { CircularProgress } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { getRequest, getWWWRequest } from "../../../apis/baseApi";
import PropertyCard from "../../Cards/Common/PropertyCard";
import { Pagination } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: [1, 2, 3] }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function DashboardTab({ propertyType }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const alert = useAlert();
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const getQueryParam = () => {
    switch (value) {
      case 0:
        return `?is_active=true&is_under_review=false&is_deleted=false&page=${page}`;
      case 1:
        return `?is_under_review=true&is_deleted=false&page=${page}`;
      case 2:
        return `?is_active=false&is_deleted=false&page=${page}`;
      default:
        return ``;
    }
  };

  useEffect(() => {
    const url = `seller_dasboard/${propertyType}_list/${getQueryParam()}`;
    setLoading(true);
    setData([]);
    setCount(0);
    getRequest(url)
      .then((res) => {
        if (res?.data?.results) {
          setData(res?.data?.results);
          setCount(res?.data?.count ? res?.data?.count : 0);
          setValue(0);
        } else {
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert.error("Error in fetching data");
      });
  }, [propertyType]);

  useEffect(() => {
    const url = `seller_dasboard/${propertyType}_list/${getQueryParam()}`;
    setLoading(true);
    setData([]);
    setCount(0);
    getRequest(url)
      .then((res) => {
        if (res?.data?.results) {
          setData(res?.data?.results);
          setCount(res?.data?.count ? res?.data?.count : 0);
          // setValue(0);
        } else {
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert.error("Error in fetching data");
      });
  }, [value, page]);

  const handlePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#fff", boxShadow: "none" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab
            label="Active"
            sx={{ textTransform: "inherit" }}
            {...a11yProps(0)}
          />
          <Tab
            label="Waitlisted "
            sx={{ textTransform: "inherit" }}
            {...a11yProps(1)}
          />
          <Tab
            label="Inactive"
            sx={{ textTransform: "inherit" }}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <Grid container spacing={2}>
          {/* <div style={{display: "flex", flexDirection: "column"}}> */}

          {loading ? (
            <CircularProgress />
          ) : data && data.length > 0 ? (
            data?.map((item) => {
              return (
                <Grid xs={12} sm={6} style={{ display: "grid" }}>
                  <PropertyCard
                    data={item}
                    propertyType={propertyType}
                    propertyId={item?.id}
                  />
                </Grid>
              );
            })
          ) : (
            <div>No property added</div>
          )}

          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {count > 0 && (
              <Pagination
                color="primary"
                count={Math.ceil(count / 9)}
                variant="outlined"
                shape="rounded"
                onChange={handlePage}
              />
            )}
          </div>
          {/* </div> */}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Grid container spacing={2}>
          {/* <div style={{display: "flex", flexDirection: "column"}}> */}
          {loading ? (
            <CircularProgress />
          ) : data && data.length > 0 ? (
            data?.map((item) => {
              return (
                <Grid xs={12} sm={6} style={{ display: "grid" }}>
                  <PropertyCard
                    data={item}
                    propertyType={propertyType}
                    propertyId={item?.id}
                  />
                </Grid>
              );
            })
          ) : (
            <div>No property added</div>
          )}
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {count > 0 && (
              <Pagination
                color="primary"
                count={Math.ceil(count / 9)}
                variant="outlined"
                shape="rounded"
                onChange={handlePage}
              />
            )}
          </div>
          {/* </div> */}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Grid container spacing={2}>
          {/* <div style={{display: "flex", flexDirection: "column"}}> */}
          {loading ? (
            <CircularProgress />
          ) : data && data.length > 0 ? (
            data?.map((item) => {
              return (
                <Grid xs={12} sm={6} style={{ display: "grid" }}>
                  <PropertyCard
                    data={item}
                    propertyType={propertyType}
                    propertyId={item?.id}
                  />
                </Grid>
              );
            })
          ) : (
            <div>No property added</div>
          )}
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {count > 0 && (
              <Pagination
                color="primary"
                count={Math.ceil(count / 9)}
                variant="outlined"
                shape="rounded"
                onChange={handlePage}
              />
            )}
          </div>
          {/* </div> */}
        </Grid>
      </TabPanel>
    </Box>
  );
}
