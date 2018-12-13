import React, { Component } from "react";
import Aux from "../../hoc/_aux";
import Box from "../Box/Box";

import "./Strip.css";

export class Strip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLength: 9,
      minLength: 0
    };
  }

  componentDidMount() {
    this.setInitLocation();
  }

  setInitLocation = () => {
    let { leftPlayer, rightPlayer, minLength, maxLength } = this.props;
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
    let { leftPlayer, rightPlayer, maxLength, minLength} = this.props;
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

        return (
          <Box key={i} index={i} who={who}></Box>
        );
      });

    let _render =
    leftPlayer.stripLocation !== rightPlayer.stripLocation ? (
        <Aux>
          <div>left player: {leftPlayer.stripLocation}</div>
          <div className="container">{le}</div>
          <div>right player: {rightPlayer.stripLocation}</div>
        </Aux>
      ) : null;

    return <Aux>{_render}</Aux>;
  }
}

export default Strip;
