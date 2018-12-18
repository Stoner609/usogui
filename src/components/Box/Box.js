import React, { Component } from "react";

import "./Box.css";

export class Box extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    let radiusColor = this.props.who.name === 'leftPlayer' ? 'radius radius_red' : 'radius radius_green'
    let radius = this.props.who.name == null ? null : <div className={radiusColor} />;

    return <div className="box">{radius}</div>;
  }
}

export default Box;
