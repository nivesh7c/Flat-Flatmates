import { styled } from "@mui/material/styles";

export const CommonInputFieldDiv = styled("div")(
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

export const CommonInputFieldPaper = styled("div")(
  ({ theme }) => `
    border: 1px solid #DCDCDC;
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    border-radius: 5px;
    height: 55px;
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
      height: 55px;
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
