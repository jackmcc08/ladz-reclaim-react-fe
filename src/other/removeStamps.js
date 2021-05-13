// import React from 'react';
// import logo from './logo.svg';
import fetch from 'node-fetch'
// import axios from 'axios';

function removeStamps() {
  for (let i = 846; i <= 965  ; i++) {
    fetch('https://reclaim-api.herokuapp.com/api/v1/stamps/' + i, {
      method: 'DELETE',
    })
  }
}

removeStamps()
