import React, {useState} from "react";

// Components
import ToDoItem from "../../components/ToDoItem";
import TitleEditable from "../../components/TitleEditable";
import AddNew from "../../components/ToDoItem/AddNew";

// HOC or kind of
import ContainerForTheList from "../../hoc/ContainerForToDoList";

// Style
import {
  Grid,
  Paper,
  LinearProgress,
  FormControlLabel,
  Switch,
  Button,
  Menu,
  MenuItem
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

  const taskTouched = key => {
    //TODO: check this
    const dataSetNew = [...dataSet];
    const dataSetNewItem = {...dataSetNew[key]};
    const dataSetNewContent = {...dataSetNewItem.content};
    dataSetNewContent.isDone = !dataSetNewContent.isDone;

    dataSetNewItem.content = dataSetNewContent;
    dataSetNew[key] = dataSetNewItem;

    setDataSet(dataSetNew);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const showOptions = (event, index) => {
    setAnchorEl(event.currentTarget);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeCurrentItem = () => {
    const dataSetNew = [...dataSet];
    console.log(currentIndex);
    dataSetNew.splice(currentIndex, 1);
    setDataSet(dataSetNew);

    handleClose();
  };

  const editCurrentItem = () => {
    const dataSetNew = [...dataSet];
    const dataSetNewItem = {...dataSetNew[currentIndex]};
    const dataSetNewContent = {...dataSetNewItem.content};
    dataSetNewContent.autoFocus = true;
    dataSetNewItem.content = dataSetNewContent;
    dataSetNew[currentIndex] = dataSetNewItem;

    setDataSet(dataSetNew);
    handleClose();
  };

  const [checked, setChecked] = React.useState(false);

  const handleEnter = e => {
    e.preventDefault();
    setDataSet([
      ...dataSet,
      {
        content: {
          text: e.target.value,
          isDone: false,
          autoFocus: false
        }
      }
    ]);
    // IS THIS VALID????
    e.target.value = "";
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

  const taskChanged = (value, i) => {
    const dataSetNew = [...dataSet];
    const dataSetNewItem = {...dataSetNew[i]};
    const dataSetNewContent = {...dataSetNewItem.content};
    dataSetNewContent.text = value;

    dataSetNewItem.content = dataSetNewContent;
    dataSetNew[i] = dataSetNewItem;

    setDataSet(dataSetNew);
  };

  return (
    <ContainerForTheList>
      <TitleEditable
        title={todoTitle}
        placeholder="Add name to your list"
        editTitle={newTitle => setToDoTitle(newTitle)}
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
          {dataSet
            .filter((element, i) =>
              checked ? !element.content.isDone : element
            )
            .map((task, i) => (
              <ToDoItem
                id={i}
                content={task.content.text}
                isDone={task.content.isDone}
                touched={() => taskTouched(i)}
                buttonMoreClicked={e => showOptions(e, i)}
                contentChange={value => taskChanged(value, i)}
                autofocus={task.content.autoFocus}
              />
            ))}

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={removeCurrentItem}>Remove item</MenuItem>
            <MenuItem onClick={editCurrentItem}>Edit item</MenuItem>
          </Menu>
          <AddNew handleEnter={handleEnter} />
        </Grid>
      </Paper>
    </ContainerForTheList>
  );
}
