import { createStyles, makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { Box, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

const useStyles = makeStyles((theme) =>
  createStyles({
    messageRow: {
      display: "flex",
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#EBEBEB",
      maxWidth: "350px",
      textAlign: "left",

      borderRadius: "10px",
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",

      marginBottom: "10px",
      padding: "10px",
      border: "1px solid #B8B8B8",
      maxWidth: "350px",
      textAlign: "left",
      color: "#000",
      borderRadius: "10px",
    },

    messageContent: {
      color: "#00000",
      padding: 0,
      margin: 0,
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: "300",
      marginTop: "10px",
      bottom: "-3px",
      right: "5px",
    },

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    displayName: {
      marginLeft: "20px",
    },
  })
);

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const messagedetails = props.messagedetails
    ? props.messagedetails
    : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <div>
          <div className={classes.messageBlue}>
            <div>
              <Typography
                variant="body2"
                className={classes.messageContent}
                style={{ fontWeight: "bold" }}
              >
                {message}
              </Typography>
              <Typography
                style={{ fontSize: "12px" }}
                className={classes.messageContent}
              >
                {messagedetails}
              </Typography>
            </div>
            <div className={classes.messageTimeStampRight}></div>
          </div>
          <div className={classes.displayName} style={{ marginBottom: "20px" }}>
            {" "}
            <Typography variant="overline" style={{ color: "#b0b7c3" }}>
              {" "}
              {timestamp}{" "}
            </Typography>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export const MessageRight = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : "";
  const messagedetails = props.messagedetails ? props.messagedetails : "";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div className={classes.messageRowRight}>
      <div>
        <div className={classes.messageOrange}>
          <div>
            <Typography
              variant="body2"
              style={{ color: "white" }}
              className={classes.messageContent}
            >
              {message}
            </Typography>
            <Typography
              style={{ fontSize: "12px" }}
              className={classes.messageContent}
            >
              {messagedetails}
            </Typography>
          </div>
        </div>
      </div>
      <div
        className={classes.displayName}
        style={{ marginBottom: "20px", marginRight: "10px" }}
      >
        <Typography variant="overline" style={{ color: "#b0b7c3" }}>
          {timestamp}
        </Typography>
      </div>
    </div>
  );
};

export const PdfMessageRight = (props) => {
  function pdfClick(e) {
    e.preventDefault();
    window.open(props.link, "_blank");
  }
  const classes = useStyles();
  const message = props.message ? props.message : "";
  const messagedetails = props.messagedetails ? props.messagedetails : "";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <div>
          {/* <img
            src={props.thumbnail}
            alt="pdf"
            style={{ width: "25%", height: "25%" }}
          /> */}

          <Box >
            <ArticleRoundedIcon />
            <GetAppIcon onClick={pdfClick} style={{cursor: "pointer"}}/>
            <Typography
              style={{ fontSize: "12px" }}
              className={classes.messageContent}
            >
              {message}
            </Typography>
            <Typography
              style={{ fontSize: "12px" }}
              className={classes.messageContent}
            >
              {messagedetails}
            </Typography>
          </Box>
        </div>
      </div>

      <div className={classes.displayName} style={{ marginBottom: "20px" }}>
        <Typography variant="overline" style={{ color: "#b0b7c3" }}>
          {timestamp}
        </Typography>
      </div>
    </div>
  );
};

export const PdfMessageLeft = (props) => {
  function pdfClick(e) {
    e.preventDefault();
    window.open(props.link, "_blank");
  }
  const message = props.message ? props.message : "";
  const messagedetails = props.messagedetails ? props.messagedetails : "";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <div>
          <div className={classes.messageBlue}>
            <div>
              {/* {props.show === false ? null : (
                <img
                  src={props.thumbnail}
                  alt="pdf"
                  style={{ width: "25%", height: "25%" }}
                />
              )} */}

              <Box>
              <ArticleRoundedIcon />
                <GetAppIcon onClick={pdfClick} />
                <Typography variant="body2" className={classes.messageContent}>
                  {message}
                </Typography>
                <Typography
                  style={{ fontSize: "12px" }}
                  className={classes.messageContent}
                >
                  {messagedetails}
                </Typography>
              </Box>
            </div>
            <div className={classes.messageTimeStampRight}></div>
          </div>
          <div className={classes.displayName} style={{ marginBottom: "20px" }}>
            {" "}
            <Typography variant="overline" style={{ color: "#b0b7c3" }}>
              {" "}
              {timestamp}{" "}
            </Typography>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export const ImageMessageLeft = (props) => {
  function pdfClick(e) {
    e.preventDefault();
    window.open(props.link, "_blank");
  }
  const message = props.message ? props.message : "";
  const messagedetails = props.messagedetails ? props.messagedetails : "";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <div>
          <div className={classes.messageBlue}>
            <div style={{ display: "flex" }}>
              <img
                src={props.thumbnail}
                alt="img"
                style={{ width: "100%", height: "100%", cursor: "pointer" }}
                onClick={pdfClick}
              />
              <Box>
                <Typography
                  style={{ fontSize: "12px" }}
                  className={classes.messageContent}
                >
                  {messagedetails}
                </Typography>
              </Box>
            </div>
            <div className={classes.messageTimeStampRight}></div>
          </div>
          <div className={classes.displayName} style={{ marginBottom: "20px" }}>
            {" "}
            <Typography variant="overline" style={{ color: "#b0b7c3" }}>
              {" "}
              {timestamp}{" "}
            </Typography>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export const ImageMessageRight = (props) => {
  function pdfClick(e) {
    e.preventDefault();
    window.open(props.link, "_blank");
  }
  
  const classes = useStyles();
  const message = props.message ? props.message : "";
  const messagedetails = props.messagedetails ? props.messagedetails : "";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        {/* <Grid container spacing={2} >
          <Grid item >
            </Grid>
            <Grid xs={12} >
              
            </Grid>
        </Grid> */}
        <div style={{ display: "flex" }}>
          <div >
            {" "}
            <img
              src={props.thumbnail}
              alt="img"
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
              onClick={pdfClick}
            />
          </div>
          <Box style={{ width: "80%" }}>
            <Box style={{ paddingLeft: "4px" }}>
              <Typography
                noWrap
                style={{
                  fontSize: "12px",
                  maxWidth: "260px",
                  color: "#787878",
                }}
                className={classes.messageContent}
              >
                {messagedetails}
              </Typography>
              {/* <Typography
                noWrap
                style={{
                  fontSize: "10px",
                  maxWidth: "260px",
                  color: "#787878",
                }}
                className={classes.messageContent}
              >
                23/6 Udyog Vihar, Phase 3, Gurgaon
              </Typography>
              <Typography
                noWrap
                style={{
                  fontSize: "10px",
                  maxWidth: "260px",
                  color: "#787878",
                }}
                className={classes.messageContent}
              >
                Monthly Rent- 10,000
              </Typography> */}
            </Box>
          </Box>
        </div>
      </div>

      <div className={classes.displayName} style={{ marginBottom: "20px" }}>
        <Typography variant="overline" style={{ color: "#b0b7c3" }}>
          {timestamp}
        </Typography>
      </div>
    </div>
  );
};
