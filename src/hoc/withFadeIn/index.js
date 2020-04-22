import React, {Component} from "react";

// Style
import {Fade, Grid, FormControlLabel, Checkbox} from "@material-ui/core";

import ToDoItem from "../../components/ToDoItems/ToDoItem";

// NOT WORKING, DON'T KNOW WHY
export default function withFadeIn(MyComponent) {
  return function myFunnc(props) {
    return (
      <Fade in={true}>
        <MyComponent {...props} />
      </Fade>
    );
  };
}
