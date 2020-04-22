import React, {forwardRef} from "react";

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

const AddNew = (props, ref) => {
  const classes = useStyles();

  const addTask = e => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      props.handleNewItem(e.target.value.trim());
      e.target.value = "";
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
          inputRef={ref}
        />
      </Grid>
    </Grid>
  );
};

export default forwardRef(AddNew);
