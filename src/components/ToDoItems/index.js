import React from "react";

// Components
import ToDoItem from "./ToDoItem";

const ToDoItems = ({dataSet}) => {
  return (
    <>
      {dataSet &&
        dataSet.map((task, index) => (
          <ToDoItem
            id={task.content.key}
            content={task.content.text}
            isDone={task.content.isDone}
            key={index}
          />
        ))}
    </>
  );
};

export default ToDoItems;
