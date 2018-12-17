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
        stepCount: 0,
        stripLocation: 0
      },
      rightPlayer: {
        name: gName.rightPlayer,
        stepCount: 0,
        stripLocation: 0
      },
      message: ""
    };

    this.buttonRef = React.createRef();
  }

  // 初始化設定玩家的位置
  setInitLocation = params => {
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
      return;
    }

    let ln_stripLocation = lo_currentPlayer.stripLocation + 1;
    let ln_stepCount = lo_currentPlayer.stepCount - 1;
    let ls_nextPlayer = currentPlayer;
    const h = {
      leftPlayer: () => {
        if (ln_stripLocation === lo_otherPlayer.stripLocation) {
          ln_stripLocation = lo_otherPlayer - 1;
          ln_stepCount = ln_stepCount + 1;
        }

        if (ln_stepCount === 0) {
          if (
            lo_otherPlayer.stripLocation === 9 &&
            lo_otherPlayer.stripLocation - ln_stripLocation === 1
          ) {
            console.log("輸了");
          } else {
            ls_nextPlayer = gName.rightPlayer;
            this.buttonRef.current.disabled = false;
          }
        }
      },
      rightPlayer: () => {
        if (ln_stripLocation > maxLength) {
          ln_stripLocation = maxLength;
          ln_stepCount = ln_stepCount + 1;
        }

        if (ln_stepCount === 0) {
          if (
            lo_otherPlayer.stripLocation === 0 &&
            ln_stripLocation - lo_otherPlayer.stripLocation === 1
          ) {
            console.log("輸了");
          } else {
            ls_nextPlayer = gName.leftPlayer;
            this.buttonRef.current.disabled = "";
          }
        }
      }
    };
    h[currentPlayer]();

    if (lo_currentPlayer.stepCount === ln_stepCount) return;

    this.playerHandler(
      currentPlayer,
      ls_nextPlayer,
      ln_stripLocation,
      ln_stepCount
    );
  };

  // 左邊按鈕
  btnLeft = () => {
    let { currentPlayer, leftPlayer, minLength } = this.state;
    let lo_currentPlayer = this.state[currentPlayer];
    let lo_otherPlayer = leftPlayer;

    if (lo_currentPlayer.stepCount === 0) {
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
          if (
            lo_otherPlayer.stripLocation === 9 &&
            lo_otherPlayer.stripLocation - ln_stripLocation === 1
          ) {
            console.log("輸了");
          } else {
            ls_nextPlayer = gName.rightPlayer;
            this.buttonRef.current.disabled = false;
          }
        }
      },
      rightPlayer: () => {
        if (ln_stripLocation === lo_otherPlayer.stripLocation) {
          ln_stripLocation = lo_otherPlayer.stripLocation + 1;
          ln_stepCount++;
        }

        if (ln_stepCount === 0) {
          if (
            lo_otherPlayer.stripLocation === 0 &&
            ln_stripLocation - lo_otherPlayer.stripLocation === 1
          ) {
            console.log("輸了");
          } else {
            ls_nextPlayer = gName.leftPlayer;
            this.buttonRef.current.disabled = "";
          }
        }
      }
    };
    h[currentPlayer]();

    if (lo_currentPlayer.stepCount === ln_stepCount) return;

    this.playerHandler(
      currentPlayer,
      ls_nextPlayer,
      ln_stripLocation,
      ln_stepCount
    );
  };

  // 玩家資料設定
  playerHandler = (currentPlayer, nextPlayer, stripLocation, stepCount) => {
    let h = {
      leftPlayer: () => {
        this.setState((state, props) => {
          return {
            leftPlayer: {
              ...state.leftPlayer,
              stripLocation: stripLocation,
              stepCount: stepCount
            },
            currentPlayer: nextPlayer
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
            currentPlayer: nextPlayer
          };
        });
      }
    };

    h[currentPlayer](stripLocation);
  };

  // 產生步數
  generateSetpCount = () => {
    this.buttonRef.current.disabled = true;

    let ranDom = Math.floor(Math.random() * 5) + 1;
    let lo_currentPlayer = this.state[this.state.currentPlayer];
    // lo_currentPlayer.stepCount = ranDom;
    lo_currentPlayer.stepCount = 8;

    this.setState({ [this.state.currentPlayer]: lo_currentPlayer });
  };

test = (stepCount, nextPlayer) => {
  let {currentPlayer} = this.state;
  
  let h = {
    leftPlayer: (stepCount) => {
      this.setState((state, props) => {
        return {
          leftPlayer: {
            ...state.leftPlayer,
            stepCount: stepCount
          },
          currentPlayer: nextPlayer
        }
      })
    }
  }

  h[currentPlayer](stepCount, nextPlayer);
}

  render() {
    // console.log(this.state);
    let {
      leftPlayer,
      rightPlayer,
      maxLength,
      minLength,
      currentPlayer
    } = this.state;
    return (
      <div className="App">
        <div className="title">
          <span>目前回合：{this.state.currentPlayer}</span>
          <button onClick={this.generateSetpCount} ref={this.buttonRef}>
            步數產生器
          </button>
        </div>
        <div className="">
          <Strip
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
            maxLength={maxLength}
            minLength={minLength}
            setInitLocation={this.setInitLocation}
            currentPlayer={currentPlayer}
            test={this.test}
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
