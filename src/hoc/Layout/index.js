import React from "react";

// Components
import ToggleTheme from "../../components/ToggleTheme";

// Style
import {Grid, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
  },
  margin: {
    marginTop: "50px"
  }
}));

export default function Layout(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item>
        <Toolbar>
          <Typography variant="h6" className={classes.typographyStyles}>
            {props.appTitle}
          </Typography>
          <ToggleTheme
            toggle={props.onClickHandler}
            themeType={props.themeType}
          />
        </Toolbar>
      </Grid>
      <Grid item container className={classes.margin}>
        {props.children}
      </Grid>
    </Grid>
  );
}
