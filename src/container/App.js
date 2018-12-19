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
      message: "",
      games: [
        {
          id: 1,
          val: false,
          length: 9
        },
        {
          id: 2,
          val: false,
          length: 4
        }
      ]
    };

    this.buttonRef = React.createRef();
  }

  // 產生步數
  generateSetpCount = () => {
    this.buttonRef.current.disabled = "disabled";

    let ranDom = Math.floor(Math.random() * 5) + 1;
    let lo_currentPlayer = this.state[this.state.currentPlayer];
    lo_currentPlayer.stepCount = ranDom;
    // lo_currentPlayer.stepCount = 1;

    this.setState({ [this.state.currentPlayer]: lo_currentPlayer });
  };

  // 設定 玩家步數、下一位玩家
  playerHandler = (stepCount, nextPlayer, enemyLose, game) => {
    let { currentPlayer, games } = this.state;

    // let ls_message = enemyLose ? `${nextPlayer}輸了` : ""; //給我刪掉
    let ls_message = "";

    let _idx = games.findIndex(data => data.id !== game.id);
    let lo_games = [...[], ...games];
    lo_games[_idx].val = game.val;

    const h = {
      leftPlayer: () => ({
        leftPlayer: {
          ...this.state.leftPlayer,
          stepCount: stepCount
        },
        currentPlayer: nextPlayer,
        message: ls_message,
        games: lo_games
      }),
      rightPlayer: () => ({
        rightPlayer: {
          ...this.state.rightPlayer,
          stepCount: stepCount
        },
        currentPlayer: nextPlayer,
        message: ls_message,
        games: lo_games
      })
    };
    let lo_data = h[currentPlayer](stepCount, nextPlayer);

    this.setState((state, props) => {
      return lo_data;
    });

    this.buttonRef.current.disabled = "";
  };

  render() {
    let { leftPlayer, rightPlayer, currentPlayer, games } = this.state;

    let strip = games.map(data => {
      return (
        <Strip
          leftPlayer={leftPlayer}
          rightPlayer={rightPlayer}
          currentPlayer={currentPlayer}
          playerHandler={this.playerHandler}
          max={data.length}
          id={data.id}
          val={data.val}
          key={data.id}
        />
      );
    });

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
          {strip}
          {/* <Strip
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
            currentPlayer={currentPlayer}
            playerHandler={this.playerHandler}
            max={9}
          />
          <Strip
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
            currentPlayer={currentPlayer}
            playerHandler={this.playerHandler}
            max={4}
          /> */}
        </Aux>
      </div>
    );
  }
}

export default App;
