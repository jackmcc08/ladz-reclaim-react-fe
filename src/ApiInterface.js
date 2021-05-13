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
  axios.get('https://reclaim-api.herokuapp.com/api/v1/stamps').then(response => {
    // console.log(response)
    return response
  })
}

// this function is not in use, I was attempting to move functionality from App.js to a seperate ApiInterface.js file.
function getCurrentStamps() {
  axios.get('https://reclaim-api.herokuapp.com/api/v1/stamps')
  .then((response) => {
    // console.log(response)
    let stampCounter = 0;
    response.data.forEach(stamp => {
      if (stamp.user_id === "8" && !stamp.redeemed) {
        stampCounter += 1;
      }
    });
    return stampCounter;
  })
}


export { createStamp, getStampRecords, getCurrentStamps };
