import React, {useRef, useEffect, useState} from "react";

// Components
import {Checkbox, Grid, IconButton, InputBase} from "@material-ui/core";

import Draggable from "react-draggable";

// HOC
import withLogger from "../../hoc/withLogger";

// Style
import {makeStyles} from "@material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
  label: {
    opacity: 0.8
  },
  input: {
    flex: "1"
  },
  fixed: {
    height: "fit-content"
  }
});

// TODO: make it editable; activate fadeIn hoc also
const ToDoItem = ({
  content,
  isDone,
  touched,
  buttonMoreClicked,
  contentChange,
  readOnly,
  autofocus,
  id
}) => {
  const classes = useStyles({isToDoItemDone: isDone});
  const [newRef] = useState({[id]: useRef()});
  const changeTask = e => {
    if (e.key === "Enter" && e.currentTarget.value.trim().length > 0) {
      e.preventDefault();
      contentChange(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (autofocus && newRef[id].current) {
      newRef[id].current.focus();
    }
  });

  const [activeDrags, setActiveDrags] = useState(0);
  // const [setDeltaPosition] = useState({
  //   x: 0,
  //   y: 0
  // });

  // const [controlledPosition, setControlledPosition] = useState({
  //   x: -400,
  //   y: 200
  // });

  const onStart = () => {
    setActiveDrags(prev => ++prev);
  };

  const onStop = () => {
    setActiveDrags(prev => --prev);
  };

  const dragHandlers = {onStart: onStart, onStop: onStop};

  return (
    <Draggable {...dragHandlers}>
      <Grid item className={classes.overall}>
        <Checkbox
          checked={isDone}
          onChange={touched}
          className={classes.fixed}
        />

        <InputBase
          className={classes.input}
          inputProps={{"aria-label": "naked"}}
          multiline
          value={content}
          onKeyDown={changeTask}
          inputRef={newRef[id]}
          autoFocus={autofocus}
        />
        <IconButton
          classes={{label: classes.label, root: classes.fixed}}
          onClick={buttonMoreClicked}
        >
          <MoreVertIcon />
        </IconButton>
      </Grid>
    </Draggable>
  );
};

export default withLogger(ToDoItem);
