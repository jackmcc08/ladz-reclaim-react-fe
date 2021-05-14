import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const useStamps = () => {
  const [stamps, setStamps] = useState([]);

  const fetchStamps = async () => {
    const res = await axios.get('https://reclaim-api.herokuapp.com/api/v1/stamps');
    const json = await res.json();

    setStamps(json);
  }

  useEffect(() => fetchStamps(), [])

  return [stamps];
}

const Stamp = ({ id, user_id, redeemed }) => {
  const data = { 
    user_id: 9,
    business_id: 8,
    redeemed: false,
  }
  
  const [isStamped, setIsStamped] = useState(redeemed)

  const onStampButtonClicked = async () => {
    const response = await fetch(`https://reclaim-api.herokuapp.com/api/v1/stamps`,
    {
      method: POST,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    )
  }
  return (
    <button className="stamp" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

const StampCard = () => {
  const [stamps] = useStamps();

  return (
    <div className="stamp-card">
      {stamps.map((stamp) => (
        <Stamp key={`stamp-${stamp.id}`} {...stamp} />
      ))}
    </div>
  )
}

class Card extends React.Component {
  renderStamp(i) {
    return (
      <Stamp 
        value={this.props.stamps[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="cardStamps">
          {this.renderStamp(0)}
          {this.renderStamp(1)}
          {this.renderStamp(2)}
          {this.renderStamp(3)}
          {this.renderStamp(4)}
          {this.renderStamp(5)}
          {this.renderStamp(6)}
          {this.renderStamp(7)}
          {this.renderStamp(8)}
          {this.renderStamp(9)}
          {this.renderStamp(10)}   
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1>RECLAIM!</h1>
      </header>
      <main className="App-body">
        <Stamp />
      </main>
    </div>
    );
  }
}

export default App;