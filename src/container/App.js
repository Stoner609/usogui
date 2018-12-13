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
  }

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

  stepCountHandler = (params, stepCount) => {
    let h = {
      leftPlayer: () => {
        this.setState((state, props) => {
          return {
            leftPlayer: {
              ...state.leftPlayer,
              stripLocation: stepCount
            }
          };
        });
      },
      rightPlayer: () => {
        this.setState((state, props) => {
          return {
            rightPlayer: {
              ...state.rightPlayer,
              stripLocation: stepCount
            }
          };
        });
      }
    };

    h[params](stepCount);
  };

  btnRight = () => {
    let {currentPlayer, rightPlayer, maxLength} = this.state;
    let lo_currentPlayer = this.state[currentPlayer];
    let ln_stepCount = lo_currentPlayer.stripLocation + 1;

    if (currentPlayer === gName.rightPlayer) {
      ln_stepCount = ln_stepCount > maxLength ? maxLength : ln_stepCount
    } else {
      ln_stepCount = ln_stepCount === rightPlayer.stripLocation ? ln_stepCount - 1 : ln_stepCount;
    }

    this.stepCountHandler(this.state.currentPlayer, ln_stepCount);
  };

  btnLeft = () => {
    let {currentPlayer, leftPlayer, minLength} = this.state;
    let lo_currentPlayer = this.state[currentPlayer];
    let ln_stepCount = lo_currentPlayer.stripLocation - 1;

    if (currentPlayer === gName.leftPlayer) {
      ln_stepCount = ln_stepCount < 0 ? 0 : ln_stepCount;
    } else {
      ln_stepCount = ln_stepCount === leftPlayer.stripLocation ? ln_stepCount + 1 : ln_stepCount;
    }

    this.stepCountHandler(this.state.currentPlayer, ln_stepCount);
  };

  render() {
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
