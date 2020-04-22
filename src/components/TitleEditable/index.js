import React from "react";

// Components
import {InputBase} from "@material-ui/core";

// Style
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    margin: "20px 0px"
  },
  inputDisplay: {
    flex: "1"
  }
}));

function TitleEditable({placeholder, title, editTitle, onKeyDownEnter}) {
  const classes = useStyles();

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      onKeyDownEnter();
    }
  };

  return (
    <div className={classes.root}>
      <InputBase
        value={title}
        onChange={event => editTitle(event.target.value)}
        className={classes.inputDisplay}
        autoFocus={true}
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default TitleEditable;
