import { Typography, Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s0 from "../../../assets/svg/s0.svg";
import s1 from "../../../assets/svg/s1.svg";
import s2 from "../../../assets/svg/s2.svg";
import s3 from "../../../assets/svg/s3.svg";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function ListingOption({ index }) {
  const history = useHistory();

  function getListUrl() {
    switch (index) {
      case 0:
        return "/list-rental-property";
      case 1:
        return "/list-pg-hostel";
      case 2:
        return "/list-flatmates";
      default:
        return "/list-rental-property";
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        backgroundColor: "#fff",
        width: "100%",
        p: 2,
        borderRadius: "12px",
      }}
      onClick={() => {
        history.push(getListUrl());
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
        <img
          src={data[index]?.img}
          style={{
            display: "block",
            height: "340px",
            backgroundColor: "#fff",
          }}
        />
      </Box>
      <Typography
        color="primary"
        variant="body2"
        sx={{ fontWeight: "700", textAlign: "center" }}
      >
        {data[index]?.content}
      </Typography>
    </Box>
  );
}

const data = [
  {
    img: s1,
    content: "List your property with us",
  },
  {
    img: s0,
    content: "List your Pg/Hostel with us ?",
  },
  {
    img: s2,
    content: "Find flatmates",
  },
  //   {
  //     img: s3,
  //     content:  "Explored shared Apartments"
  //   },
];
