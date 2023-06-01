import { positions, Provider as AlertProvider, transitions } from "react-alert";
import { BrowserRouter, Switch } from "react-router-dom";
import MuiCustomTheme from "./component/Theme";
import AlertTemplate from "./component/Theme/AlertTemplate";
import AppRoute from "./Route";

function App() {
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
    containerStyle: {
      zIndex: 10001,
      fontSize: "14px",
      textTransform: "lowercase",
    },
  };


  return (
    <>
    
      <div>
        <BrowserRouter>
          <Switch>
            <MuiCustomTheme>
              <AlertProvider template={AlertTemplate} {...options}>
                <AppRoute />
              </AlertProvider>
            </MuiCustomTheme>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
