import { Autocomplete, IconButton } from "@mui/material";
import Arrow from "../../assets/svg/arrow.svg";
import gender from "../../assets/svg/Gender.svg";
import dot from "../../assets/svg/Planner.svg";
import { CommonInputFieldDiv } from "../Cards/Common/CommonInputFieldDiv";
import { AVAILABILITY, GENDER } from "../../constant";





const arrowIcon = <img src={Arrow} height="15px" width="15px" alt="icon" />;
const dotIcon = (
  <img src={dot} height="20px" style={{ marginRight: "10px" }} alt="icon" />
);
const genderIcon = (
    <img src={gender} height="20px" style={{ marginRight: "10px" }} alt="icon" />
  );



export default function CustomAvailabilityGender({availability, gender, setGender, setAvailability}) {

  const getValue = (data1, value) => {
    const data =  data1.find(item => 
     item?.value === value 
    )
    return data || {};
  }

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
            width: "49%",

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
          value={getAvailability()}
          onChange={(e, item) => {
            if(item){
              setAvailability(item.title);
            }
          }}
          ListboxProps={{
            sx: { fontSize: 14 },
          }}
          id="custom-input-demo"
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
        />

        <div
          style={{
            borderRight: "1px solid #D7D7D7",
            width: "1%",
            height: "30px",
          }}
        />

        <Autocomplete
          sx={{
            width: "49%",
            display: "inline-block",
            "& input": {
              fontSize: "14px",
              width: "100%",
              bgcolor: "background.paper",
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
          options={GENDER}
          getOptionLabel={(option) => option?.title ? option?.title : ""}
          
          value={getValue(GENDER, gender)}
          onChange={(e, item) => {
            if(item){
              setGender(item.value);
            }
          }}
          ListboxProps={{
            sx: { fontSize: 14 },
          }}
          id="custom-input-demo"
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
              {genderIcon}
              <input type="text" {...params.inputProps} placeholder="Gender" />
              <div {...params.inputProps}>
                <IconButton>{arrowIcon}</IconButton>{" "}
              </div>
            </div>
          )}
        />
      </CommonInputFieldDiv>
    </>
  );
}
