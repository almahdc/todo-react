import React from "react";

import {shallow} from "enzyme";

import ToDoItems from "./";
import ToDoItem from "./ToDoItem";

describe("<ToDoItems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ToDoItems />);
  });

  it("should render 0 <ToDoItem /> if dataSet null", () => {
    expect(wrapper.find(ToDoItem)).toHaveLength(0);
  });

  it("should render 0 <ToDoItem /> if dataSet is an empty array", () => {
    wrapper.setProps({dataSet: []});
    expect(wrapper.find(ToDoItem)).toHaveLength(0);
  });
});
