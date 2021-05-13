import React, { useState } from 'react';
import './App.css';

const Stamp = ({ passStampStatus }) => {
  const [isStamped, setIsStamped] = useState(false)

  const onStampButtonClicked = () => {
    setIsStamped(true);
    passStampStatus();
  }

  return (
    <div className="stamp">
      {isStamped ? (
        <button className="filled-stamp">Stamped</button>
      ) : (
        <button className="empty-stamp" onClick={() => onStampButtonClicked()}>Unstamped</button>
      )}
    </div>
  )
}

const StampCard = () => {

  const [rewardActive, setRewardActive] = useState(false)

  let stampCount = 0;

  const onStampSubmitted = () => {
    stampCount += 1;
    if(stampCount === 10) { setRewardActive(true) }
  }

  return (
    <div className="stampcard">
      <div className="top-row">
        <Stamp key="1" passStampStatus={() => onStampSubmitted()}/>
        <Stamp key="2" passStampStatus={() => onStampSubmitted()}/>
        <Stamp key="3" passStampStatus={() => onStampSubmitted()}/>
        <Stamp key="4" passStampStatus={() => onStampSubmitted()}/>
        <Stamp key="5" passStampStatus={() => onStampSubmitted()}/>
      </div>
      <div className="bottom-row">
        <Stamp key="6" passStampStatus={() => onStampSubmitted()}/>
        <Stamp key="7" passStampStatus={() => onStampSubmitted()}/>
        <Stamp key="8" passStampStatus={() => onStampSubmitted()}/>
        <Stamp key="9" passStampStatus={() => onStampSubmitted()}/>
        <Stamp key="10" passStampStatus={() => onStampSubmitted()}/>
      </div>
      <div className="reward-button">
        { rewardActive ? (
          <button className="claim-button">Claim Reward</button>
        ) : (
          <p>Keep on recycling for your next reward!</p>
        )}
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <h2>Reclaim</h2>
      <h3>
        <code>VERSION 2.0</code>
      </h3>
      <StampCard />
    </div>
  );
};

export default App;