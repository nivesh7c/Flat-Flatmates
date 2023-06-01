import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const closeIconGreen = {
  marginLeft: "10px",
  cursor: "pointer",
  color: "green",
};

const closeIconRed = {
  marginLeft: "10px",
  cursor: "pointer",
  color: "red",
};

const AlertTemplate = ({ style, options, message, close }) => {
  return (
    <div style={style}>
      <>
        <Alert
          icon={false}
          severity={options.type === "success" ? "success" : "error"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              sx={options.type === "success" ? closeIconGreen : closeIconRed}
              size="small"
              onClick={close}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </>
    </div>
  );
};
export default AlertTemplate;
