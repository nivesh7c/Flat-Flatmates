import { Autocomplete, IconButton } from "@mui/material";
import Arrow from "../../assets/svg/arrow.svg";
import building from "../../assets/svg/Building.svg";
import dot from "../../assets/svg/Planner.svg";
import { AVAILABILITY } from "../../constant";
import { CommonInputFieldDiv } from "../Cards/Common/CommonInputFieldDiv";

const arrowIcon = <img src={Arrow} height="15px" width="15px" alt="icon" />;
const bulidingIcon = <img src={building} height="25px" alt="icon" />;
const dotIcon = (
    <img src={dot} height="20px" style={{ marginRight: "10px" }} alt="icon" />
  );

export default function CustomAvailability({availability, setAvailability = () => {}}) {
  
  const getAvailability = () => {
    const data =  AVAILABILITY.find(item => 
     item?.title === availability 
    )
    return data || {};
  }
  
  return (
    <>
      <CommonInputFieldDiv>
        <Autocomplete
          sx={{
            width: "100%",

            display: "inline-block",
            "& input": {
              fontSize: "14px",
              width: "100%",
              bgcolor: "background.paper",
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
          options={AVAILABILITY}
          getOptionLabel={(option) => option?.title ? option?.title : ""}
          ListboxProps={{
            sx: { fontSize: 14 },
          }}
          id="custom-input-demo"
          value={getAvailability()}
          renderInput={(params) => (
            <div
              ref={params.InputProps.ref}
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              {dotIcon}
              <input
                type="text"
                {...params.inputProps}
                placeholder="Availability"
              />
              <div {...params.inputProps}>
                <IconButton>{arrowIcon}</IconButton>{" "}
              </div>
            </div>
          )}
          onChange={(e, item) => {
            setAvailability(item);
          }}
        />

      </CommonInputFieldDiv>
    </>
  );
}
