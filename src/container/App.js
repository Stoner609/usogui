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
      currentPlayer: gName.rightPlayer,
      leftPlayer: {
        name: gName.leftPlayer,
        stepCount: 1,
        stripLocation: 0
      },
      rightPlayer: {
        name: gName.rightPlayer,
        stepCount: 0,
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

  // 玩家資料設定
  playerHandler = (params, stripLocation, stepCount) => {
    let h = {
      leftPlayer: () => {
        // ...
        this.setState((state, props) => {
          return {
            leftPlayer: {
              ...state.leftPlayer,
              ...{
                stripLocation: stripLocation,
                stepCount: stepCount
              }
            },
            // currentPlayer: currentPlayer
          };
        });
      },

      rightPlayer: () => {
        // ...
        this.setState((state, props) => {
          return {
            rightPlayer: {
              ...state.rightPlayer,
              stripLocation: stripLocation,
              stepCount: stepCount
            },
            // currentPlayer: currentPlayer
          };
        });
      }
    };

    h[params](stripLocation);
  };

  test = params => {
    // 當前玩家
    let lo_currentPlayer = this.state[params];
    // 下家玩家
    let lo_otherPlayer =
      params === gName.leftPlayer
        ? this.state[gName.rightPlayer]
        : this.state[gName.leftPlayer];
    console.log(lo_currentPlayer, lo_otherPlayer);

    // 沒有步數就不能玩了
    if (lo_currentPlayer.stepCount === 0) {
      return;
    }

    // 減掉步數
    let ln_stepCount = lo_currentPlayer.stepCount - 1;

    let h = {
      // 左邊玩家
      leftPlayer: () => {
        // 新的位置
        let ln_stripLocation =
          lo_currentPlayer.stripLocation + 1 >= lo_otherPlayer.stripLocation
            ? lo_currentPlayer.stripLocation
            : lo_currentPlayer.stripLocation + 1;

        // 改變
        this.setState((state, props) => {
          return {
            leftPlayer: {
              ...state.leftPlayer,
              ...{
                stripLocation: ln_stripLocation,
                stepCount: ln_stepCount
              }
            }
          };
        });
      },

      // 右邊玩家
      rightPlayer: () => {}
    };
    h[params]();
  };

  btnRight = () => {
    let { currentPlayer, rightPlayer, maxLength } = this.state;
    let lo_currentPlayer = this.state[currentPlayer];
    console.log()
    let ln_stripLocation = lo_currentPlayer.stripLocation + 1;

    // if (lo_currentPlayer.stepCount === 0) {
    //   return;
    // }

    // this.test(currentPlayer);

    if (currentPlayer === gName.rightPlayer) {
      ln_stripLocation =
        ln_stripLocation > maxLength ? maxLength : ln_stripLocation;
    } else {
      ln_stripLocation =
        ln_stripLocation === rightPlayer.stripLocation
          ? ln_stripLocation - 1
          : ln_stripLocation;
    }

    let ln_stepCount = lo_currentPlayer.stepCount - 1;

    // let ls = "";
    // if (ln_stepCount === 0) {
    //   ls =
    //     lo_currentPlayer.name === gName.leftPlayer
    //       ? gName.rightPlayer
    //       : gName.leftPlayer;
    // }

    this.playerHandler(
      currentPlayer,
      ln_stripLocation,
      ln_stepCount,
      // ls
    );
  };

  btnLeft = () => {
    let { currentPlayer, leftPlayer, minLength } = this.state;
    let lo_currentPlayer = this.state[currentPlayer];
    let ln_stripLocation = lo_currentPlayer.stripLocation - 1;

    // this.test(currentPlayer);

    // if (lo_currentPlayer.stepCount === 0) {
    //   return;
    // }

    if (currentPlayer === gName.leftPlayer) {
      ln_stripLocation =
        ln_stripLocation < minLength ? minLength : ln_stripLocation;
    } else {
      ln_stripLocation =
        ln_stripLocation === leftPlayer.stripLocation
          ? ln_stripLocation + 1
          : ln_stripLocation;
    }

    let ln_stepCount = lo_currentPlayer.stepCount - 1;

    // let ls = "";
    // if (ln_stepCount === 0) {
    //   ls =
    //     lo_currentPlayer.name === gName.leftPlayer
    //       ? gName.rightPlayer
    //       : gName.leftPlayer;
    // }

    this.playerHandler(
      this.state.currentPlayer,
      ln_stripLocation,
      ln_stepCount,
      // ls
    );
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
