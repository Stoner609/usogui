import React, { Component } from "react";

import "./Box.css";

export class Box extends Component {
  // constructor(props) {
  //   super(props);
  // }

  clickBox = () => {
    let locationIndex = this.props.index;
    this.props.clickBox(locationIndex);
  };

  render() {
    const { currentPlayer, who } = this.props;
    let shining = "";

    if (currentPlayer === "leftPlayer" && who.name === "leftPlayer") {
      shining = "radius_red_animation";
    } else if (currentPlayer === "rightPlayer" && who.name === "rightPlayer") {
      shining = "radius_green_animation";
    }

    let radiusStyle =
      who.name === "leftPlayer"
        ? ["radius", "radius_red", `${shining}`]
        : ["radius", "radius_green", `${shining}`];

    let radius =
      who.name == null ? null : <div className={radiusStyle.join(" ")} />;

    return (
      <div className="box" onClick={this.clickBox}>
        {radius}
      </div>
    );
  }
}

export default Box;
