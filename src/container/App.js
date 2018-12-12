import React, { Component } from "react";
import { Strip } from "../components/Strip/Strip";
// import './App.css';

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

    this.setState({
      playerA: {
        stripLocation: ln_aLocation
      },
      playerB: {
        stripLocation: ln_bLocation
      }
    });
  };

  render() {
    let { playerA, playerB } = this.state;
    return (
      <div className="App">
        <div>噬謊者Game</div>
        <Strip
          leftPlay={playerA}
          rightPlay={playerB}
          setInitLocation={this.setInitLocation}
        />
      </div>
    );
  }
}

export default App;
