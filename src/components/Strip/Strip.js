import React, { Component } from "react";
import Aux from "../../hoc/_aux";
import Box from "../Box/Box";

import "./Strip.css";

export class Strip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minLength: 0,
      maxLength: 9
    };
  }

  componentDidMount() {
    this.setInitLocation();
  }

  setInitLocation = () => {
    let { leftPlayer, rightPlayer } = this.props;
    let { maxLength, minLength } = this.state;
    let initLocation = [
      ...[
        {
          name: leftPlayer.name,
          stripLocation: minLength
        }
      ],
      ...[
        {
          name: rightPlayer.name,
          stripLocation: maxLength
        }
      ]
    ];

    this.props.setInitLocation(initLocation);
  };

  render() {
    let { leftPlayer, rightPlayer, maxLength } = this.props;
    let le = Array(maxLength + 1)
      .fill()
      .map((_, i) => {
        let who = {};
        if (leftPlayer.stripLocation !== rightPlayer.stripLocation) {
          if (leftPlayer.stripLocation === i) {
            who = leftPlayer;
          }
          if (rightPlayer.stripLocation === i) {
            who = rightPlayer;
          }
        }

        return <Box key={i} index={i} who={who} />;
      });

    let _render =
      leftPlayer.stripLocation !== rightPlayer.stripLocation ? (
        <div className="game">
          <div>
            left player: {leftPlayer.stripLocation}，stepCount
            {leftPlayer.stepCount}
          </div>
          <div className="container">{le}</div>
          <div>
            right player: {rightPlayer.stripLocation}，stepCount
            {rightPlayer.stepCount}
          </div>
        </div>
      ) : null;

    return (
      <Aux>
        {_render}
        <div className="control">
          <button>L</button>
          <button onClick={this.btnRight}>R</button>
        </div>
      </Aux>
    );
  }
}

export default Strip;
