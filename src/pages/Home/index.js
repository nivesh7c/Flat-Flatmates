import { styled } from "@mui/material/styles";
import bg from "../../assets/svg/bg.svg";
import Welcome from "../../component/Cards/Welcome";

const BackPanel = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${bg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  position: "fixed",
  [theme.breakpoints.only("xs")]: {
    backgroundImage: "none",
    backgroundColor: "#fff",
    height: "auto",
  },
}));

export default function Home({ step }) {
  return (
    <>
      <BackPanel>
        <Welcome step={step} />
      </BackPanel>
    </>
  );
}
