import React, { useState } from 'react';
import './App.css';

const Stamp = ({stamped}) => {
  const [isStamped, setIsStamped] = useState(false)

  return (
    <div className="stamp">
      {isStamped ? (
        <button className="filled-stamp">Stamped</button>
      ) : (
        <button className="empty-stamp" onClick={() => setIsStamped(true)}>Unstamped</button>
      )}
    </div>
  )
}

const StampCard = () => {
  return (
    <div className="stampcard">
      <div className="top-row">
        <Stamp key="1"/>
        <Stamp key="2"/>
        <Stamp key="3"/>
        <Stamp key="4"/>
        <Stamp />
      </div>
      <div className="bottom-row">
        <Stamp key="6"/>
        <Stamp key="7"/>
        <Stamp key="8"/>
        <Stamp key="9"/>
        <Stamp key="10"/>
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