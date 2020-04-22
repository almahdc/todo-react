import React, {useState, useEffect} from "react";

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

function App() {
  const [themeType, setThemeType] = useState(null);

  const setInitialTheme = () => {
    return localStorage.getItem("themeType")
      ? localStorage.getItem("themeType")
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK_THEME
      : LIGHT_THEME;
  };

  useEffect(() => {
    setThemeType(setInitialTheme());
  }, []);

  const onClickHandler = () => {
    localStorage.setItem("themeType", changeTheme(themeType));
    setThemeType(localStorage.getItem("themeType"));
  };

  const changeTheme = currentTheme => {
    return currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  };

  return (
    <ThemeProvider theme={themeLight(themeType)}>
      <CssBaseline />
      <Layout
        appTitle="Divide IT into todo chunks"
        themeType={themeType}
        onClickHandler={onClickHandler}
      >
        <ToDoList />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
