import axios from 'axios';

async function createStamp() {
  let newStamp = await axios.post('https://reclaim-api.herokuapp.com/api/v1/stamps', {
    user_id: 8,
    business_id: 8,
    redeemed: false,
  })
  return newStamp
}

async function getStampRecords() {
  let stampRecords = await axios.get('https://reclaim-api.herokuapp.com/api/v1/stamps').then(response => {
    return response.data
  })
  return stampRecords
}

async function getCurrentNumStamps() {
  let numStamps = await getStampRecords()
  .then((stampRecords) => {
    let stampCounter = 0;
    stampRecords.forEach(stamp => {
      if (stamp.user_id === "8" && !stamp.redeemed) {
        stampCounter += 1;
      }
    });
    return stampCounter
  })
  return numStamps
}

async function patchRedeemedStamps() {
  let result = await getStampRecords()
  .then(stampRecords => {
    let unredeemedStamps = [];
    stampRecords.forEach(stamp => {
      if (stamp.user_id === "8" && !stamp.redeemed) {
        unredeemedStamps.push(stamp)
      }
    })
    return unredeemedStamps;
  })
  .then(unredeemedStamps => {
    unredeemedStamps.forEach(stamp => {
      axios.patch(`https://reclaim-api.herokuapp.com/api/v1/stamps/${stamp.id}`, {
        redeemed: true,
      })
    });
  })
  return result // returns undefined
}

export { createStamp, getCurrentNumStamps, patchRedeemedStamps, getStampRecords };


axios.get('https://reclaim-api.herokuapp.com/api/v1/stamps').then((response) => {console.log(response.data)})
