import { Autocomplete, IconButton } from "@mui/material";
import Arrow from "../../assets/svg/arrow.svg";
import gender from "../../assets/svg/Gender.svg";
import sharingtype from "../../assets/svg/sharingtype.svg";
import { GENDER, SHARING_TYPE } from "../../constant";
import { CommonInputFieldDiv } from "../Cards/Common/CommonInputFieldDiv";

const arrowIcon = <img src={Arrow} height="15px" width="15px" alt="icon" />;
const sharingtypeIcon = (
    <img src={sharingtype} height="20px" style={{ marginRight: "10px" }} alt="icon" />
  );

  const genderIcon = (
    <img src={gender} height="20px" style={{ marginRight: "10px" }} alt="icon" />
  );

export default function CustomSharingTypeGender({sharingType, gender, setGender, setSharingType}) {
  
  const getValue = (data1, value) => {
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
          options={SHARING_TYPE}
          getOptionLabel={(option) => option?.title ? option?.title : ""}
          value={getValue(SHARING_TYPE, sharingType)}
          ListboxProps={{
            sx: { fontSize: 14 },
          }}
          onChange={(e, item) => {
            if(item){
              setSharingType(item?.value);
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
              <input
                type="text"
                {...params.inputProps}
                placeholder="Sharing Type"
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
              setGender(item?.value);
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
