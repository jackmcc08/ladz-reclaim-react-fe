import React from 'react';
import './App.css';
import { createStamp, getCurrentNumStamps, patchRedeemedStamps } from './StampsApiInterface.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numStamps: this.currentNumStamps(),
      displayReward: false,
    }
  }

  currentNumStamps() {
    getCurrentNumStamps().then((numStamps)=> {
      this.setState({
        numStamps: numStamps
      })
    })
  }

  redeemStamps() {
    patchRedeemedStamps()
    .then(() => {
      this.setState({
        numStamps: 0,
        displayReward: false,
      })
    })
  }

  handleClick() {
    createStamp()
    .then(() => {
      this.currentNumStamps()
    })
  }

  handleRewardClick() {
    this.setState({
      displayReward: true
    })
  }

  handleUseRewardClick() {
    this.redeemStamps()
  }

  render() {
    let rewards;
    if (this.state.displayReward) {
      rewards = <RewardScreen />
    }

    let button;
    if (this.state.displayReward) {
      button = <UseReward onClick={(event) => {
        event.preventDefault();
        this.handleUseRewardClick()
      }} />;
    } else if (this.state.numStamps >= 10) {
      button = <ClaimReward onClick={() => this.handleRewardClick()} />;
    } else {
      button = <AddStamp onClick={() => this.handleClick()}/>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>RECLAIM!</h1>
        </header>
        <main className="App-body">
          {button}
          {rewards}
          <StampCounter numStamps={this.state.numStamps}/>
        </main>
      </div>
    );
  }
}

function AddStamp(props) {
  return (
    <button className="addStampButton" onClick={props.onClick}>
      Add Stamp
    </button>
  )
}

function StampCounter(props) {
  return (
    <h3>Stamps: {props.numStamps}</h3>
  )
}

function ClaimReward(props) {
  return (
    <button className="claimReward" onClick={props.onClick}>
      Claim reward!
    </button>
  )
}

function UseReward(props) {
  return (
    <button
      className="useReward"
      onClick={props.onClick}
    >
      Use reward!
    </button>
  )
}

function RewardScreen(props) {
  return(
    <h1>
      Here's 10% off of some milk!
    </h1>
  )
}

export default App;
export { AddStamp, StampCounter, ClaimReward, UseReward, RewardScreen };
