import React, { Component } from "react";
import Aux from "../../hoc/Aux";

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

    let le = Array(this.state.maxLength).fill().map((_, i) => {
        return <div key={i}>{i}</div>
    } )

    let { leftPlay, rightPlay } = this.props;
    let _render =
      leftPlay.stripLocation !== rightPlay.stripLocation ? (
        <Aux>
          <div>left player: {leftPlay.stripLocation}</div>
          <div>right player: {rightPlay.stripLocation}</div>
          {le}
        </Aux>
      ) : null;

    return <Aux>{_render}</Aux>;
  }
}

export default Strip;
