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
      games: [
        {
          id: 1,
          isLoseMark: false,
          length: 9
        },
        {
          id: 2,
          isLoseMark: false,
          length: 4
        }
      ]
    };

    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    // keydown 事件
    document.addEventListener("keydown", this.handleOnKeyDown);
  }

  // 產生步數
  generateSetpCount = () => {
    this.buttonRef.current.disabled = "disabled";

    let ranDom = Math.floor(Math.random() * 5) + 1;
    let { ...lo_currentPlayer } = this.state[this.state.currentPlayer];
    lo_currentPlayer.stepCount = ranDom;

    this.setState({ [this.state.currentPlayer]: lo_currentPlayer });
  };

  // 設定 State 的資料
  setData = (currentPlayer, stepCount, nextPlayer, lo_games) => {
    return {
      [currentPlayer]: {
        ...this.state[currentPlayer],
        stepCount: stepCount
      },
      currentPlayer: nextPlayer,
      games: lo_games
    };
  };

  // [狀態更新] 玩家步數、下一位玩家
  playerHandler = (_stepCount, _nextPlayer, _game) => {
    let { currentPlayer, games } = this.state;

    let ln_gameIdx = games.findIndex(data => data.id !== _game.id);
    let la_games = [...[], ...games];
    la_games[ln_gameIdx].isLoseMark = _game.isLoseMark;

    const lo_newData = this.setData(
      currentPlayer,
      _stepCount,
      _nextPlayer,
      la_games
    );

    this.setState((state, props) => {
      return lo_newData;
    });

    this.buttonRef.current.disabled = "";
  };

  // todo ...
  handleOnKeyDown = event => {
    console.log(event);
  };

  render() {
    let { leftPlayer, rightPlayer, currentPlayer, games } = this.state;

    let strip = games.map(data => {
      return (
        <Strip
          currentPlayer={currentPlayer}
          leftPlayer={leftPlayer}
          rightPlayer={rightPlayer}
          playerHandler={this.playerHandler}
          max={data.length}
          id={data.id}
          isLoseMark={data.isLoseMark}
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
        </div>
        <div className="step">
          <span>左邊步數: {this.state.leftPlayer.stepCount}</span>
          <span>右邊步數:{this.state.rightPlayer.stepCount}</span>
        </div>
        <Aux>{strip}</Aux>
      </div>
    );
  }
}

export default App;
