import { Typography, IconButton } from "@mui/material";
import { EffectFade } from "swiper";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper } from "swiper/react";
import CardSelection from "./CardSelection";
import { useEffect } from "react";
import { getRequest } from "../../../apis/baseApi";
import { useAlert } from "react-alert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom"

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function ChooseFlat({ setFlowStep }) {
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    getRequest("authentications/user_details/")
      .then((res) => {
        if (res?.data?.status) {
          
          localStorage.setItem(
            "user_preference",
            JSON.stringify(
              res?.data?.data?.preferences ? res?.data?.data?.preferences : {}
            )
          );
          localStorage.setItem("user_details", JSON.stringify(res?.data?.data));
        } else {
          
        }
      })
      .catch((err) => {
        alert.error("Error in fetching user details. Logging you out");
        localStorage.clear();
        history.push("/");
      });
  }, []);
  return (
    <>
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ width: "2%" }}>
          <IconButton color="primary">
            <ArrowBackIosIcon
              onClick={() => {
                setFlowStep(1);
              }}
            />
          </IconButton>
        </div>
        <div style={{ textAlign: "center", width: "98%" }}>
          <Typography
            component="h1"
            variant="body1"
            sx={{ fontWeight: "700", textAlign: "center" }}
          >
            Welcome to
            <br />
            <span
              style={{
                color: "#FFA321",
                fontSize: "24px",
              }}
            >
              Flat and Flatmates
            </span>
          </Typography>
        </div>
      </div>
      <div style={{ height: "100%", width: "100%", textAlign: "center" }}>
        {" "}
        <div>
          <Swiper
            //className="container testimonials__container"
            // install Swiper modules
            className="mySwiper"
            modules={[EffectFade, Navigation, Pagination]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            //spaceBetween={30}
            effect={"fade"}
          >
            {/* <SwiperSlide> */}
            <CardSelection setFlowStep={setFlowStep} />
            {/* </SwiperSlide> */}
            {/* <SwiperSlide>
              <CardSelection />
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </>
  );
}
