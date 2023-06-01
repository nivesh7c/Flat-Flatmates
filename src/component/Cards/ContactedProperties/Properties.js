import FmdGoodIcon from "@mui/icons-material/Room";
import { Typography } from "@mui/material";
// import home from "../../../assets/png/user.jpg";
import home from "../../../assets/png/room.png";
import {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent
} from "./FullImageCard";
import { SHARING_TYPE_MAP } from "../../../constant";

const rupee = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="25" height="25" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_974_9184" transform="scale(0.02)" />
      </pattern>
      <image
        id="image0_974_9184"
        width="50"
        height="50"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADeUlEQVRoge2YT2gcdRTHv2+2adEGCVsKGnLIzJxCDkJCkUIDyTI1LEj/iPGiEvFQESl48CCl0C0tguDBuwhKFQ852GJL021mGURIMBvw4KY1bH8PdwX/XBbUIFmy+3pICtPRkP39dmaWwn5gD/ve7733+/Kb+c3v94A+ffr0eZIgkyDP806IyKW4J/MIIvp4aWnpjk7MAcNarwHwDGP3QyzLeks3yDIoRCLykkFcp5SLxWJdN0hbiOd5LwAY0Y3rFBG5YRKn/WhZlvVPu91+e59hWREZE5E8ER3dY8yHRPRL1Cgit3TnBBi+7J2Sz+cPbW1tvUNEVwEcjrjLrVbreBAE23HUysSRZC+q1WqLmVds214kojkAT4Xcw0TUYOaVOGoluiJhcrnci0S0GKn5WzabHV1YWGh2m99k1zKiVCoVReSbiPm5RqNxMo78RiuSy+UmLMv6QDdOREYBHIuYK0S0Hhn3qe/7d3Vym34QXxeROcPYKOMiMh6xXdRNYiSEiE6bxHWCiPxUKpU2dOO035GZmZnnATi6cRpcNwky+SA+TUQfmRQDMCwib0RsZSLyQ/+vmSRObfsFAM/zLorIlYj5Td/3v+g2d2rb7+zsbFZE3ouYm61WS+u4vhepCJmcnBzY3t7+CsCRiOvrIAh+j6OG6fbbMdPT089mMpnPAcxGXH9nMpnLcdVJREg+n3+m2WyOAzgD4ByAof8Zdr5YLHJcNbWFeJ5X2O+a22zue3S6EMcLHibxRyvCXwDe9X3/y7gTp7VrbRLRJ5ZljSUhAjBYkXa7XSSi9/Hfi9IWgG+JSABARP4E8AcR/bC5ufnd8vLyv91Pd2+6aQfdBjAYcX02NTV1rlAotLufmh5GN0SlVM1xnO8BvArgYMg1UavVRubn528GQSCxzLBDjK+6zFxzHGcVwCsABkKunojp6s7OzMq27dXd+3j4fUtdTNfNB2Z+4LpuGTsr0zMxsXRRlFIPHMdZA9CzlYmtHcTMVdu214ioJysTa19rV0yFiF6O5E5cTOwNOma+77puBUCqYhLpNCql7jmOcw87YsLHoMTEJNYyZeZ127bvE9FZpCAm0d4vM6+7rvszgMTFJCoEAJRSFcdxNpCwmMSFAAAzV2zbrhHRKTx+UI1NTCpCAICZf9wVMwhAhX5D9Xp9Qyn1a1pz6dOnT5/e8xD9vH+rRoG6tAAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

export default function Properties({data, propertyType}) {

  const getDetailString = () => {
    let retStr = "";
    if (propertyType === "pg_hostel")
      retStr += `${
        data?.sharing ? SHARING_TYPE_MAP[data?.sharing] : ""
      } Sharing PG/Hostel in ${data?.city}`;
    else {
      retStr += `${
        data?.bedrooms === 0 ? "1RK" : data?.bedrooms + "BHK"
      }  Apartment in ${data?.city}`;
    }
    return retStr;
  };

  return (
    <>
      <FiCard
        sx={{
          card: {
            maxWidth: 345,
          },
          border: "1px solid #D9D9D9",
          boxShadow: "none",
        }}
      >
        <FiCardActionArea>
          <FiCardContent
            sx={{
              color: "#ffffff",
              backgroundImage:
                  data?.image || (data?.images && data?.images.length > 0)
                    ? ""
                    : `url(${home})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "184px",
            }}
          >
            {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton sx={{ backgroundColor: "#fff", p: 0.2 }}>
                <CloseRoundedIcon />
              </IconButton>
            </div> */}
            {data?.images && data.images.length > 0 && (
                <img src={data?.images[0]} width="100%" height="184px" />
              )}
          </FiCardContent>
        </FiCardActionArea>
        <FiCardActions>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{ color: "#6B6B6B", fontWeight: "600" }}
              variant="body1"
            >
             {getDetailString()}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#ABA7A7",
                fontSize: "14px",
              }}
            >
              <FmdGoodIcon /> {data?.area}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              {" "}
              {rupee} {data?.expected_rent}/mo
            </Typography>
          </div>
        </FiCardActions>
      </FiCard>
    </>
  );
}
