import React from "react";

// Style
import {Grid} from "@material-ui/core";

const ContainerForTheList = props => {
  return (
    <Grid container>
      <Grid item sm={2} lg={3} />
      <Grid item xs={11} sm={8} lg={6} style={{margin: "auto"}} container>
        {props.children}
      </Grid>
      <Grid item sm={2} lg={3} />
    </Grid>
  );
};

export default ContainerForTheList;
