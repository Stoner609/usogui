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
    let { leftPlay, rightPlay } = this.props;
    let { minLength, maxLength } = this.state;
    let initLocation = [
      ...[
        {
          name: leftPlay.name,
          stripLocation: minLength
        }
      ],
      ...[
        {
          name: rightPlay.name,
          stripLocation: maxLength
        }
      ]
    ];

    this.props.setInitLocation(initLocation);
  };

  render() {
    let { leftPlay, rightPlay } = this.props;
    let le = Array(this.state.maxLength + 1)
      .fill()
      .map((_, i) => {
        let who = {};
        if (leftPlay.stripLocation !== rightPlay.stripLocation) {
          if (leftPlay.stripLocation === i) {
            who = leftPlay;
          }
          if (rightPlay.stripLocation === i) {
            who = rightPlay;
          }
        }

        return (
          <Box key={i} index={i} who={who}></Box>
        );
      });

    let _render =
      leftPlay.stripLocation !== rightPlay.stripLocation ? (
        <Aux>
          <div>left player: {leftPlay.stripLocation}</div>
          <div className="container">{le}</div>
          <div>right player: {rightPlay.stripLocation}</div>
        </Aux>
      ) : null;

    return <Aux>{_render}</Aux>;
  }
}

export default Strip;
