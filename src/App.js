import React, {Component} from "react";

// Style
import themeLight from "./style/materialUiCustomization";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";

// Components
import Layout from "./hoc/Layout";
import ToDoList from "./containers/ToDoList";

// Utility
import {DARK_THEME, LIGHT_THEME} from "./utility/constants";

// TODO: restructure this code

class App extends Component {
  state = {
    themeType: this.setInitialTheme()
  };

  setInitialTheme() {
    return localStorage.getItem("themeType")
      ? localStorage.getItem("themeType")
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK_THEME
      : LIGHT_THEME;
  }

  onClickHandler = () => {
    localStorage.setItem("themeType", this.changeTheme(this.state.themeType));
    this.setState(() => ({
      themeType: this.changeTheme(this.state.themeType)
    }));
  };

  changeTheme(currentTheme) {
    return currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  }

  render() {
    return (
      <ThemeProvider theme={themeLight(this.state.themeType)}>
        <CssBaseline />
        <Layout
          appTitle="Divide IT into todo chunks"
          themeType={this.state.themeType}
          onClickHandler={this.onClickHandler}
        >
          <ToDoList />
        </Layout>
      </ThemeProvider>
    );
  }
}

export default App;
