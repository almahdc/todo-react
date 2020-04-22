import React, {useState} from "react";

// Components
import {MenuItem, Menu} from "@material-ui/core";
import ToDoItem from "./ToDoItem";

const ToDoItems = ({
  dataSet,
  removeCurrentItem,
  editCurrentItem,
  toggleItem
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const showOptions = (event, index) => {
    setAnchorEl(event.currentTarget);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeItem = () => {
    removeCurrentItem(dataSet[currentIndex].content.key);
    handleClose();
  };

  const editItem = () => {
    editCurrentItem(dataSet[currentIndex].content.key);
    handleClose();
  };

  return (
    <>
      {dataSet.map((task, index) => (
        <ToDoItem
          id={index}
          content={task.content.text}
          isDone={task.content.isDone}
          touched={() => toggleItem(task.content.key)}
          buttonMoreClicked={e => showOptions(e, index)}
          contentChange={value => editCurrentItem(value, task.content.key)}
          autofocus={task.content.autoFocus}
          key={index}
        />
      ))}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={removeItem}>Remove</MenuItem>
        <MenuItem onClick={editItem}>Edit</MenuItem>
      </Menu>
    </>
  );
};

export default ToDoItems;
