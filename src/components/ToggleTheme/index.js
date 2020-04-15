import React from "react";

// Utility
import {DARK_THEME} from "../../utility/constants";

// Style
import {IconButton} from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";

function ToggleTheme({themeType, toggle}) {
  return (
    <>
      <IconButton onClick={toggle}>
        {themeType === DARK_THEME ? <WbSunnyIcon /> : <Brightness3Icon />}
      </IconButton>
    </>
  );
}

export default ToggleTheme;
