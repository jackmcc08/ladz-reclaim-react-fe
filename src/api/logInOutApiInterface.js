import axios from 'axios';

const url = `${process.env.REACT_APP_API_URL}`

async function createUser(username, password) {
  let newUser = await axios.post(`${url}/api/v1/users`, { user: {
    username: username,
    password: password,
  }});
  return newUser
}

// async function createSession(username, password) {
//   let newSession = await axios.post(`${url}/api/v1/sessions`, { user: {
//     username: username,
//     password: password,
//   }});
//   return newSession
// }

async function authenticateUser(username, password) {
  let newToken = await axios.post(`${url}/api/v1/authenticate`, {
    username: username,
    password: password,
  });
  return newToken
}

// async function destroySession() {
//   let destroyedSession = await axios.get(`${url}/api/v1/logout`);
//   return destroyedSession
// }

export { authenticateUser, createUser }; //, createSession, destroySession};
