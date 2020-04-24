import React from "react";

import {shallow} from "enzyme";

import ToDoList from "./";
import ToDoItems from "../../components/ToDoItems";

describe("<ToDoList />", () => {
  it("shouldn't have <ToDoItems /> if dataSet is empty", () => {
    const wrapper = shallow(<ToDoList />);
    expect(wrapper.exists(ToDoItems)).toEqual(false);
  });
});
