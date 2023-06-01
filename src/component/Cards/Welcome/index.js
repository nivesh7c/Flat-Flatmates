import { Paper } from "@mui/material";
import { useState } from "react";
import ChooseFlat from "./ChooseFlat";
import CreateAccount from "./CreateAccount";
import EnterOtp from "./EnterOtp";
import FirstSection from "./FirstSection";
import Proceed from "./Proceed";
import SignInOtp from "./SignInOtp";
import YourPreferences from "./YourPreferences";
import { styled } from "@mui/material/styles";
import SignInEmail from "./SignInEmail";

const RootPaper = styled(Paper)(({ theme }) => ({
  padding: 20,
  boxShadow: "none",
  margin: "auto",
  maxWidth: 460,
  maxHeight: "700px",
  borderRadius: "16px",
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  [theme.breakpoints.only("xs")]: {
    // height: "100vh",
  },
}));

export default function Welcome({ step }) {
  const [flowStep, setFlowStep] = useState(step ? step : 0);

  const [mobileNumber, setMobileNumber] = useState();

  function getComponentSteps() {
    switch (flowStep) {
      case 0:
        return <FirstSection flowStep={flowStep} setFlowStep={setFlowStep} />;
      case 1:
        return <CreateAccount flowStep={flowStep} setFlowStep={setFlowStep} />;
      case 2:
        return <SignInOtp flowStep={flowStep} setFlowStep={setFlowStep} setMobileNumberBase={setMobileNumber}/>;
      case 3:
        return <EnterOtp flowStep={flowStep} setFlowStep={setFlowStep} mobileNumber={mobileNumber}/>;
      case 4:
        return <Proceed flowStep={flowStep} setFlowStep={setFlowStep} />;
      case 5:
        return <ChooseFlat flowStep={flowStep} setFlowStep={setFlowStep} />;
      case 6:
        return (
          <YourPreferences flowStep={flowStep} setFlowStep={setFlowStep} />
        );
      case 7:
        return (
          <SignInEmail flowStep={flowStep} setFlowStep={setFlowStep} />
        );
      default:
        return <FirstSection flowStep={flowStep} setFlowStep={setFlowStep} />;
    }
  }

  return <RootPaper>{getComponentSteps()}</RootPaper>;
}
