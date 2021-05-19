import React from 'react';
import { getUserRewardRecords, getRewardRecords } from '../api/RewardsApiInterface.js';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: this.userRewards(),
      rewards: [],
      walletOpen: false,
    };
  }



  userRewards() {
    getUserRewardRecords(this.props.userID).then((records) => {
      this.setState({
        records: records
      })
    })
  }

  userRewardsContent(records) {
    console.log(records)
    const rewards = [];
    records.forEach(record => {
      if (record.user_id === this.props.userID) {
      getRewardRecords(record.reward_id).then((reward) => {
        rewards.push(reward);
        console.log(rewards, 'after each push')
        }).then(() => {
          this.setState({
            walletOpen: true,
            rewards: rewards,
          })
        })
      }
    })
  }

  handleOpenWalletClick() {
    this.userRewardsContent(this.state.records)
  }

  render() {

    const walletOpen = this.state.walletOpen;
    let wallet;
    if (walletOpen) {
      wallet = <OpenWallet rewards={this.state.rewards}/>;
    } else {
      wallet = <button onClick={() => this.handleOpenWalletClick()}></button>
    }
    return (
      <div>
        <h3>{this.props.username}'s Wallet</h3>
        {wallet}
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

function OpenWallet(props) {
  console.log(props)
  return(
    <div className="open-wallet">  
        <h3>{props.reward_content}</h3>
    </div>
  )
}