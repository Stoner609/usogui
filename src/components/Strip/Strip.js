import React, { Component } from "react";
import Aux from "../../hoc/_aux";
import Box from "../Box/Box";

import "./Strip.css";

export class Strip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minLength: 0,
      maxLength: 9,
      leftPlayer: props.leftPlayer,
      rightPlayer: props.rightPlayer,
      leftPosition: 0,
      rightPosition: 7
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps, prevState);
    const { leftPlayer, rightPlayer } = nextProps;

    if (leftPlayer.stepCount !== prevState.leftPlayer.stepCount) {
      return {
        leftPlayer: leftPlayer
      };
    }

    if (rightPlayer.stepCount !== prevState.rightPlayer.stepCount) {
      return {
        rightPlayer: rightPlayer
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    return true;
  }

  componentDidMount() {
    // this.setInitLocation();
  }

  setInitLocation = () => {
    // let { leftPlayer, rightPlayer } = this.props;
    // let { maxLength, minLength } = this.state;
    // let initLocation = [
    //   ...[
    //     {
    //       name: leftPlayer.name,
    //       stripLocation: minLength
    //     }
    //   ],
    //   ...[
    //     {
    //       name: rightPlayer.name,
    //       stripLocation: maxLength
    //     }
    //   ]
    // ];
    // this.props.setInitLocation(initLocation);
  };

  btnRight = () => {
    // 當前玩家
    let {currentPlayer} = this.props;
    // 右邊玩家、最大值
    let { rightPlayer, leftPosition, rightPosition, maxLength } = this.state;
    // 當前玩家 資料
    let lo_currentPlayer = this.state[currentPlayer];
    // 右邊玩家 資料
    let lo_rightPlayer = rightPlayer;
    // let lo_otherPlayer = rightPlayer;

    if (lo_currentPlayer.stepCount === 0) {
      return;
    }

    let ln_stripLocation = 0;
    let ln_stepCount = lo_currentPlayer.stepCount - 1;
    let ls_nextPlayer = currentPlayer;
    const h = {
      leftPlayer: () => {
        ln_stripLocation = leftPosition + 1;
        if (ln_stripLocation === rightPosition) {
          ln_stripLocation = rightPosition - 1;
          ln_stepCount = ln_stepCount + 1;
        }

        if (ln_stepCount === 0) {
          if (
            rightPosition === 9 &&
            rightPosition - ln_stripLocation === 1
          ) {
            console.log("輸了");
          } else {
            ls_nextPlayer = 'rightPlayer';
        //     this.buttonRef.current.disabled = false;
          }
        }
      },
      rightPlayer: () => {
        console.log(1)
        ln_stripLocation = rightPosition + 1;
        if (ln_stripLocation > maxLength) {
          ln_stripLocation = maxLength;
          ln_stepCount = ln_stepCount + 1;
        }

        if (ln_stepCount === 0) {
          if (
            leftPosition === 0 &&
            rightPosition - ln_stripLocation === 1
          ) {
            console.log("輸了");
          } else {
            ls_nextPlayer = 'leftPlayer';
        //     this.buttonRef.current.disabled = "";
          }
        }
      }
    };
    h[currentPlayer]();

    if (lo_currentPlayer.stepCount === ln_stepCount) return;

    console.log(ln_stripLocation, ln_stepCount, ls_nextPlayer);
    this.playerHandler(ln_stripLocation, ln_stepCount, ls_nextPlayer);
  }

  playerHandler = (stripLocation, stepCount, nextPlayer) => {
    this.setState((state, props) => {
      return {
        leftPosition: stripLocation
      }
    });

    this.props.test(stepCount, nextPlayer);
  }

  render() {
    console.log('render');
    let { maxLength, leftPlayer, rightPlayer, leftPosition, rightPosition } = this.state;

    let le = Array(maxLength + 1)
      .fill()
      .map((_, i) => {
        let who = {};
        if (leftPosition !== rightPosition) {
          if (leftPosition === i) {
            who = leftPlayer;
          }
          if (rightPosition === i) {
            who = rightPlayer;
          }
        }

        return <Box key={i} index={i} who={who} />;
      });

    let _render =
      leftPosition !== rightPosition ? (
        <div className="game">
          <div>
            left player: {leftPosition}，stepCount
            {leftPlayer.stepCount}
          </div>
          <div className="container">{le}</div>
          <div>
            right player: {rightPosition}，stepCount
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
