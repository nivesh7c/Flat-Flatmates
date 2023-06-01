import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, Typography } from "@mui/material";
import FlatmatePreference from "../Common/FlatmatePreference";
import RentPreference from "../Common/RentPreference";
import RentSharedPreference from "../Common/RentSharedPreference";



export default function YourPreferences({setFlowStep}) {
  
  function getPreference(){
    const preference = localStorage.getItem("property_type");
    switch(preference){
      case "RENT":
        return <RentPreference />
      case "RENT_SHARED":
        return <RentSharedPreference />
      case "FLATMATES":
        return <FlatmatePreference />
      default:
        return <RentPreference />
    }
  }

  function getPreferenceText(){
    const preference = localStorage.getItem("property_type");
    switch(preference){
      case "RENT":
        return "Add your Rent Property Preferences"
      case "RENT_SHARED":
        return "Add your PG/Hostel Preferences"
      case "FLATMATES":
        return "Add your Flatmates Preferences"
      default:
        return "Add your Rent Property Preferences"
    }
  }

  return (
    <>
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ width: "2%" }}>
          <IconButton color="primary">
            <ArrowBackIosIcon onClick={() => {
              setFlowStep(5);
            }}/>
          </IconButton>
        </div>
        <div style={{ textAlign: "center", width: "98%" }}>
          <Typography
            variant="body1"
            style={{ fontWeight: "600", color: "#4A4A4A" }}
          >
            {getPreferenceText()}
          </Typography>
        </div>
      </div>
      {getPreference()}
    </>
  );
}
