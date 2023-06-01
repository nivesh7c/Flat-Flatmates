import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import loo from "../../../../assets/company/social/linkedin.png";

const useStyles = makeStyles(theme => ({
  item: {
    borderRadius: "12px",
  },
}));

export default function ChatHistory() {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={loo} />
        </Grid>

        <Grid item>
          <Typography variant="h6" noWrap style={{ fontWeight: 600 }}>
            Microsoft Placement Group
          </Typography>
          <Button color="primary" style={{ padding: "0px" }}>
            {" "}
            Click here to view group info
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
