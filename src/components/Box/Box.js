import React, { Component } from "react";

import "./Box.css";

export class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
        test: '12'
    }
  }

  componentDidMount() {
      console.log(this.props);
  }

  render() {
    return <div className="box">{this.props.index} {this.props.who.name}</div>;
  }
}

export default Box;
