import React from 'react';
import './App.css';
import { createStamp, getCurrentNumStamps, patchRedeemedStamps } from './api/StampsApiInterface.js'

function Stamp(props) {
  return (
    <button className="stamp" onClick={props.onClick}>
      {props.value}
    </button>  
  )
}

class StampCard extends React.Component {
  renderStamp(i) {
    return(
      <Stamp 
        value={this.props.stamps[i]}
        onClick ={() => this.props.onClick(i)}>         
      </Stamp>
    );
  }

  render() {
    if (this.props.dataIsReturned) {
    return (
      <div>
        <div className="card-row">
          {this.renderStamp(0)}
          {this.renderStamp(1)}
          {this.renderStamp(2)}
          {this.renderStamp(3)}
          {this.renderStamp(4)}          
        </div>
        <div className="card-row">
          {this.renderStamp(5)}
          {this.renderStamp(6)}
          {this.renderStamp(7)}
          {this.renderStamp(8)}
          {this.renderStamp(9)}          
        </div>
      </div>
    ); } else {
      return (
        <h1>Loading</h1>
      )
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      numStamps: this.currentNumStamps(),
      stamps: this.getExistingStamps(),
      displayReward: false,
      dataIsReturned: false,
    };
  }

  currentNumStamps() {
    getCurrentNumStamps().then((numStamps)=> {
      this.setState({
        numStamps: numStamps
      })
    })
  }
  
  getExistingStamps() {
    let baseStamps = Array(10).fill('[]')
    getCurrentNumStamps().then((numStamps)=> {
      var existingStamps = baseStamps.fill('[X]', 0, numStamps)
      this.setState({
        stamps: existingStamps,
        dataIsReturned: true,
      })
    })
  }

  redeemStamps() {
    patchRedeemedStamps()
    .then(() => {
      this.setState({
        numStamps: 0,
        stamps: Array(10).fill('[]'),
        displayReward: false,
      })
    })
  }

  previousStampIsStamped(i) {
    const stamps = this.state.stamps.slice();
    if (this.state.numStamps >= 10) {return true}
    else if (stamps[i] === '[X]') {return true}
    else if (i !== 0 && stamps[i-1] !== '[X]') { 
      return true}
  }

  handleClick(i) {
    const stamps = this.state.stamps.slice();
    if (this.previousStampIsStamped(i)) {
      return;
    }
    createStamp()
    .then(() => {
      this.currentNumStamps()
      stamps[i] = '[X]'
      this.setState({
        stamps: stamps,
      });
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
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>RECLAIM!</h1>
        </header>
        <main className="App-body">
          <div className="stamp-card">
            <StampCard
              stamps={this.state.stamps}
              dataIsReturned ={this.state.dataIsReturned}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
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
