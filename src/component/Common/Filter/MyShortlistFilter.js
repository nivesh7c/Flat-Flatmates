import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

export default function MyShortlistsFilter({propertyType, shortlistType, setPropertyType, setShortlistType}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElProp, setAnchorElProp] = React.useState(null);
  const openProp = Boolean(anchorElProp);
  const handleClickProp = (event) => {
    setAnchorElProp(event.currentTarget);
  };
  const handleCloseProp = () => {
    setAnchorElProp(null);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "20px"
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            boxShadow: "none",
            listStyle: "none",
            p: 0.9,
            pl: 0,
            m: 0,
            backgroundColor: "transparent",
          }}
          component="ul"
        >
            <Button
        color="inherit"
        variant="outlined"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
        sx={{
          textTransform: "inherit",
          color: "#787878",
          borderColor: "#787878",
          borderRadius: "30px",
        }}
        endIcon={<KeyboardArrowDownRoundedIcon />}
      >
        {shortlistType}
      </Button>
      <Menu
        id="fade-menu"
        sx={{ height: "200px" }}
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {
            setShortlistType('Liked')
            handleClose();
        }}>Liked</MenuItem>
        <MenuItem onClick={() => {
            setShortlistType('Loved')
            handleClose();
        }}>Loved</MenuItem>
      </Menu>

      <div style={{marginLeft: "20px"}}>

      <Button
        color="inherit"
        variant="outlined"
        aria-controls={openProp ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openProp ? "true" : undefined}
        onClick={handleClickProp}
        size="small"
        sx={{
          textTransform: "inherit",
          color: "#787878",
          borderColor: "#787878",
          borderRadius: "30px",
        }}
        endIcon={<KeyboardArrowDownRoundedIcon />}
      >
        {propertyType}
      </Button>

      <Menu
        id="fade-menu"
        sx={{ height: "200px" }}
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorElProp}
        open={openProp}
        onClose={handleCloseProp}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {
            setPropertyType('Rental')
            handleCloseProp();
        }}>Rental</MenuItem>
        <MenuItem onClick={() => {
            setPropertyType('PG/Hostel')
            handleCloseProp();
        }}>Pg/Hostel</MenuItem>
        <MenuItem onClick={() => {
            setPropertyType('Flatmates')
            handleCloseProp();
        }}>Flatmates</MenuItem>
      </Menu>
      </div>
        </Paper>
        
      </div>
    </>
  );
}
