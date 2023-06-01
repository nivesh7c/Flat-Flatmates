import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";

const SelectedItem = {
  backgroundColor: "transparent",
  textDecoration: "none",
  color: "#FFA321",
  fontWeight: "400",
  display: "flex",
  flexDirection: "column",
  listStyle: "none",
  height: "50px",
  alignItems: "center",
  borderRadius: "4px",
  justifyContent: "center",
};

const subNavSelected = {
  backgroundColor: "#fff",
  textDecoration: "none",
  color: "#FFA321",
  fontWeight: "400",
  display: "flex",
  padding: "8px 0px 8px 16px",
  listStyle: "none",
  height: "50px",
  alignItems: "center",
};

const sidebarlink = {
  display: "flex",
  color: "#ABA7A7",
  textDecoration: "none",
  listStyle: "none",
  flexDirection: "column",
  height: "50px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "none",
    color: "red",
  },
};

const selecttextlink = {
  fontSize: "14px",
  fontWeight: "400",
};

const textlink = {
  fontSize: "14px",
};

export default function NavMenu({ items, key }) {
  const [subnav, setSubnav] = useState(false);

  const location = useLocation();
  const [item, setItem] = useState({});

  useEffect(() => {
    if (location.pathname.includes(items.path))
      setItem({
        ...items,
        selected: true,
      });
    else
      setItem({
        ...items,

        selected: false,
      });

    if (items.subNav && items.subNav.length) {
      items.subNav.forEach((i) => {
        if (i.path === location.pathname) i["selected"] = true;
        else i["selected"] = false;
      });
    }
  }, [items, location.pathname]);

  return (
    <>
      <Link
        style={
          item.selected
            ? SelectedItem
            : item.subNav &&
              item.subNav.length &&
              item.subNav.some((i) => i.path === location.pathname)
            ? subNavSelected
            : sidebarlink
        }
        to={() => {
          if (item.title === 'My Matches') {
          const propertyType = localStorage.getItem("property_type");
              if (propertyType) {
                if (propertyType === "RENT") return "/listing/rental";
                else if (propertyType === "FLATMATES") {
                  return "/listing/flatmates";
                } else if (propertyType === "RENT_SHARED") {
                  return "/listing/pghostel";
                  
                } else {
                  return "/listing/rental";
                }
              } else {
                return "/";
              }
        }
        else if(item.title === 'Home') {
          const propertyType = localStorage.getItem("property_type");
              if (propertyType) {
                if (propertyType === "RENT") return "/home/rental";
                else if (propertyType === "FLATMATES") {
                  return "/home/flatmates";
                } else if (propertyType === "RENT_SHARED") {
                  return "/home/pghostel";
                  
                } else {
                  return "/home/rental";
                }
              } else {
                return "/home/rental";
              }
        }
        else{
          return item?.path;
        }
      
      }}
      >
        <div style={{ display: "contents" }}>
          {item.icon}
          <Typography
            variant="body2"
            color="inherit"
            style={item.selected ? selecttextlink : textlink}
          >
            {item.title}  
          </Typography>
        </div>
      </Link>
    </>
  );
}
