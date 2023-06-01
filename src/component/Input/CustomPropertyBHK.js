import { Autocomplete, IconButton } from "@mui/material";
import Arrow from "../../assets/svg/arrow.svg";
import building from "../../assets/svg/Building.svg";
import dot from "../../assets/svg/dot.svg";
import { BHK_DATA, PROPERTY_TYPE } from "../../constant";
import { CommonInputFieldDiv } from "../Cards/Common/CommonInputFieldDiv";

const arrowIcon = <img src={Arrow} height="15px" width="15px" alt="icon" />;
const bulidingIcon = <img src={building} height="25px" alt="icon" />;
const dotIcon = (
  <img src={dot} height="20px" style={{ marginRight: "10px" }} alt="icon" />
);

export default function CustomPropertyBHK({propertyType, bhk, setPropertyType, setBhk}) {

  const getValue = (data1, value) => {
    const data =  data1.find(item => 
     item?.title === value 
    )
    return data || {};
  }

  const getBhk = (data1, value) => {
    const data =  data1.find(item => 
     item?.value === value 
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
          options={ PROPERTY_TYPE}
          getOptionLabel={(option) => option?.title ? option?.title : ""}
          value={getValue(PROPERTY_TYPE, propertyType)}
          onChange={(e, item) => {
            if(item){
              setPropertyType(item?.title);
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
              {bulidingIcon}
              <input
                type="text"
                {...params.inputProps}
                placeholder="Property Type"
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
          options={BHK_DATA}
          getOptionLabel={(option) => option?.title ? option?.title : ""}
          value={getBhk(BHK_DATA, bhk)}
          ListboxProps={{
            sx: { fontSize: 14 },
          }}
          onChange={(e, item) => {
            if(item){
              setBhk(item?.value);
            }
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
              <input type="text" {...params.inputProps} placeholder="BHK" />
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
