import axios from 'axios';

const url = `${process.env.REACT_APP_API_URL}`

async function getRewardRecords(businessID) {
  let token = localStorage.getItem('token')
  let rewardRecords = await axios.get(`${url}/api/v1/rewards`, {
    headers: {
      'Authorization': `token ${token}`
    }
  }).then(response => {
    let rewards = [];
    response.data.forEach(reward => {
      if (reward.business_id == `${businessID}`) {
        rewards.push(reward)
      }
    })
    return rewards[0]
  })
  return rewardRecords
}

async function createUserRewardRecord(userID, businessID) {
  let token = localStorage.getItem('token')
  let newRewardRecord = await axios.post(`${url}/api/v1/user_rewards`, {
    user_id: userID,
    reward_id: businessID,
    redeemed: false,
  }, {
    headers: {
        'Authorization': `token ${token}`
    }
  })
  return newRewardRecord
}

async function getUserRewardRecords(userID) {
  let token = localStorage.getItem('token')
  let userRewardRecords = await axios.get(`${url}/api/v1/user_rewards`, {
    headers: {
      'Authorization': `token ${token}`
    }
  }).then(response => {
    let userRewards = [];
    response.data.forEach(userReward => {
      if (userReward.user_id == `${userID}`) {
        userRewards.push(userReward)
      }
    })
    return userRewards;
  })
  return userRewardRecords;
}

async function patchUserRewards(rewardID) {
  let token = localStorage.getItem('token')
  let result = await axios.patch(`${url}/api/v1/user_rewards/${rewardID}`, {
    redeemed: true,
  },
  {
    headers: {
      'Authorization': `token ${token}`
    }
  })
  return result;
}

export { getRewardRecords, createUserRewardRecord, getUserRewardRecords, patchUserRewards };
