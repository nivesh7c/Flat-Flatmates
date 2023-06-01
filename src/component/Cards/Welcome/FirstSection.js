import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { EffectFade } from "swiper";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import s0 from "../../../assets/svg/s0.svg";
import s1 from "../../../assets/svg/s1.svg";
import s2 from "../../../assets/svg/s2.svg";
import s3 from "../../../assets/svg/s3.svg";
import { CommonButton } from "../Common/CommonButton";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function FirstSection() {
  const history = useHistory();

  return (
    <>
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
      <div style={{ width: "400px", height: "380px" }}>
        <Swiper
          //className="container testimonials__container"
          // install Swiper modules
          className="mySwiper"
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          //spaceBetween={30}
          effect={"fade"}
        >
          {data.map(({ img, content }, index) => {
            return (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={img}
                    style={{
                      display: "block",
                      height: "350px",
                      backgroundColor: "#fff",
                    }}
                  />
                  <Typography
                    color="primary"
                    variant="body2"
                    sx={{
                      fontWeight: "700",
                      textAlign: "center",
                      marginTop: "-20px",
                    }}
                  >
                    {content}
                  </Typography>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* <br /> */}
      <CommonButton
        onClick={() => {
          // setFlowStep(1);
          history.push("continue");
        }}
      >
        Lets Get Started
      </CommonButton>
    </>
  );
}

const data = [
  {
    img: s0,
    content: "Looking for a place to rent ?",
  },
  {
    img: s1,
    content: "List your property with us",
  },
  {
    img: s3,
    content: "Explored shared Apartments",
  },
  {
    img: s2,
    content: "Find flatmates",
  },
];
