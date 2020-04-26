import React, {useState, useContext} from "react";

// Components
import {Checkbox, Grid, IconButton, FormControlLabel} from "@material-ui/core";
import EditToDoItem from "./Edit";

// import Draggable from "react-draggable";

// Context
import {ToDoListContext} from "../../../context/todolist-context";

// HOC
import withLogger from "../../../hoc/withLogger";

// Style
import {makeStyles} from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  rootControlLabel: props => ({
    width: "100%",
    textDecoration: props.isToDoItemDone ? "line-through" : "none",
    marginLeft: "0"
  }),
  overall: {
    padding: "0",
    display: "flex"
  },
  input: {
    flex: "1",
    margin: "0px"
  },
  fixed: {
    height: "fit-content"
  },
  textField: {
    width: "100%",
    padding: "0 10px"
  }
});

const ToDoItem = ({content, isDone, id}) => {
  const classes = useStyles({isToDoItemDone: isDone});
  //
  // const [activeDrags, setActiveDrags] = useState(0);
  // const [setDeltaPosition] = useState({
  //   x: 0,
  //   y: 0
  // });

  // const [controlledPosition, setControlledPosition] = useState({
  //   x: -400,
  //   y: 200
  // });

  // const onStart = () => {
  //   setActiveDrags(prev => ++prev);
  // };
  //
  // const onStop = () => {
  //   setActiveDrags(prev => --prev);
  // };
  //
  // const dragHandlers = {onStart: onStart, onStop: onStop};

  const toDoListContext = useContext(ToDoListContext);

  const [isEditMode, setIsEditMode] = useState(false);

  const editModeContent = (
    <EditToDoItem
      value={content}
      doneEditing={newValue => switchToNormalMode(newValue)}
    />
  );

  const switchToNormalMode = newValue => {
    setIsEditMode(false);
    if (newValue.length > 0) {
      toDoListContext.editItem(newValue, id);
    }
  };

  const toDoItemMode = (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={isDone}
            onChange={() => toDoListContext.toggleItem(id)}
          />
        }
        multiline="true"
        label={content}
        classes={{label: classes.rootControlLabel, root: classes.input}}
      />
      <IconButton onClick={() => setIsEditMode(true)} className={classes.fixed}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => toDoListContext.removeItem(id)}
        className={classes.fixed}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Grid item className={classes.overall}>
      {isEditMode ? editModeContent : toDoItemMode}
    </Grid>
  );
};

export default withLogger(ToDoItem);
