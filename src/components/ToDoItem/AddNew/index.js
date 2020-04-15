import React from "react";

// Style
import {Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(() => ({
  addNewTask: {
    padding: "20px"
  },
  newTaskWidth: {
    width: "90%"
  }
}));

export default function AddNew({handleEnter}) {
  const classes = useStyles();

  const addTask = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEnter(e);
    }
  };

  return (
    <Grid
      container
      spacing={1}
      alignItems="flex-end"
      className={classes.addNewTask}
    >
      <Grid item>
        <AddIcon />
      </Grid>
      <Grid item className={classes.newTaskWidth}>
        <TextField
          placeholder="Add new todo item"
          color="secondary"
          fullWidth
          onKeyDown={addTask}
        />
      </Grid>
    </Grid>
  );
}
