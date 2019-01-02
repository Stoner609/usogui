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
        stepCount: 0,
        playName: "斑目貘"
      },
      rightPlayer: {
        name: gName.rightPlayer,
        stepCount: 0,
        playName: "切間創一"
      },
      games: [
        {
          id: 0,
          isLoseMark: false,
          length: 9
        },
        {
          id: 1,
          isLoseMark: false,
          length: 4
        }
      ],
      currentGameId: 0
    };

    this.buttonRef = React.createRef();
    this.stripComponents = [];
  }

  componentDidMount() {
    this.state.games.forEach(x => {
      this.stripComponents.push(React.createRef());
    });

    // keydown 事件
    document.addEventListener("keydown", this.keyDownHandler);
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

    if (_stepCount === 0) {
      this.buttonRef.current.disabled = "";
    }
  };

  // 鍵盤事件
  keyDownHandler = event => {
    let { currentGameId } = this.state;
    const h = {
      32: () => {
        this.generateSetpCount();
      },
      39: () => {
        this.stripComponents[currentGameId].current.btnRight();
      },
      37: () => {
        this.stripComponents[currentGameId].current.btnLeft();
      },
      38: () => {
        this.setState({
          currentGameId: 0
        });
      },
      40: () => {
        this.setState({
          currentGameId: 1
        });
      }
    };

    if (typeof h[event.keyCode] === "function") {
      h[event.keyCode]();
    }
  };

  render() {
    let { leftPlayer, rightPlayer, currentPlayer, games } = this.state;

    let imgStyle = {
      marginTop: "20px",
      height: "150px"
    };

    let strip = games.map((data, idx) => {
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
          ref={this.stripComponents[idx]}
          currentGameId={this.state.currentGameId}
        />
      );
    });

    return (
      <div className="App">
        <div className="title">
          <div>
            <button
              className="randomButton"
              onClick={this.generateSetpCount}
              ref={this.buttonRef}
            >
              {this.state[currentPlayer].playName}的回合，點我產生步數
            </button>
          </div>
        </div>
        <div className="container">
          <div className="card">
            <img src="../img/ben.jpg" alt="" style={imgStyle} />
            <div>
              <span>
                {leftPlayer.playName}殘餘步數: {leftPlayer.stepCount}
              </span>
            </div>
          </div>
          <div>
            <Aux>{strip}</Aux>
          </div>
          <div className="card">
            <img src="../img/one.jpg" alt="" style={imgStyle} />
            <div>
              <span>
                {rightPlayer.playName}殘餘步數:{rightPlayer.stepCount}
              </span>
            </div>
          </div>
        </div>
        <div className="footer">空白鍵，上下左右 都可操作</div>
      </div>
    );
  }
}

export default App;
