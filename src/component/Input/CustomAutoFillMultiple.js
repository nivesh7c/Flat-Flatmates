import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button, CircularProgress, IconButton, Chip, Grid
} from "@mui/material";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Arrow from "../../assets/svg/arrow.svg";
import Location from "../../assets/svg/Location.svg";
import { LOCATION } from "../../constant";
import { useAlert } from "react-alert";

const locationIcon = <img src={Location} height="25px" alt="icon" />;

const arrowIcon = <img src={Arrow} height="15px" width="15px" alt="icon" />;

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  height: 45px;
  padding-left:10px !important;
  padding: 1px;
  display: flex;
  align-items:center;
  flex-wrap: wrap;

  &:hover {
    border-color:#FFA321;
  }

  &.focused {
    border-color: #FFA321;
    //box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 45px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

const PrimeInputWrapper = styled("div")(
  ({ theme }) => `
  border: 1px solid #DCDCDC;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 5px;
  height: 45px;
  padding: 1px;
  display: flex;
  align-items:center;
  flex-wrap: wrap;

  &:hover {
    border-color:#FFA321;
  }

  &.focused {
    border-color: #FFA321;
    //box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 45px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const Listbox = styled("ul")(
  ({ theme }) => `
 // width: 300px;
  width:130px;  
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #FF9703;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export default function CustomAutoFillMultiple({
  city,
  area,
  setCity = () => {},
  setArea = () => {},
}) {
  const getCity = () => {
    if (city) {
      let data = LOCATION.find((item) => item?.title === city);
      return data || {};
    }
    return {};
  };

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: LOCATION[0],
    // multiple: true,
    limitTags: [3],
    options: LOCATION,
    getOptionLabel: (option) => option.title,
    onChange: (event, option) => {
      setCity(option?.title);
    //   setArea([]);
    },
    value: getCity(),
  });
  const alert = useAlert();
  const [defaultBounds, setDefaultBounds] = useState({});

  useEffect(() => {
    if (value) {
      setDefaultBounds({
        north: value.lat + 0.1,
        south: value.lat - 0.1,
        east: value.long + 0.1,
        west: value.long - 0.1,
      });
    }
  }, [value]);

  function handleSelect(address){
    let latLong = {};
    const data1 = LOCATION.find((item) => item?.title === city);
    if(!data1?.alias?.find(xy => address.toLowerCase()?.includes(xy.toLowerCase()))){
      const msg = `Please select area in ${city}`;
      alert.error(msg);
      return;
    }
    geocodeByAddress(address).then(results => getLatLng(results[0])).then(latLng =>{
      latLong =  latLng;
      let temp = [...area];
      if(temp?.length === 3){
        alert.error("Cannot add more than 3 areas!");
        return;
      }
      if(temp.find(item => item?.area === address)){
        alert.error("Already added!!");
        return;
      }
      temp.push({area: address, lat: latLong?.lat, long: latLong?.lng});
      setArea(temp);
      setSearchedValue("");
    }).catch(error => console.error('Error', error));
  }

  const [searchedValue, setSearchedValue] = useState("");

  const removeArea = (index) => {
    let temp = [...area];
    temp.splice(index, 1);
    setArea(temp);
    setSearchedValue("");
  }

  return (
    <>
      <div>
        <Root>
          <PrimeInputWrapper>
            <div {...getRootProps()} style={{ width: "40%" }}>
              <InputWrapper
                ref={setAnchorEl}
                className={focused ? "focused" : ""}
              >
                {locationIcon}
                <input {...getInputProps()} placeholder="City" />

                <div
                  {...getInputProps()}
                  style={{ borderRight: "1px solid #D7D7D7" }}
                >
                  <IconButton>{arrowIcon}</IconButton>
                </div>
              </InputWrapper>
            </div>
            <div
              style={{
                width: "60%",
              }}
            >
              <div>
                <PlacesAutocomplete
                  value={searchedValue}
                  onChange={(value) => {
                    setSearchedValue(value);
                  }}
                  onSelect={(value) => {
                    handleSelect(value);
                  }}
                  highlightFirstSuggestion={true}
                  searchOptions={{
                    componentRestrictions: { country: ["in"] },
                    strictBounds: false,
                    bounds: defaultBounds,
                  }}
                >
                  {({
                    getInputProps,
                    getSuggestionItemProps,
                    suggestions,
                    loading,
                  }) => (
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <input
                        {...getInputProps({
                          placeholder: "Select upto 3 Areas",
                        })}
                      />

                      <div
                        style={{
                          margin: "1px",
                          position: "absolute",
                          backgroundColor: "white",
                          top: "100%",
                          zIndex: "10",
                        }}
                      >
                        {loading && (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <CircularProgress />
                          </div>
                        )}
                        {suggestions.map((suggestion) => {
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <Button {...getSuggestionItemProps(suggestion)} >
                              <span style={{color: "#000"}}>{suggestion.description}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </div>
            </div>
          </PrimeInputWrapper>
          {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <li {...getOptionProps({ option, index })}>
                  <span>{option.title}</span>
                  <CheckIcon fontSize="small" />
                </li>
              ))}
            </Listbox>
          ) : null}
        </Root>
      </div>
      <Grid xs={12} md={12} style={{display: "flex", flexDirection: "row", marginTop: "5px"}}>
      {area && area?.length > 0 && 
        area?.map((item, index) => {
            return (
                // <ListItem key={item?.area}>
                <Grid md={4} xs={4} sm={4} style={{marginRight: "10px"}}>
                  <Chip
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{
                      maxWidth: "110px",
                      fontSize: "12px",
                    }}
                    label={item.area}
                    icon={<CloseIcon style={{cursor: "pointer"}} onClick={
                        (e) => {
                            e.stopPropagation();
                            removeArea(index);
                        }}

                    />}
                    onClick={() => {
                        setSearchedValue(item?.area);
                    }}
                    // {...getTagProps({ index })}
                  />
                </Grid>
              );
        })
      }
      </Grid>
    </>
  );
}
