import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numStamps: 0,
    }
  }

  handleClick() {
    const history = this.state.numStamps
    const current = history + 1
    this.setState({
      numStamps: current,
    })
  }

  handleRewardClick() {
    console.log("I have been clicked")
  }

  render() {

    let button;
      if (this.state.numStamps === 10) {
        button = <ClaimReward onClick={() => this.handleRewardClick} />;
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

export default App;
