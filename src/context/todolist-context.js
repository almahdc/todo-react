import React, {useState} from "react";

export const ToDoListContext = React.createContext({});

const ToDoListContextProvider = props => {
  const [dataSet, setDataSet] = useState([]);

  const addItemHandle = trimmedValue => {
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

  const editItemHandler = (value, key) => {
    const dataSetNew = [...dataSet];
    const index = dataSetNew.findIndex(element => element.content.key === key);
    const dataSetNewItem = {...dataSet[index]};
    const dataSetNewContent = {...dataSetNewItem.content};
    dataSetNewContent.text = value;
    dataSetNewItem.content = dataSetNewContent;
    dataSetNew[index] = dataSetNewItem;
    setDataSet(dataSetNew);
  };

  const removeItemHandler = key => {
    setDataSet(dataSet.filter((element, index) => element.content.key !== key));
  };

  const toggleToDoItemStateHandler = key => {
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

  return (
    <ToDoListContext.Provider
      value={{
        dataSet: dataSet,
        removeItem: removeItemHandler,
        editItem: editItemHandler,
        addItem: addItemHandle,
        toggleItem: toggleToDoItemStateHandler,
        resetList: () => setDataSet([])
      }}
    >
      {props.children}
    </ToDoListContext.Provider>
  );
};

export default ToDoListContextProvider;
