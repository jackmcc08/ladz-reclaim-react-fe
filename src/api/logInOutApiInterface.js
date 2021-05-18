import axios from 'axios';

const url = 'http://localhost:3001'

async function createUser(username, password) {
  let newUser = await axios.post(`${url}/api/v1/users`, { user: {
    username: username,
    password: password,
  }});
  return newUser
}

async function createSession(username, password) {
  let newSession = await axios.post(`${url}/api/v1/sessions`, { user: {
    username: username,
    password: password,
  }});
  return newSession
}

async function destroySession() {
  let destroyedSession = await axios.get(`${url}/api/v1/logout`);
  return destroyedSession
}
//
// axios.post(`${url}/api/v1/users`, { user: {
//   username: 'jack2',
//   password: 'Jack',
// }}).then(response => console.log(response.data))
//
// axios.post(`${url}/api/v1/sessions`, { user: {
//   username: 'jack2',
//   password: 'Jack',
// }}).then(response => console.log(response.data))
//
// axios.get(`${url}/api/v1/logout`).then(response => console.log(response.data))
//
// axios.post(`${url}/api/v1/stamps`, {
//   user_id: 8,
//   // update to business_id: 1
//   business_id: 8,
//   redeemed: false,
// }).then(response => console.log(response.data))

export { createUser, createSession, destroySession};
