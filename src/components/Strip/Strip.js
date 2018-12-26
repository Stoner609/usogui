import React, { Component } from "react";
import Aux from "../../hoc/_aux";
import Box from "../Box/Box";

import "./Strip.css";

export class Strip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minLength: 0,
      maxLength: this.props.max,
      leftPosition: 0,
      rightPosition: this.props.max,
      leftPlayer: props.leftPlayer,
      rightPlayer: props.rightPlayer
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
    if (
      nextState.leftPosition === this.state.leftPosition &&
      nextState.rightPosition === this.state.rightPosition
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.isLoseMark !== this.props.isLoseMark &&
      this.props.isLoseMark
    ) {
      let { currentPlayer } = this.props;
      switch (currentPlayer) {
        case "leftPlayer": {
          if (
            this.state.leftPosition === 0 &&
            this.state.rightPosition - this.state.leftPosition === 1
          ) {
            alert(currentPlayer + "你他媽輸了");
          }
          break;
        }
        case "rightPlayer": {
          if (
            this.state.rightPosition === this.state.maxLength &&
            this.state.rightPosition - this.state.leftPosition === 1
          ) {
            console.log(this.state.rightPosition, this.state.leftPosition);
            alert(currentPlayer + "你他媽輸了");
          }
          break;
        }
        default:
          break;
      }
    }
  }

  // 右邊按鈕
  btnRight = () => {
    let { currentPlayer, id } = this.props; // 當前玩家
    let lo_currentPlayer = this.state[currentPlayer]; // 當前玩家資料
    let {
      maxLength,
      leftPosition,
      rightPosition,
      leftPlayer,
      rightPlayer
    } = this.state; // 左邊玩家位置、右邊玩家位置、最大值

    if (lo_currentPlayer.stepCount === 0) return;

    let ln_position = 0; // 位置
    let ln_stepCount = lo_currentPlayer.stepCount - 1; // 步數
    let ls_nextPlayer = currentPlayer; // 下一位玩家
    let lb_isEnemyLoseMark = false; // 判斷對方輸贏

    const h = {
      leftPlayer: () => {
        ln_position = leftPosition + 1;
        if (ln_position === rightPosition) {
          ln_position = rightPosition - 1;
          ln_stepCount = ln_stepCount + 1;
        }

        if (ln_stepCount === 0) {
          ls_nextPlayer = rightPlayer.name;
          if (
            rightPosition === maxLength &&
            rightPosition - ln_position === 1
          ) {
            lb_isEnemyLoseMark = true;
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
          ls_nextPlayer = leftPlayer.name;
        }
      }
    };
    h[currentPlayer]();

    if (lo_currentPlayer.stepCount === ln_stepCount) return;

    let game = {
      id: id,
      isLoseMark: lb_isEnemyLoseMark
    };

    this.playerHandler(
      currentPlayer,
      ln_position,
      ln_stepCount,
      ls_nextPlayer,
      lb_isEnemyLoseMark,
      game
    );
  };

  // 左邊按鈕
  btnLeft = () => {
    let { currentPlayer, id } = this.props; // 當前玩家
    let lo_currentPlayer = this.state[currentPlayer]; // 當前玩家資料
    let {
      leftPlayer,
      rightPlayer,
      leftPosition,
      rightPosition,
      minLength
    } = this.state; // 左邊玩家位置、右邊玩家位置、最小值

    if (lo_currentPlayer.stepCount === 0) return;

    let ln_position = 0;
    let ln_stepCount = lo_currentPlayer.stepCount - 1;
    let ls_nextPlayer = currentPlayer;
    let lb_isEnemyLoseMark = false;

    const h = {
      leftPlayer: () => {
        ln_position = leftPosition - 1;
        if (ln_position < minLength) {
          ln_position = minLength;
          ln_stepCount++;
        }

        if (ln_stepCount === 0) {
          ls_nextPlayer = rightPlayer.name;
        }
      },
      rightPlayer: () => {
        ln_position = rightPosition - 1;

        if (ln_position === leftPosition) {
          ln_position = leftPosition + 1;
          ln_stepCount++;
        }

        if (ln_stepCount === 0) {
          ls_nextPlayer = leftPlayer.name;
          if (leftPosition === 0 && ln_position - leftPosition === 1) {
            lb_isEnemyLoseMark = true; // 對方輸了
          }
        }
      }
    };
    h[currentPlayer]();

    if (lo_currentPlayer.stepCount === ln_stepCount) return;

    let game = {
      id: id,
      isLoseMark: lb_isEnemyLoseMark
    };

    this.playerHandler(
      currentPlayer,
      ln_position,
      ln_stepCount,
      ls_nextPlayer,
      lb_isEnemyLoseMark,
      game
    );
  };

  // 設定 玩家位置
  playerHandler = (
    currentPlayer,
    position,
    stepCount,
    nextPlayer,
    lose,
    game
  ) => {
    const h = {
      leftPlayer: () => ({ leftPosition: position }),
      rightPlayer: () => ({ rightPosition: position })
    };
    let lo_data = h[currentPlayer]();

    this.setState((state, props) => {
      return lo_data;
    });

    this.props.playerHandler(stepCount, nextPlayer, lose, game);
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
          <div className="container">{le}</div>
        </div>
      ) : null;

    return (
      <Aux>
        {_render}
        <div className="control">
          <button onClick={this.btnLeft}>Left</button>
          <button onClick={this.btnRight}>Right</button>
        </div>
      </Aux>
    );
  }
}

export default Strip;
