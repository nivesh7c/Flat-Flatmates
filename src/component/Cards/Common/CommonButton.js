import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CommonButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  background:
    " linear-gradient(270deg, #FFA321 16.97%, #FFA321 19.3%, #FFC148 100%)",
  boxShadow: "none",
  width: "225px",
  height: "40px",
  fontStyle: "normal",
  textTransform: "inherit",
}));
