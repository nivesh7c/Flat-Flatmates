import Arrow from "../../../assets/svg/arrow.svg";

import { Autocomplete, IconButton } from "@mui/material";

const arrowIcon = <img src={Arrow} height="15px" width="15px" alt="icon" />;

export function CommonAutoComplete({ icon, fieldlabel }) {
  return (
    <>
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
        options={top}
        getOptionLabel={(option) => option.title}
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
            <img src={icon} height="25px" alt="icon" />
            <input
              type="text"
              {...params.inputProps}
              placeholder={fieldlabel}
            />
            <div {...params.inputProps}>
              <IconButton>{arrowIcon}</IconButton>{" "}
            </div>
          </div>
        )}
      />
    </>
  );
}

export function CommonPrimeAutoComplete({ icon, fieldlabel }) {
  return (
    <>
      <Autocomplete
        sx={{
          width: "99%",
          display: "inline-block",
          "& input": {
            fontSize: "14px",
            width: "100%",
            bgcolor: "background.paper",
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        options={top}
        getOptionLabel={(option) => option.title}
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
            <img src={icon} height="25px" alt="icon" />
            <input
              type="text"
              {...params.inputProps}
              placeholder={fieldlabel}
            />
            <div {...params.inputProps}>
              <IconButton>{arrowIcon}</IconButton>{" "}
            </div>
          </div>
        )}
      />
    </>
  );
}

const top = [
  {
    title: "Demo",
  },
  { title: "The Godfather" },
  { title: "The Godfather: Part II" },
  { title: "The Dark Knight" },
];
