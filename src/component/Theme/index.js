import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function MuiCustomTheme({ children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFA321",
      },
      secondary: {
        main: "#FFCF8B",
      },
    },
    typography: {
      fontFamily: "Noto Sans",
    },
    overrides: {
      MuiButton: {
        root: {
          position: "relative",
          textTransform: "none",
          transition: "all .15s ease",
          letterSpacing: ".025em",
          fontSize: "14px",
          padding: ".625rem 1.25rem",
          willChange: "transform",
          border: "1px solid transparent",
          lineHeight: "1.5",
          borderRadius: ".375rem",
          userSelect: "none",
          display: "inline-block",
          boxShadow: "none",
          fontWeight: "600",
          textAlign: "center",
          verticalAlign: "middle",
        },
        contained: {
          "&$disabled": {
            color: "#FFF",
          },
        },
        text: {
          color: "#EE7D66",
        },
      },
      MuiOutlinedInput: {
        // MuiInputLabel: {
        //   root: {
        //     transform: "translate(15px, 14px) scale(1)",
        //   },
        // },
        root: {
          backgroundColor: "#fff",
          height: 40,
        },
        notchedOutline: {},
        multiline: {
          height: "auto",
        },
      },
      MuiFormLabel: {
        root: {
          fontSize: "14px",
        },
      },
      MuiFormControlLabel: {
        fontSize: 14,
        label: {
          fontSize: 14,
        },
      },

      MuiFab: {
        root: {},
      },
      MuiTab: {
        wrapper: {},
        textColorInherit: {
          color: "#FFF",
        },
      },
      MuiAutocomplete: {
        paper: {
          // borderRadius: 10,
        },
        input: {
          padding: "3.5px 4px !important",
          fontSize: "14px",
        },
      },
      MuiMenu: {
        paper: {
          borderRadius: 10,
          fontSize: "14px",
        },
      },
      // MuiFormLabel: {
      //   root: {
      //     color: "rgba(0, 0, 0, 0.23)",
      //   },
      // },
      MuiSelect: {
        root: {
          fontSize: "14px",
          background: "transparent",
        },
        select: {
          backgroundColor: "transparent",

          "&:focus": {
            backgroundColor: "transparent",
            borderRadius: 30,
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
