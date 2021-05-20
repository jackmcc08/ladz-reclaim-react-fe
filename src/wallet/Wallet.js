import React, { useState } from 'react';
import closedWallet from '../other/wallet-stationary.png';
import openWallet from '../other/wallet-animated.gif';
import { getUserRewardRecords, getRewardRecords, patchUserRewards } from '../api/RewardsApiInterface.js';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: this.userRewards(),
      rewards: [],
      walletOpen: false,
      wallet: closedWallet
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
    const rewards = [];
    var itemsProcessed = 0;
    records.forEach((record, index, array) => {
      if (record.user_id === this.props.userID) {
      getRewardRecords(record.reward_id).then((reward) => {
        rewards.push({...reward, ...record});
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
    this.setState({
      wallet: openWallet
    });
    setTimeout(() => {
      this.userRewardsContent(this.state.records)
    }, 1150);
  }

  render() {

    const walletOpen = this.state.walletOpen;
    let wallet;
    if (walletOpen) {
      wallet = <OpenWallet rewards={this.state.rewards} />;
    } else {
      wallet = <img src={this.state.wallet} onClick={() => this.handleOpenWalletClick()}></img>
    }
    return (
      <div  className="wallet-container">
        <h3 className="login-title">{this.props.username}'s Wallet</h3>
        {wallet}
      </div>
    )
  }
}

export default Wallet;

function OpenWallet(props) {
  return(
    <div  className="walletRewardsDiv">
      {props.rewards.map((reward) => (
        <RewardVoucher
          key={`reward-${reward.id}`}
          {...reward}
          />
      ))}
    </div>
  )
}

const RewardVoucher = ({ id, reward_content, redeemed }) => {
  const [showReward, setShowReward] = useState(!redeemed);

  const onClaimRewardClicked = () => {
    patchUserRewards(id);
    setShowReward(false);
  }

  return (
    <div className="voucher-container">
      {showReward ? (
        <div className="active-voucher">
          <p>{reward_content}</p>
          <button className="claim-button" onClick={() => onClaimRewardClicked()} >Use Reward!</button>
        </div>
      ) : (
        <p style={{textDecoration: 'line-through'}}>{reward_content}</p>
      )}
    </div>
  )
}
