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

  const [checked, setChecked] = React.useState(false);

  const handleEnter = e => {
    console.log("nddjdjd");
    e.preventDefault();
    setDataSet([
      ...dataSet,
      {
        content: {
          text: e.target.value,
          isDone: false
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
                key={i}
                content={task.content.text}
                isDone={task.content.isDone}
                touched={() => taskTouched(i)}
              />
            ))}
          <AddNew handleEnter={handleEnter} />
        </Grid>
      </Paper>
    </ContainerForTheList>
  );
}