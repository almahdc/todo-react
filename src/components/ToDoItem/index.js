import React from "react";

// Components
import {FormControlLabel, Checkbox, Grid} from "@material-ui/core";

// HOC
import withLogger from "../../hoc/withLogger";

// Style
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  rootControlLabel: props => ({
    width: "100%",
    textDecoration: props.isToDoItemDone ? "line-through" : "none"
  }),
  overall: {
    padding: "7px 15px"
  }
});

// TODO: make it editable; activate fadeIn hoc also
function ToDoItem({content, isDone, touched}) {
  const classes = useStyles({isToDoItemDone: isDone});
  return (
    <Grid item className={classes.overall}>
      <FormControlLabel
        value="end"
        control={<Checkbox checked={isDone} />}
        label={content}
        labelPlacement="end"
        onChange={touched}
        className={classes.rootControlLabel}
      />
    </Grid>
  );
}

export default withLogger(ToDoItem);
