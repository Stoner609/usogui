import React, { Component } from "react";
import { Strip } from "../components/Strip/Strip";
import "./App.css";

const gName = {
  playerA: "playerA",
  playerB: "playerB"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerA: {
        name: gName.playerA,
        stepCount: 0,
        stripLocation: 0
      },
      playerB: {
        name: gName.playerB,
        stepCount: 0,
        stripLocation: 0
      },
      currentPlayer: "",
      message: ""
    };
  }

  setInitLocation = params => {
    let ln_aLocation = 0;
    let ln_bLocation = 0;

    params.forEach(_data => {
      if (_data.name === gName.playerA) {
        ln_aLocation = _data.stripLocation;
      } else {
        ln_bLocation = _data.stripLocation;
      }
    });

    this.setState((state, props) => {
      return {
        playerA: { ...state.playerA, stripLocation: ln_aLocation },
        playerB: { ...state.playerB, stripLocation: ln_bLocation }
      };
    });
  };

  btnRight = () => {
    console.log(`btnRight`);
    this.setState((state, props) => {
      console.log(state)
      return {
        playerA: { ...state.playerA, stripLocation: state.playerA.stripLocation + 1 },
      };
    });
  };

  btnLeft = () => {
    console.log(`btnLeft`);
  };

  render() {
    let { playerA, playerB } = this.state;
    return (
      <div className="App">
        <div className="title">Game</div>
        <div className="game">
          <Strip
            leftPlay={playerA}
            rightPlay={playerB}
            setInitLocation={this.setInitLocation}
          />
        </div>
        <div className="control">
          <button onClick={this.btnRight}>right</button>
          <button onClick={this.btnLeft}>left</button>
        </div>
      </div>
    );
  }
}

export default App;
