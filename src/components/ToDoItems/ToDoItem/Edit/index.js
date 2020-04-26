import React, {useRef} from "react";

// Components
import {Grid, TextField, Button} from "@material-ui/core";

// Style
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  overall: {
    padding: "0",
    display: "flex"
  },
  input: {
    width: "100%",
    padding: "0 10px"
  },
  fixed: {
    height: "fit-content"
  },
  buttonBoth: {
    marginTop: "3px"
  },
  buttonFirst: {
    marginLeft: "10px"
  }
});

const EditToDoItem = ({value, setValue, doneEditing}) => {
  const classes = useStyles();
  const textFieldRef = useRef(null);

  const moveCaretAtEnd = e => {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  };

  const keyDownHandle = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      doneEditing(e.target.value);
    }
  };

  return (
    <Grid item container className={classes.overall}>
      <TextField
        variant="outlined"
        className={classes.input}
        multiline
        color="secondary"
        defaultValue={value}
        autoFocus
        onFocus={moveCaretAtEnd}
        inputRef={textFieldRef}
        onKeyDown={keyDownHandle}
      />
      <Button
        className={[classes.buttonFirst, classes.buttonBoth].join(" ")}
        onClick={doneEditing}
      >
        Cancel
      </Button>
      <Button
        className={classes.buttonBoth}
        onClick={() => doneEditing(textFieldRef.current.value)}
      >
        Save
      </Button>
    </Grid>
  );
};

export default EditToDoItem;
