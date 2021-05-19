import React from 'react';
import { getUserRewardRecords } from '../api/RewardsApiInterface.js';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: getUserRewardRecords(this.props.userID),
    };
  }

  userRewards() {
    getUserRewardRecords(this.props.userID).then((response) => {
      console.log(response)
      response.forEach(record => {
        console.log(record)
        <RewardCard reward={record} />
      })
    })

    // for (let i = 0, i == this.state.records, i++)
  }

  render() {
    return (
      <div>
        <h3>{this.props.username}'s Wallet</h3>
        {this.userRewards()}
      </div>
    )
  }
}

function RewardCard(props) {
  return(
    <div>
      <h3>{props.record.id}</h3>
    </div>
  )
}

export default Wallet;
