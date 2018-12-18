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
    // lo_currentPlayer.stepCount = ranDom;
    lo_currentPlayer.stepCount = 8;

    this.setState({ [this.state.currentPlayer]: lo_currentPlayer });
  };

  // 設定 玩家步數、下一位玩家
  playerHandler = (stepCount, nextPlayer, lose) => {
    let { currentPlayer } = this.state;

    let a = lose ? '你輸了' : '';

    const h = {
      leftPlayer: () => ({
        leftPlayer: {
          ...this.state.leftPlayer,
          stepCount: stepCount
        },
        currentPlayer: nextPlayer,
        message: a
      }),
      rightPlayer: () => ({ 
        rightPlayer: {
          ...this.state.rightPlayer,
          stepCount: stepCount
        },
        currentPlayer: nextPlayer,
        message: a
      })
    };
    let lo_data = h[currentPlayer](stepCount, nextPlayer);

    this.setState((state, props) => {
      return lo_data
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
        </div>
        <div className="">
          <Strip
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
            currentPlayer={currentPlayer}
            playerHandler={this.playerHandler}
          />
        </div>
        
        {this.state.message}
      </div>
    );
  }
}

export default App;
