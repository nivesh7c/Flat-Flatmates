import { Autocomplete, IconButton } from "@mui/material";
import { getValue } from "@testing-library/user-event/dist/utils";
import Arrow from "../../assets/svg/arrow.svg";
import building from "../../assets/svg/Building.svg";
import sharingtype from "../../assets/svg/sharingtype.svg";
import { PROPERTY_TYPE, SHARING_TYPE } from "../../constant";
import { CommonInputFieldDiv } from "../Cards/Common/CommonInputFieldDiv";

const arrowIcon = <img src={Arrow} height="15px" width="15px" alt="icon" />;
const bulidingIcon = <img src={building} height="25px" alt="icon" />;
const sharingtypeIcon = (
    <img src={sharingtype} height="20px" style={{ marginRight: "10px" }} alt="icon" />
  );

export default function CustomPropertySharingType({propertyType, sharingType, setPropertyType= () => {}, setSharingType=() => {} }) {
  
  const getValue = (option, value) => {
    let data = option.find(item => item?.value === value);
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
          options={PROPERTY_TYPE}
          getOptionLabel={(option) => option?.title ? option?.title : ""}
          onChange={(e, item) => {
            if(item){
              setPropertyType(item.value);
            }
          }}
          ListboxProps={{
            sx: { fontSize: 14 },
          }}
          value={getValue(PROPERTY_TYPE, propertyType)}
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
          options={SHARING_TYPE}
          getOptionLabel={(option) => option?.title ? option?.title : ""}
          ListboxProps={{
            sx: { fontSize: 14 },
          }}
          value={getValue(SHARING_TYPE, sharingType)}
          onChange={(e, item) => {
            if(item){
              setSharingType(item.value);
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
              {sharingtypeIcon}
              <input type="text" {...params.inputProps} placeholder="Sharing Type" />
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
