import React, {useRef, useEffect} from "react";

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

const AddNew = props => {
  const classes = useStyles();

  const addNewRef = useRef(null);

  const addTask = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.handleEnter(e);
    }
  };

  useEffect(() => {
    if (addNewRef.current) {
      addNewRef.current.focus();
    }
  });

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
          inputRef={addNewRef}
        />
      </Grid>
    </Grid>
  );
};

export default AddNew;
