import React, {useState, useRef, useContext} from "react";

// Components
import ToDoItems from "../../components/ToDoItems";
import TitleEditable from "../../components/TitleEditable";
import AddNew from "../../components/ToDoItems/ToDoItem/AddNew";

// Context
import {ToDoListContext} from "../../context/todolist-context";

// HOC or kind of
import ContainerForTheList from "../../hoc/ContainerForToDoList";

// Style
import {
  Grid,
  Paper,
  LinearProgress,
  FormControlLabel,
  Switch,
  Button
} from "@material-ui/core";
import {lighten, makeStyles, withStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  background: {
    width: "inherit"
  },
  root: {
    margin: "5px 0"
  },
  label: {
    fontSize: "11px"
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 7,
    backgroundColor: lighten("#b19bf7", 0.8),
    width: "inherit",
    borderRadius: 3,
    margin: "10px 0"
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "#b19bf7"
  }
})(LinearProgress);

export default function TodoList() {
  const classes = useStyles();

  const toDoListContext = useContext(ToDoListContext);

  const [todoTitle, setToDoTitle] = useState("");
  const [checked, setChecked] = useState(false);

  const setProgressValue = () => {
    if (toDoListContext.dataSet.length === 0) {
      return 0;
    }

    let counter = 0;
    toDoListContext.dataSet.forEach((task, i) => {
      if (task.content.isDone) {
        counter++;
      }
    });
    return (counter * 100) / toDoListContext.dataSet.length;
  };

  const addNewRef = useRef(null);

  const fromToDoListTitleToAddNew = () => {
    if (addNewRef.current) {
      addNewRef.current.focus();
    }
  };

  const filterdataSetIfNeeded = function() {
    return !checked
      ? toDoListContext.dataSet
      : toDoListContext.dataSet.filter(
          (element, index) => !element.content.isDone
        );
  };

  return (
    <ContainerForTheList>
      <TitleEditable
        title={todoTitle}
        placeholder="Add name to your list"
        editTitle={newTitle => setToDoTitle(newTitle)}
        onKeyDownEnter={fromToDoListTitleToAddNew}
      />
      {!checked && (
        <BorderLinearProgress
          className={classes.margin}
          variant="determinate"
          value={setProgressValue()}
        />
      )}
      <Paper className={classes.background} elevation={0} variant="outlined">
        <Grid item md container direction="column">
          <FormControlLabel
            value="start"
            control={
              <Switch
                color="secondary"
                size="small"
                checked={checked}
                onChange={() => setChecked(prev => !prev)}
              />
            }
            label="Hide done tasks"
            labelPlacement="start"
            classes={{root: classes.root, label: classes.label}}
          />
          <Button onClick={toDoListContext.resetList}>Reset list</Button>
          {toDoListContext.dataSet.length > 0 && (
            <ToDoItems
              dataSet={filterdataSetIfNeeded()}
              showDoneItems={checked}
            />
          )}
          <AddNew ref={addNewRef} />
        </Grid>
      </Paper>
    </ContainerForTheList>
  );
}
