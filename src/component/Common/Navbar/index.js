import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/svg/logo.svg";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Fade from "@mui/material/Fade";
import { LOCATION } from "../../../constant";
import { useAlert } from "react-alert";
import { getRequest } from "../../../apis/baseApi";
import { useEffect, useState } from "react";
import PreferenceDialog from "../../Dialog/PreferenceDialog";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

const LogoIcon = <img src={logo} height="40px" alt="logo" />;

const pages = [
  { name: "LIST  WITH US", link: "/listing-option", icon: null },
  { name: "My Shortlists", link: "/my-shortlist", icon: null },
  { name: "My Matches", link: "/listing-option", icon: null },
];

const settings = [
  {
    name: "Profile",
    code: "profile",
  },
  {
    name: "Owner Dashboard",
    code: "dashboard",
  },
  {
    name: "Logout",
    code: "logout",
  },
];

export default function Navbar({
  showCity = false,
  isListing = false,
  setRefresh = () => {},
  isRefresh = false,
}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const alert = useAlert();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const [prefOpen, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileIconClick = (type) => {
    switch (type) {
      case "logout":
        localStorage.clear();
        history.push("/continue");
        break;
      case "profile":
        history.push("/edit-profile");
        break;
      case "dashboard":
        history.push("/owner-dashboard");
        break;
      case "LOGOUT":
        localStorage.clear();
        history.push("/continue");
        break;
    }
    setAnchorElUser(null);
  };

  useEffect(() => {
    getRequest("authentications/user_details/")
      .then((res) => {
        if (res?.data?.status) {
          localStorage.setItem(
            "user_preference",
            JSON.stringify(
              res?.data?.data?.preferences ? res?.data?.data?.preferences : {}
            )
          );
          localStorage.setItem("user_details", JSON.stringify(res?.data?.data));
        } else {
        }
      })
      .catch((err) => {
        alert.error("Error in fetching user details");
      });
  }, []);

  const getSelectedCity = () => {
    const propertyType = localStorage?.getItem("property_type");
    if (propertyType) {
      const prefData = localStorage.getItem(`${propertyType}_PREFERENCES`);
      if (prefData) {
        return JSON.parse(prefData)?.city;
      } else return "";
    } else {
      return "";
    }
  };

  const getType = () => {
    const propertyType = localStorage?.getItem("property_type");
    if (propertyType === "RENT") return "rent";
    else if (propertyType === "FLATMATES") {
      return "faltmates";
    } else if (propertyType === "RENT_SHARED") {
      return "pghostel";
    } else {
      return "rent";
    }
  };

  const setRefreshNew = () => {
    setSelectedCity(getSelectedCity());
    setRefresh(true);
  };

  const [selectedCity, setSelectedCity] = React.useState(getSelectedCity());

  useEffect(() => {
    setSelectedCity(getSelectedCity());
  }, [isRefresh]);

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#fff", boxShadow: "0px 0px 4px 0px #00000040" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div
            style={{ display: "flex", cursor: "pointer" }}
            onClick={() => {
              const propertyType = localStorage.getItem("property_type");
              if (propertyType) {
                if (propertyType === "RENT") history.push("/home/rental");
                else if (propertyType === "FLATMATES") {
                  history.push("/home/flatmates");
                } else if (propertyType === "RENT_SHARED") {
                  history.push("/home/pghostel");
                } else {
                  history.push("/");
                }
              } else {
                history.push("/");
              }
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
              {LogoIcon}
            </Box>
            <Typography
              variant="h6"
              noWrap
              color="primary"
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "none", md: "flex" },
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Flat and Flatmates
            </Typography>
          </div>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 2,
              cursor: "pointer",
            }}
            onClick={() => {
              const propertyType = localStorage.getItem("property_type");
              if (propertyType) {
                if (propertyType === "RENT") history.push("/home/rental");
                else if (propertyType === "FLATMATES") {
                  history.push("/home/flatmates");
                } else if (propertyType === "RENT_SHARED") {
                  history.push("/home/pghostel");
                } else {
                  history.push("/");
                }
              } else {
                history.push("/");
              }
            }}
          >
            {LogoIcon}
          </Box>

          <Typography
            noWrap
            color="primary"
            // component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "none", sm: "block", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Flat and Flatmates
          </Typography>
          {showCity && (
            <>
              <Button
                color="inherit"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={() => {
                  // handleClick()
                  setOpen(true);
                }}
                sx={{ textTransform: "inherit", color: "#787878" }}
                endIcon={<KeyboardArrowDownRoundedIcon />}
              >
                {selectedCity ? selectedCity : "Select City"}
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
                {LOCATION?.map((item) => {
                  return (
                    <MenuItem
                      key={item?.title}
                      onClick={() => {
                        setSelectedCity(item?.title);
                        handleClose();
                      }}
                    >
                      {item?.title}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          )}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {
              <>{
              pages.map((page) => (
                <MenuItem
                  key={page?.name}
                  onClick={() => {
                    if (page?.name === "My Matches") {
                      const propertyType =
                        localStorage.getItem("property_type");
                      if (propertyType) {
                        if (propertyType === "RENT")
                          history.push("/listing/rental");
                        else if (propertyType === "FLATMATES") {
                          history.push("/listing/flatmates");
                        } else if (propertyType === "RENT_SHARED") {
                          history.push("/listing/pghostel");
                        } else {
                          history.push("/listing/rental");
                        }
                      } else {
                        history.push("/");
                      }
                    } else {
                      history.push(page?.link);
                    }
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page?.name}</Typography>
                </MenuItem>
              ))
                }
                {localStorage.getItem('token') && 
              <MenuItem
                  key="logout"
                  onClick={() => {
                    localStorage.clear();
                    history.push("/continue");
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
}
</>
              }
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page?.name}
                onClick={() => {
                  if (page?.name === "My Matches") {
                    const propertyType = localStorage.getItem("property_type");
                    if (propertyType) {
                      if (propertyType === "RENT")
                        history.push("/listing/rental");
                      else if (propertyType === "FLATMATES") {
                        history.push("/listing/flatmates");
                      } else if (propertyType === "RENT_SHARED") {
                        history.push("/listing/pghostel");
                      } else {
                        history.push("/listing/rental");
                      }
                    } else {
                      history.push("/");
                    }
                  } else {
                    history.push(page?.link);
                  }
                  handleCloseNavMenu();
                }}
                sx={{
                  my: 2,
                  color: "#000",
                  display: "block",
                  textTransform: "inherit",
                  color: "#787878",
                }}
              >
                {page?.name}
              </Button>
            ))}
          </Box>
          
          {localStorage.getItem("token") ? 
          <Box sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}>
            <Tooltip title="Chat Room">
              <IconButton
                onClick={(event) => {
                    history.push("/chat-with-owner");
                }}
                sx={{ border: "1px solid #FFA321", p: 1, marginRight: "10px" }}
                color="primary"
              >
                <QuestionAnswerOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box> : null}

          <Box sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(event) => {
                  if (localStorage.getItem("token")) {
                    handleOpenUserMenu(event);
                  } else {
                    alert.error("Please login first");
                    history.push("/continue");
                  }
                }}
                sx={{ border: "1px solid #FFA321", p: 1 }}
                color="primary"
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting?.name}
                  onClick={() => {
                    handleProfileIconClick(setting?.code);
                  }}
                >
                  <Typography textAlign="center">{setting?.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <PreferenceDialog
          open={prefOpen}
          setOpen={setOpen}
          type={getType()}
          setRefresh={setRefreshNew}
          isListing={isListing}
        />
      </Container>
    </AppBar>
  );
}
