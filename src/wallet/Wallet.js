import { clippingParents } from '@popperjs/core';
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
    console.log(records, 'records')
    const rewards = [];
    var itemsProcessed = 0;
    records.forEach((record, index, array) => {
      if (record.user_id === this.props.userID) {
      getRewardRecords(record.reward_id).then((reward) => {
        rewards.push(reward);
        itemsProcessed++;
        if(itemsProcessed === array.length) {
          this.setState({
            rewards: rewards,
            walletOpen: true,
          });
        }
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

export default Wallet;

function OpenWallet(props) {
  props.rewards.map((reward) => {console.log(reward)})
  return(
    <div className="open-wallet"> 
      {props.rewards.map((reward, i) => (
        <RewardVoucher key={`reward-${i}`} reward_content={reward.reward_content} />
      ))}
    </div>
  )
}

function RewardVoucher(props) {
  return(
    <div className="reward-voucher">
      <p>{props.reward_content}</p>
    </div>
  )
}