import axios from 'axios';

const url = `${process.env.REACT_APP_API_URL}`

async function getRewardRecords(businessID) {
  let token = localStorage.getItem('token')
  let rewardRecords = await axios.get(`${url}/api/v1/rewards`, {
    headers: {
      'Authorization': `token ${token}`
    }
  }).then(response => {
    // console.log(response.data)
    let rewards = [];
    response.data.forEach(reward => {
      if (reward.business_id == `${businessID}`) {
        rewards.push(reward)
      }
    })
    // console.log(rewards)
    return rewards[0]
  })
  return rewardRecords
}

export {getRewardRecords};
