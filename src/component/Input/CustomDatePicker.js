import { Box, SvgIcon } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";
import dot from "../../assets/svg/Planner.svg";
import { CommonInputFieldDiv } from "../Cards/Common/CommonInputFieldDiv";

const dotIcon = (
  <img src={dot} height="25px" style={{ marginRight: "5px" }} alt="icon" />
);

function DateIcon(props) {
  return (
    <SvgIcon
      {...props}
      width="29"
      height="29"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.7829 10.8132C7.0758 10.5203 7.55067 10.5203 7.84356 10.8132L12.5808 15.5504C12.9856 15.9552 13.2577 16.2265 13.484 16.4186C13.7036 16.605 13.8303 16.6725 13.927 16.7039C14.178 16.7855 14.4484 16.7855 14.6995 16.7039C14.7962 16.6725 14.9229 16.605 15.1425 16.4186C15.3688 16.2265 15.6409 15.9552 16.0456 15.5504L20.7829 10.8132C21.0758 10.5203 21.5507 10.5203 21.8436 10.8132C22.1365 11.1061 22.1365 11.5809 21.8436 11.8738L17.1063 16.6111L17.0848 16.6326C16.7071 17.0103 16.3918 17.3256 16.1132 17.5621C15.8227 17.8088 15.523 18.0135 15.163 18.1305C14.6107 18.3099 14.0158 18.3099 13.4634 18.1305C13.1034 18.0135 12.8038 17.8088 12.5132 17.5621C12.2346 17.3256 11.9194 17.0103 11.5417 16.6326L11.5202 16.6111L6.7829 11.8738C6.49001 11.5809 6.49001 11.1061 6.7829 10.8132Z"
        fill="#666666"
      />
    </SvgIcon>
  );
}

export default function CustomDatePicker({value, setValue}) {

  return (
    <>
      <CommonInputFieldDiv>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          sx={{
            display: "inline-block",
            "& input": {
              fontSize: "14px",
              width: "100%",
              bgcolor: "background.paper",
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
        >
          <DatePicker
            value={value}
            components={{
              OpenPickerIcon: DateIcon,
            }}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  paddingLeft: "10px",
                  paddingRight: "20px",
                }}
              >
                {dotIcon}
                <input
                  ref={inputRef}
                  {...inputProps}
                  placeholder="Availibility"
                  style={{ fontSize: "14px" }}
                />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </LocalizationProvider>
      </CommonInputFieldDiv>
    </>
  );
}
