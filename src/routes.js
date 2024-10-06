import React from "react";
import { useSelector } from "react-redux";
import { Login } from "./pages/Login";
import { Search } from "./pages/Search";
import { ExportPDF } from "./pages/exportPDF";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const Routes = () => {

  const themeName = useSelector(state => state.general.themeName);

  const theme = {
    themeOne: {
      palette: {
        background: {
          bodyColor: '#FFFFFF',
          itemHeading: '#D5D5D5',
          headerColor: '#3F51B5',
          // color2: '#FFFFFF'
        },
        font: {
          // color1: '#212121',
          // bodyColor: '#9e9e9e',
          bodyColor: '##1D1D1D',
        },
      },
    },
    themeTwo: {
      // props: {
      //   MuiButton: {
      //     label: {
      //       color: "#FFF",
      //     },
      //   },
      // },
      palette: {
        background: {
          bodyColor: '#212121',
          itemHeading:'#52565c',
          blockColor: '#272C34',
          button: '#3C3C3C',
          buttonHover: '#2f2f2f',
          headerColor: '#212121',
          // color1: '#424242',
          // color2: '#D5D5D5'
        },
        font: {
          bodyColor: '#FFFFFF'
        },
      },
    },
    // props: {
    //   // Name of the component 
    //   MuiAccordion: {
    //     // The default props to change
    //    background: '#424242'
    //   }
    //   }
  };

  return (
    <ThemeProvider
      theme={(themeName === 'themeOne') ?
        createMuiTheme(theme.themeOne) :
        createMuiTheme(theme.themeTwo)}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/exportPDF/:uniqueId" exact component={ExportPDF} />
            <Route path="/signin" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default Routes;
