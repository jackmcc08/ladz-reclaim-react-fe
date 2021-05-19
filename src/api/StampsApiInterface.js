import axios from 'axios';

const url = `${process.env.REACT_APP_API_URL}`
const token = localStorage.getItem('token')

async function createStamp(userID, businessID) {
  let newStamp = await axios.post(`${url}/api/v1/stamps`, {
    user_id: userID,
    // update to business_id: 1
    business_id: businessID,
    redeemed: false,
  }, {
    headers: {
      'Authorization': `token ${token}`
    }
  })
  return newStamp
}

async function getStampRecords() {
  let stampRecords = await axios.get(`${url}/api/v1/stamps`, {
    headers: {
      'Authorization': `token ${token}`
    }
  }).then(response => {
    return response.data
  })
  return stampRecords
}

async function getCurrentNumStamps(userID, businessID) {
  let numStamps = await getStampRecords()
  .then((stampRecords) => {
    let stampCounter = 0;
    stampRecords.forEach(stamp => {
      if (stamp.user_id === userID && stamp.business_id === businessID && !stamp.redeemed) {
        stampCounter += 1;
      }
    });
    return stampCounter
  })
  return numStamps
}

async function patchRedeemedStamps(userID, businessID) {
  let result = await getStampRecords()
  .then(stampRecords => {
    let unredeemedStamps = [];
    stampRecords.forEach(stamp => {
      if (stamp.user_id === userID && stamp.business_id === businessID && !stamp.redeemed) {
        unredeemedStamps.push(stamp)
      }
    })
    return unredeemedStamps;
  })
  .then(unredeemedStamps => {
    unredeemedStamps.forEach(stamp => {
      axios.patch(`${url}/api/v1/stamps/${stamp.id}`, {
        redeemed: true,
      },
      {
        headers: {
          'Authorization': `token ${token}`
        }
      })
    });
  })
  return result // returns undefined
}

export { createStamp, getCurrentNumStamps, patchRedeemedStamps, getStampRecords };


// axios.get(`${url}/api/v1/stamps`).then((response) => {console.log(response.data)})
