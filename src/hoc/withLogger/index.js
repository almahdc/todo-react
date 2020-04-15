import React, {Component} from "react";

export default function withLogger(MyComponent) {
  return class extends Component {
    componentDidMount() {
      console.log(`Component: ${MyComponent.name} is mounted`);
    }
    render() {
      return <MyComponent {...this.props} />;
    }
  };
}
