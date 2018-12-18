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
      rightPosition: 9
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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
    return true;
  }

  componentDidMount() {}

  // 右邊按鈕
  btnRight = () => {
    // 當前玩家
    let { currentPlayer } = this.props;
    // 當前玩家資料
    let lo_currentPlayer = this.state[currentPlayer];
    // 左邊玩家位置、右邊玩家位置、最大值
    let { leftPlayer, rightPlayer, leftPosition, rightPosition, maxLength } = this.state;

    if (lo_currentPlayer.stepCount === 0) return;

    let ln_position = 0; // 位置
    let ln_stepCount = lo_currentPlayer.stepCount - 1; // 步數
    let ls_nextPlayer = currentPlayer; // 下一位玩家
    let lb_lose = false;
    const h = {
      leftPlayer: () => {
        ln_position = leftPosition + 1;
        if (ln_position === rightPosition) {
          ln_position = rightPosition - 1;
          ln_stepCount = ln_stepCount + 1;
        }

        if (ln_stepCount === 0) {
          if (rightPosition === 9 && rightPosition - ln_position === 1) {
            console.log("輸了");
            lb_lose = true;
          } else {
            ls_nextPlayer = rightPlayer.name;
          }
        }
      },
      rightPlayer: () => {
        ln_position = rightPosition + 1;
        if (ln_position > maxLength) {
          ln_position = maxLength;
          ln_stepCount = ln_stepCount + 1;
        }

        if (ln_stepCount === 0) {
          if (leftPosition === 0 && rightPosition - ln_position === 1) {
            console.log("輸了");
            lb_lose = true;
          } else {
            ls_nextPlayer = leftPlayer.name;
          }
        }
      }
    };
    h[currentPlayer]();

    if (lo_currentPlayer.stepCount === ln_stepCount) return;

    this.playerHandler(currentPlayer, ln_position, ln_stepCount, ls_nextPlayer, lb_lose);
  };

  // 左邊按鈕
  btnLeft = () => {
    // 當前玩家
    let { currentPlayer } = this.props;
    // 當前玩家資料
    let lo_currentPlayer = this.state[currentPlayer];
    // 左邊玩家位置、右邊玩家位置、最小值
    let { leftPlayer, rightPlayer, leftPosition, rightPosition, minLength } = this.state;

    if (lo_currentPlayer.stepCount === 0) return;

    let ln_position = 0;
    let ln_stepCount = lo_currentPlayer.stepCount - 1;
    let ls_nextPlayer = currentPlayer;
    let lb_lose = false;
    const h = {
      leftPlayer: () => {
        ln_position = leftPosition - 1;
        if (ln_position < minLength) {
          ln_position = minLength;
          ln_stepCount++;
        }

        if (ln_stepCount === 0) {
          if (rightPosition === 9 && rightPosition - ln_position === 1) {
            console.log("輸了");
            lb_lose = true;
          } else {
            ls_nextPlayer = rightPlayer.name;
          }
        }
      },
      rightPlayer: () => {
        ln_position = rightPosition - 1;

        if (ln_position === leftPosition) {
          ln_position = leftPosition + 1;
          ln_stepCount++;
        }

        if (ln_stepCount === 0) {
          if (leftPosition === 0 && ln_position - leftPosition === 1) {
            console.log("輸了");
            lb_lose = true;
          } else {
            ls_nextPlayer = leftPlayer.name;
          }
        }
      }
    };
    h[currentPlayer]();

    if (lo_currentPlayer.stepCount === ln_stepCount) return;

    this.playerHandler(currentPlayer, ln_position, ln_stepCount, ls_nextPlayer, lb_lose);
  };

  // 設定 玩家位置
  playerHandler = (currentPlayer, position, stepCount, nextPlayer, lose) => {
    const h = {
      leftPlayer: () => ({ leftPosition: position }),
      rightPlayer: () => ({ rightPosition: position })
    };
    let lo_data = h[currentPlayer]();

    this.setState((state, props) => {
      return lo_data;
    });

    this.props.playerHandler(stepCount, nextPlayer, lose);
  };

  render() {
    let {
      maxLength,
      leftPlayer,
      rightPlayer,
      leftPosition,
      rightPosition
    } = this.state;

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
          <button onClick={this.btnLeft}>L</button>
          <button onClick={this.btnRight}>R</button>
        </div>
      </Aux>
    );
  }
}

export default Strip;
