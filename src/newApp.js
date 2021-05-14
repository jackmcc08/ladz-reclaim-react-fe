import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

const useStamps = () => {
  const [stamps, setStamps] = useState([]);

  const fetchStamps = async () => {
    const res = await axios.get('https://reclaim-api.herokuapp.com/api/v1/stamps')

    setStamps(res.data)
  };

  useEffect(() => fetchStamps(), []);

  return [stamps];
};

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
  const [stamps] = useStamps();

  const stampCount = () => {
    const userStamps = stamps.filter(stamp => stamp.user_id === "10" && !stamp.redeemed);
    console.log(userStamps);
    return userStamps;
  }

  const onStampSubmitted = () => {
    stampCount += 1;
    if(stampCount === 10) { setRewardActive(true) }
  }

  return (
    <div className="stampcard">
      <div className="top-row">
        {stampCount().length}
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