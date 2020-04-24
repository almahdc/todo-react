import React, {useState, useRef} from "react";

// Components
import ToDoItems from "../../components/ToDoItems";
import TitleEditable from "../../components/TitleEditable";
import AddNew from "../../components/ToDoItems/ToDoItem/AddNew";

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

  const [dataSet, setDataSet] = useState([]);
  const [todoTitle, setToDoTitle] = useState("");

  const toggleToDoItemState = key => {
    //TODO: check this
    const dataSetNew = [...dataSet];
    const index = dataSetNew.findIndex(element => element.content.key === key);
    const dataSetNewItem = {...dataSetNew[index]};
    const dataSetNewContent = {...dataSetNewItem.content};
    dataSetNewContent.isDone = !dataSetNewContent.isDone;
    dataSetNewItem.content = dataSetNewContent;
    dataSetNew[index] = dataSetNewItem;
    setDataSet(dataSetNew);
  };

  const editCurrentItem = (value, key) => {
    const dataSetNew = [...dataSet];
    const index = dataSetNew.findIndex(element => element.content.key === key);
    const dataSetNewItem = {...dataSet[index]};
    const dataSetNewContent = {...dataSetNewItem.content};
    dataSetNewContent.text = value;
    dataSetNewItem.content = dataSetNewContent;
    dataSetNew[index] = dataSetNewItem;
    setDataSet(dataSetNew);
  };

  const removeCurrentItem = key => {
    setDataSet(dataSet.filter((element, index) => element.content.key !== key));
  };

  const [checked, setChecked] = React.useState(false);

  const handleNewItem = trimmedValue => {
    setDataSet([
      ...dataSet,
      {
        content: {
          key: new Date().getTime(),
          text: trimmedValue,
          isDone: false,
          autoFocus: false
        }
      }
    ]);
  };

  const setProgressValue = () => {
    if (dataSet.length === 0) {
      return 0;
    }

    let counter = 0;
    dataSet.forEach((task, i) => {
      if (task.content.isDone) {
        counter++;
      }
    });
    return (counter * 100) / dataSet.length;
  };

  const addNewRef = useRef(null);

  const fromToDoListTitleToAddNew = () => {
    if (addNewRef.current) {
      addNewRef.current.focus();
    }
  };

  const filteredDataSetIfNeeded = function() {
    return !checked
      ? dataSet
      : dataSet.filter((element, index) => !element.content.isDone);
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
          <Button onClick={() => setDataSet([])}>Reset list</Button>
          {dataSet.length > 0 && (
            <ToDoItems
              dataSet={filteredDataSetIfNeeded()}
              removeCurrentItem={removeCurrentItem}
              editCurrentItem={editCurrentItem}
              toggleItem={toggleToDoItemState}
              showDoneItems={checked}
            />
          )}
          <AddNew handleNewItem={handleNewItem} ref={addNewRef} />
        </Grid>
      </Paper>
    </ContainerForTheList>
  );
}
