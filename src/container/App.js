import React, { Component } from "react";
import { Strip } from "../components/Strip/Strip";
import "./App.css";

const gName = {
  leftPlayer: "leftPlayer",
  rightPlayer: "rightPlayer"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLength: 9,
      minLength: 0,
      currentPlayer: gName.leftPlayer,
      leftPlayer: {
        name: gName.leftPlayer,
        stepCount: 8,
        stripLocation: 0
      },
      rightPlayer: {
        name: gName.rightPlayer,
        stepCount: 7,
        stripLocation: 0
      },
      message: ""
    };
  }

  // 初始化設定玩家的位置
  setInitLocation = params => {
    console.log(params);
    let ln_aLocation = 0;
    let ln_bLocation = 0;

    params.forEach(_data => {
      if (_data.name === gName.leftPlayer) {
        ln_aLocation = _data.stripLocation;
      } else {
        ln_bLocation = _data.stripLocation;
      }
    });

    this.setState((state, props) => {
      return {
        leftPlayer: { ...state.leftPlayer, stripLocation: ln_aLocation },
        rightPlayer: { ...state.rightPlayer, stripLocation: ln_bLocation }
      };
    });
  };

  // 右邊按鈕
  btnRight = () => {
    let { currentPlayer, rightPlayer, maxLength } = this.state;
    let lo_currentPlayer = this.state[currentPlayer];
    let lo_otherPlayer = rightPlayer;

    if (lo_currentPlayer.stepCount === 0) {
      // 判斷輸贏
      return;
    }

    let ln_stripLocation = lo_currentPlayer.stripLocation + 1;
    let ln_stepCount = lo_currentPlayer.stepCount - 1;
    let ls_nextPlayer = currentPlayer;
    const h = {
      leftPlayer: () => {
        console.log(ln_stripLocation, lo_otherPlayer)
        if (ln_stripLocation === lo_otherPlayer.stripLocation) {
          ln_stripLocation = lo_otherPlayer - 1;
          ln_stepCount = ln_stepCount + 1;
        }

        if (ln_stepCount === 0) {
          ls_nextPlayer = gName.rightPlayer;
        }
      },
      rightPlayer: () => {
        if (ln_stripLocation > maxLength) {
          ln_stripLocation = maxLength;
          ln_stepCount = ln_stepCount + 1;
        }

        if (ln_stepCount === 0) {
          ls_nextPlayer = gName.leftPlayer;
        }
      }
    };
    h[currentPlayer]();

    if (lo_currentPlayer.stepCount === ln_stepCount) return;

    this.playerHandler(
      currentPlayer,
      ln_stripLocation,
      ln_stepCount,
      ls_nextPlayer
    );
  };

  // 左邊按鈕
  btnLeft = () => {
    let { currentPlayer, leftPlayer, minLength } = this.state;
    let lo_currentPlayer = this.state[currentPlayer];
    let lo_otherPlayer = leftPlayer;

    if (lo_currentPlayer.stepCount === 0) {
      // 判斷輸贏
      return;
    }

    let ln_stripLocation = lo_currentPlayer.stripLocation - 1;
    let ln_stepCount = lo_currentPlayer.stepCount - 1;
    let ls_nextPlayer = currentPlayer;
    const h = {
      leftPlayer: () => {
        if (ln_stripLocation < minLength) {
          ln_stripLocation = minLength;
          ln_stepCount++;
        }

        if (ln_stepCount === 0) {
          ls_nextPlayer = gName.rightPlayer;
        }
      },
      rightPlayer: () => {
        if (ln_stripLocation === lo_otherPlayer.stripLocation) {
          ln_stripLocation = lo_otherPlayer.stripLocation + 1;
          ln_stepCount++;
        }

        if (ln_stepCount === 0) {
          ls_nextPlayer = gName.leftPlayer;
        }
      }
    };
    h[currentPlayer]();

    if (lo_currentPlayer.stepCount === ln_stepCount) return;

    this.playerHandler(
      currentPlayer,
      ln_stripLocation,
      ln_stepCount,
      ls_nextPlayer
    );
  };

  // 玩家資料設定
  playerHandler = (params, stripLocation, stepCount, newPlayer) => {
    let h = {
      leftPlayer: () => {
        this.setState((state, props) => {
          return {
            leftPlayer: {
              ...state.leftPlayer,
              ...{
                stripLocation: stripLocation,
                stepCount: stepCount
              }
            },

            currentPlayer: newPlayer
          };
        });
      },

      rightPlayer: () => {
        this.setState((state, props) => {
          return {
            rightPlayer: {
              ...state.rightPlayer,
              stripLocation: stripLocation,
              stepCount: stepCount
            },
            currentPlayer: newPlayer
          };
        });
      }
    };

    h[params](stripLocation);
  };

  render() {
    console.log(this.state);
    let { leftPlayer, rightPlayer, maxLength, minLength } = this.state;
    return (
      <div className="App">
        <div className="title">目前回合：{this.state.currentPlayer}</div>
        <div className="game">
          <Strip
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
            maxLength={maxLength}
            minLength={minLength}
            setInitLocation={this.setInitLocation}
          />
        </div>
        <div className="control">
          <button onClick={this.btnLeft}>left</button>
          <button onClick={this.btnRight}>right</button>
        </div>
      </div>
    );
  }
}

export default App;
