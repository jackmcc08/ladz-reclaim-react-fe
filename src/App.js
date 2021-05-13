// import { get } from 'jquery';
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { createStamp, currentNumStamps } from './ApiInterface.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numStamps: this.getCurrentStamps(),
      displayReward: false,
    }
  }

  getCurrentStamps() {
    // axios.get('https://reclaim-api.herokuapp.com/api/v1/stamps')
    // .then((response) => {
    //   // console.log(response.data)
    //   let stampCounter = 0;
    //   response.data.forEach(stamp => {
    //     if (stamp.user_id === "8" && !stamp.redeemed) {
    //       stampCounter += 1;
    //     }
    //   });
    //   this.setState({
    //     numStamps: stampCounter
    //   })
    // })
    currentNumStamps().then((numStamps)=> {
      this.setState({
        numStamps: numStamps
      })
    })
  }

  createStamp() {
    axios.post('https://reclaim-api.herokuapp.com/api/v1/stamps', {
      user_id: 8,
      business_id: 8,
      redeemed: false,
    })
    .then(() => {
      this.getCurrentStamps()
    })
  }

  patchRedeemedStamps() {
    axios.get('https://reclaim-api.herokuapp.com/api/v1/stamps')
    .then(function (response) {
      let unredeemedStamps = []
      response.data.forEach(stamp => {
        if (stamp.user_id === "8" && !stamp.redeemed) {
          unredeemedStamps.push(stamp)
        }
      })
      return unredeemedStamps;
    })
    .then(unredeemedStamps => {
      unredeemedStamps.forEach(stamp => {
        axios.patch(`https://reclaim-api.herokuapp.com/api/v1/stamps/${stamp.id}`, {
          redeemed: true,
        })
      });
    })
    .then(() => {
      this.setState({
        numStamps: 0,
        displayReward: false,
      })
    })
  }

  handleClick() {
    this.createStamp()
    // createStamp()
    // .then(() => {
    //   this.getCurrentStamps()
    // })
  }

  handleRewardClick() {
    this.setState({
      displayReward: true
    })
  }

  handleUseRewardClick() {
    this.patchRedeemedStamps()
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
