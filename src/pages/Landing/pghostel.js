import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import agent from "../../assets/png/agent.png";
import Frame from "../../assets/png/Frame.png";
import A3 from "../../assets/png/icon/AddProperty.png";
import A2 from "../../assets/png/icon/Agent.png";
import A1 from "../../assets/png/icon/Easy.png";
import l1 from "../../assets/png/l1.png";
import l2 from "../../assets/png/rental_3.png";
import bg from "../../assets/svg/Blob_Shape.svg";
import { CommonButton } from "../../component/Cards/Common/CommonButton";
import PgHostelListing from "../../component/Cards/Common/PgHostelListingCard";
import HomeFilter from "../../component/Common/Filter/HomeFilter";
import Layout from "../../component/Common/Layout/Layout";
import { useEffect, useState } from "react";
import { getRequest, getWWWRequest } from "../../apis/baseApi";
import { useAlert } from "react-alert";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import { getUserName } from "../../utility/common";

const a1icon = <img src={A1} style={{ marginRight: "5px" }} />;
const a2icon = <img src={A2} style={{ marginRight: "5px" }} />;
const a3icon = <img src={A3} style={{ marginRight: "5px" }} />;

const BackPanel = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundImage: `url(${bg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: "#FDE3BE",
  display: "flex",
  justifyContent: "center",
  borderRadius: "10px",
  // position: "fixed",
}));

const FirstSectionImagePanel = styled("div")(({ theme }) => ({
  backgroundImage: ` url(${l1})`,
  minHeight: "300px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "#000",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.only("xs")]: {
    minHeight: "160px",
  },
}));

const color1 = "#FED79E ";
const color2 = "rgba(243, 134, 48, 0.0117) ";
const color3 = "#ffff";

const color4 = "#000000";
const color5 = "#37474F00";
const color6 = "#ffff";

function HomePgHostel() {
  const [data, setData] = useState([]);

  const history = useHistory();

  localStorage.setItem("property_type", "RENT_SHARED");

  const alert = useAlert();

  const getFilter = () => {
    if (localStorage.getItem("RENT_SHARED_PREFERENCES")) {
      const rent_preference = JSON.parse(
        localStorage.getItem("RENT_SHARED_PREFERENCES")
      );
      let str = "?";
      if (rent_preference?.city) {
        str += `city=${rent_preference?.city}&`;
      }
      if (rent_preference?.rent) {
        str += `min_price=0&max_price=${rent_preference?.rent}&`;
      }
      if (rent_preference?.sharingType) {
        str += `sharing=${rent_preference?.sharingType}&`;
      }
      if (rent_preference?.availability) {
        str += `availibilty=${rent_preference?.availability}&`;
      }
      if (rent_preference?.gender) {
        str += `avialable_for=${rent_preference?.gender}&`;
      }
      if(rent_preference?.area && rent_preference?.area.length > 0 ){
        let latLong = "";
        rent_preference?.area?.map((item, index) => {
            if(index < rent_preference?.area.length - 1){
                latLong += `${item?.lat},`
                latLong += `${item?.long}-`
            }
            else{
                latLong += `${item?.lat},`
                latLong += `${item?.long}`
                }

        })
        str += `lat_long=${latLong}&`
    }
      return str;
    } else return ``;
  };

  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    getRequest(`pg_hostel/pg_hostel_listing/${getFilter()}`)
      .then((res) => {
        if (res?.data?.results) {
          setData(res?.data?.results);
        }
      })
      .catch((err) => {
        alert.error("Error in fetching pg hostel apartments!!");
      });
  }, []);

  useEffect(() => {
    if (isRefresh) {
      getRequest(`pg_hostel/pg_hostel_listing/${getFilter()}`)
        .then((res) => {
          if (res?.data?.results) {
            setData(res?.data?.results);
          }
        })
        .catch((err) => {
          alert.error("Error in fetching pg hostel apartments!!");
        });
      setIsRefresh(false);
    }
  }, [isRefresh]);

  const isLoggedIn = localStorage.getItem("token") ? true : false;

  return (
    <>
      <Layout showCity={true} setRefresh={setIsRefresh} isRefresh={isRefresh}>
        <div style={{ marginTop: "4%", paddingBottom: "50px" }}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Welcome back, {getUserName()}
          </Typography>
          <div
            style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}
          >
            <HomeFilter type={"pghostel"} refreshData={setIsRefresh} isRefresh={isRefresh}/>
          </div>

          <div>
            <Grid container spacing={2}>
              <Grid xs={12} style={{ display: "grid" }}>
                <BackPanel>
                  <Grid
                    container
                    spacing={2}
                    sx={{ width: "100%", padding: "40px" }}
                  >
                    <Grid xs={12} sm={6} style={{ display: "grid" }}>
                      <FirstSectionImagePanel />
                    </Grid>
                    <Grid xs={12} sm={6} style={{ display: "grid" }}>
                      <div>
                        <Typography
                          component="h1"
                          variant="h5"
                          sx={{ color: "#fff", fontWeight: "700" }}
                        >
                          Explore the <br /> best matches <br />
                          curated to your needs
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "500", mt: 4, mb: 4 }}
                        >
                          Best combo of price, location,
                          <br /> availability and amenities
                        </Typography>

                        <CommonButton
                          endIcon={<ArrowRightAltIcon />}
                          onClick={() => {
                            history.push("/listing/pghostel");
                          }}
                        >
                          View your Best matches
                        </CommonButton>
                      </div>
                    </Grid>
                  </Grid>
                </BackPanel>
              </Grid>
              <Grid xs={12} sm={6} style={{ display: "grid" }}>
                <div
                  style={{
                    // width: "100%",
                    backgroundImage: `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%), url(${l1})`,
                    minHeight: "300px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "10px",
                  }}
                >
                  <Typography sx={{ fontWeight: "600" }}>
                    Explore Apartments that best fit your needs.
                  </Typography>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ffff",
                        color: "#000",
                        maxWidth: "200px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        history.push("/listing/pghostel");
                      }}
                    >
                      View Best Profiles
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={6} style={{ display: "grid" }}>
                <div
                  style={{
                    // backgroundImage: `url(${l1})`,
                    // background: `linear-gradient(190deg, #fa7c30 30%, rgba(0, 0, 0, 0)30%), url(${l1});`,
                    //width: "100%",
                    backgroundImage: `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%), url(${l2})`,
                    minHeight: "300px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "10px",
                  }}
                >
                  <Typography sx={{ fontWeight: "600" }}>
                    Explore Apartments that best fit your your budget.
                    <br />
                    100+ Matches
                  </Typography>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ffff",
                        color: "#000",
                        maxWidth: "200px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        history.push("/listing/pghostel");
                      }}
                    >
                      View matches
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid xs={12}>
                <Typography variant="h6">Pg/Hostel Properties</Typography>
              </Grid>
              <Swiper
                id="swiper-color"
                effect={"fade"}
                navigation={true}
                // pagination={{
                //   clickable: true,
                // }}
                showsPagination={false}
                loop={false}
                slidesPerView={3}
                breakpoints={{
                  "@0.00": {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  "@0.75": {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  "@1.00": {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  "@1.50": {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                }}
              >
                {data &&
                  data?.map((item) => {
                    return (
                      <SwiperSlide>
                        <Grid
                          xs={12}
                          style={{ width: "100%", cursor: "pointer" }}
                          onClick={() => {
                            history.push(
                              `/detail/pghostel/${item?.city}/${item?.id}`
                            );
                          }}
                        >
                          <PgHostelListing data={item} />
                        </Grid>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              <Grid xs={12}>
                <Typography variant="h6">LIST WITH US</Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <div
                  style={{
                    // width: "100%",
                    backgroundImage: `linear-gradient(to right,  ${color4} 0%,${color5} 100%), url(${agent})`,
                    minHeight: "200px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history.push("/list-rental-property");
                  }}
                >
                  <Typography
                    color="primary"
                    sx={{ fontWeight: "600", fontSize: "16px" }}
                  >
                    Are you a property owner?
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    List your property here.
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    {a2icon}
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      No Brokerage costs
                      <br />
                      We connect you direct with tenants
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    {a3icon}
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      Free Listing Post your Ad for free
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    {a1icon}
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      Quick and Hassle free
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={6}>
                <div
                  style={{
                    // width: "100%",
                    backgroundImage: `linear-gradient(to right,  ${color4} 0%,${color5} 100%), url(${l1})`,
                    minHeight: "200px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    color: "#000",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history.push("/listing-option");
                  }}
                >
                  <Typography
                    color="primary"
                    sx={{ fontWeight: "600", fontSize: "16px" }}
                  >
                    Looking for a Flatmate?
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    List your pg/ hostel or flat with us
                  </Typography>
                </div>
              </Grid>
              <Grid xs={12} style={{ display: "grid" }}>
                <div
                  style={{
                    // width: "100%",
                    backgroundImage: ` url(${Frame})`,
                    minHeight: "300px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "12px",
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default HomePgHostel;
