import { Box, Typography, Link, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

export default function FlatItems() {
  return (
    <>
      <Box
        sx={{
          borderBottom: "1px solid #ffff",
        }}
      >
        <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <Grid container spacing={2}>
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{
                          textDecoration: "none",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
        </div>
      </Box>
    </>
  );
}

const footers = [
  {
    description: [
      "Flats for Rent in Mumbai",
      "Flats for rent in Andheri West",
      "Flats for rent in Malad West",
      "Flats for rent in Andheri East",
      "Flats for rent in Powai",
      "Flats for rent in Thane West",
      "Flats for rent in Dombivli",
      "Flats for rent in Mira Road East",
      "Flats for rent in Kharghar",
      "Flats for rent in Navi Mumbai",
      "Flats for rent in Bandra West",
      "Properties in Mumbai with Heavy Deposit",
      "Flats for rent in Faridabad",
    ],
  },
  {
    description: [
      "Flats for Rent in Mumbai",
      "Flats for rent in Andheri West",
      "Flats for rent in Malad West",
      "Flats for rent in Andheri East",
      "Flats for rent in Powai",
      "Flats for rent in Thane West",
      "Flats for rent in Dombivli",
      "Flats for rent in Mira Road East",
      "Flats for rent in Kharghar",
      "Flats for rent in Navi Mumbai",
      "Flats for rent in Bandra West",
      "Properties in Mumbai with Heavy Deposit",
      "Flats for rent in Faridabad",
    ],
  },
  {
    description: [
      "Flats for Rent in Mumbai",
      "Flats for rent in Andheri West",
      "Flats for rent in Malad West",
      "Flats for rent in Andheri East",
      "Flats for rent in Powai",
      "Flats for rent in Thane West",
      "Flats for rent in Dombivli",
      "Flats for rent in Mira Road East",
      "Flats for rent in Kharghar",
      "Flats for rent in Navi Mumbai",
      "Flats for rent in Bandra West",
      "Properties in Mumbai with Heavy Deposit",
      "Flats for rent in Faridabad",
    ],
  },
  {
    description: [
      "Flats for Rent in Mumbai",
      "Flats for rent in Andheri West",
      "Flats for rent in Malad West",
      "Flats for rent in Andheri East",
      "Flats for rent in Powai",
      "Flats for rent in Thane West",
      "Flats for rent in Dombivli",
      "Flats for rent in Mira Road East",
      "Flats for rent in Kharghar",
      "Flats for rent in Navi Mumbai",
      "Flats for rent in Bandra West",
      "Properties in Mumbai with Heavy Deposit",
      "Flats for rent in Faridabad",
    ],
  },
];
