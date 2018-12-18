import React, { Component } from "react";
import { Strip } from "../components/Strip/Strip";
import Aux from "../hoc/_aux";
import "./App.css";

const gName = {
  leftPlayer: "leftPlayer",
  rightPlayer: "rightPlayer"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: gName.leftPlayer,
      leftPlayer: {
        name: gName.leftPlayer,
        stepCount: 0
      },
      rightPlayer: {
        name: gName.rightPlayer,
        stepCount: 0
      },
      message: ""
    };

    this.buttonRef = React.createRef();
  }

  // 產生步數
  generateSetpCount = () => {
    this.buttonRef.current.disabled = "disabled";

    let ranDom = Math.floor(Math.random() * 5) + 1;
    let lo_currentPlayer = this.state[this.state.currentPlayer];
    lo_currentPlayer.stepCount = ranDom;
    // lo_currentPlayer.stepCount = 8;

    this.setState({ [this.state.currentPlayer]: lo_currentPlayer });
  };

  // 設定 玩家步數、下一位玩家
  playerHandler = (stepCount, nextPlayer, enemyLose) => {
    let { currentPlayer } = this.state;

    let ls_message = enemyLose ? `${nextPlayer}輸了` : "";

    const h = {
      leftPlayer: () => ({
        leftPlayer: {
          ...this.state.leftPlayer,
          stepCount: stepCount
        },
        currentPlayer: nextPlayer,
        message: ls_message
      }),
      rightPlayer: () => ({
        rightPlayer: {
          ...this.state.rightPlayer,
          stepCount: stepCount
        },
        currentPlayer: nextPlayer,
        message: ls_message
      })
    };
    let lo_data = h[currentPlayer](stepCount, nextPlayer);

    this.setState((state, props) => {
      return lo_data;
    });

    this.buttonRef.current.disabled = "";
  };

  render() {
    let { leftPlayer, rightPlayer, currentPlayer } = this.state;
    return (
      <div className="App">
        <div className="title">
          <span>目前回合：{this.state.currentPlayer}</span>
          <button onClick={this.generateSetpCount} ref={this.buttonRef}>
            步數產生器
          </button>
          <span>{this.state.message}</span>
        </div>
        <div className="step">
          <span>左邊步數: {this.state.leftPlayer.stepCount}</span>
          <span>右邊步數:{this.state.rightPlayer.stepCount}</span>
        </div>
        <Aux>
          <Strip
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
            currentPlayer={currentPlayer}
            playerHandler={this.playerHandler}
            max={9}
            min={0}
          />
          <Strip
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
            currentPlayer={currentPlayer}
            playerHandler={this.playerHandler}
            max={4}
            min={0}
          />
        </Aux>
      </div>
    );
  }
}

export default App;
