import React from 'react';
import axios from 'axios';

// this function is not in use, I was attempting to move functionality from App.js to a seperate ApiInterface.js file.
async function createStamp() {
  axios.post('https://reclaim-api.herokuapp.com/api/v1/stamps', {
    user_id: 8,
    business_id: 8,
    redeemed: false,
  })
}

// this function is not in use, I was attempting to move functionality from App.js to a seperate ApiInterface.js file.
async function getStampRecords() {
  let stampRecords = await axios.get('https://reclaim-api.herokuapp.com/api/v1/stamps').then(response => {
    return response.data
  })
  return stampRecords
}

async function currentNumStamps() {
  let numStamps = await getStampRecords().then((stampRecords) => {
    console.log(stampRecords)
    let stampCounter = 0;
    stampRecords.forEach(stamp => {
      if (stamp.user_id === "8" && !stamp.redeemed) {
        stampCounter += 1;
      }
    });
    // console.log(stampCounter)
    return stampCounter
  })
  // console.log(numStamps)
  return numStamps
}



// async function test() {
//   let test = await getStampRecords()
//   console.log(test)
// }
//
// function test2() {
//   let results = getStampRecords().then((response) => {
//     console.log("this is it")
//     console.log(response[0])
//     return response[0]
//   })
//   console.log(results)
//   // console.log(test)
// }


// test2()
// currentNumStamps()

export { createStamp, currentNumStamps };
