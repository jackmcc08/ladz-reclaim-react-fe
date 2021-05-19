import React from 'react';
import './App.css';
import { createStamp, getCurrentNumStamps, patchRedeemedStamps } from './api/StampsApiInterface.js';
// import Login, { LoginButton, SignUpButton } from './Login.js';
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // Redirect,
} from 'react-router-dom';

const validationCodes = ['abcd', 'efgh', 'ijkl', 'mnop', 'qrst', 'uvwx', 'yz']

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

class StampValidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      stampIndex: this.props.index,
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  handleClick = () => {
    this.props.toggle(null);
  };

  onSubmitCode = (e) => {
    e.preventDefault();
    if (validationCodes.includes(this.state.inputValue)) {
      this.props.handleValidCode();
    }
  }

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <h3>Enter your stamp code here!</h3>
            <label>
              Stamp Code:
              <input type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            </label>
            <br />
            <input type="submit" onClick={this.onSubmitCode}/>
          </form>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numStamps: this.currentNumStamps(),
      stamps: this.getExistingStamps(),
      dataIsReturned: false,
      displayReward: false,
      stampCode: null,
    };
  }

  currentNumStamps() {
    getCurrentNumStamps(this.props.userID, this.props.businessID).then((numStamps)=> {
      this.setState({
        numStamps: numStamps
      })
    })
  }

  getExistingStamps() {
    let baseStamps = Array(10).fill('[]')
    getCurrentNumStamps(this.props.userID, this.props.businessID).then((numStamps)=> {
      var existingStamps = baseStamps.fill('[X]', 0, numStamps)
      this.setState({
        stamps: existingStamps,
        dataIsReturned: true,
      })
    })
  }

  redeemStamps() {
    patchRedeemedStamps(this.props.userID, this.props.businessID)
    .then(() => {
      this.setState({
        numStamps: 0,
        stamps: Array(10).fill('[]'),
        displayReward: false,
      })
    })
  }

  toggleCode = (i) => {
    this.setState({
      stampCode: i
    });
  };

  previousStampIsStamped(i) {
    const stamps = this.state.stamps.slice();
    if (this.state.numStamps >= 10) {return true}
    else if (stamps[i] === '[X]') {return true}
    else if (i !== 0 && stamps[i-1] !== '[X]') {
      return true}
  }

  updateStampCard() {
    const stamps = this.state.stamps.slice();
    this.currentNumStamps()
      stamps[this.state.stampCode] = '[X]'
      this.setState({
        stamps: stamps,
      });
  }

  handleClick(i) {
    if (this.previousStampIsStamped(i)) {
      return;
    }
    this.toggleCode(i)
  }

  handleStampCodeClick() {
    createStamp(this.props.userID, this.props.businessID)
    .then(() => {
      this.updateStampCard()
    })
    .then(() => {
      this.toggleCode(null)
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
    let businessName;
    if (this.props.businessID === 1) {
      businessName = 'That Milk Man Guy'
    } else if ((this.props.businessID === 2)) {
      businessName = 'Blush'
    } else if ((this.props.businessID === 3)) {
      businessName = 'SwollFoods'
    } else if ((this.props.businessID === 4)) {
      businessName = 'Craigs Coffee and other such innocent business activities'
    }

    let rewards;
    if (this.state.displayReward) {
      rewards = <RewardScreen businessID={this.props.businessID}/>
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
        <main className="App-body">
          <h3>{businessName}</h3>
          <div className="stamp-card">
            <StampCard
              stamps={this.state.stamps}
              dataIsReturned ={this.state.dataIsReturned}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          {this.state.stampCode !== null ?
          <StampValidate
            toggle={this.toggleCode}
            handleValidCode={() => this.handleStampCodeClick()} />
            : null}
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
  let reward;
  if (props.businessID == 1) {
    reward =  "Here's 10% off of some milk!"
  } else if (props.businessID === 2) {
    reward =  "Here's a 5% deluge of rouge for ya face!"
  } else if (props.businessID === 3) {
    reward =  "Here's a 15% discount of gains, brah!"
  } else if (props.businessID === 3) {
    reward =  "Have a free triple shot espresso"
  }
  return <h3>{reward}</h3>
}

export default App;
export { AddStamp, StampCounter, ClaimReward, UseReward, RewardScreen };
