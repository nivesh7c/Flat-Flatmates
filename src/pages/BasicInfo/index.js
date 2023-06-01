import { Container, Paper } from "@mui/material";
import SecondLayout from "../../component/Common/Layout/SecondLayout";

import { styled } from "@mui/material/styles";
import bg from "../../assets/svg/bg.svg";
import AddImage from "../../component/Input/RentProperties/AddImage";

const BackPanel = styled("div")(({ theme }) => ({
  width: "100%",
  height: "auto",
  position: "absolute",
  backgroundImage: `url(${bg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  justifyContent: "center",
  //position: "fixed",
}));

export default function BasicInfo() {
  return (
    <>
      <SecondLayout>
        <BackPanel>
          <Container
            maxWidth="lg"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {" "}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                // margin: "auto",
                maxWidth: 460,
                minHeight: "500px",
                mt: 10,
                borderRadius: "16px",
                flexGrow: 1,
                mb: 10,
                //display: "flex",
                // justifyContent: "center",
                // flexDirection: "column",
                // alignItems: "center",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              {/* <List /> */}
              {/* <Location /> */}
              {/* <ListYourPg /> */}
              <AddImage />
            </Paper>
          </Container>
        </BackPanel>
      </SecondLayout>
    </>
  );
}
