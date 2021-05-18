import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import axios from 'axios';
import { createUser, createSession, destroySession } from './logInOutApiInterface.js';

let container = null

const validInput = {
  username: "test_user",
  password: "test_password"
}

const fakeNewUser = {
  "status":"created",
  "user":"test_user",
}

const fakeNewSession = {
  "status":"created",
  "logged_in":true,
  "user":"test_user",
  "user_id":2
}

const fakeDestroyedSession = {
  "status":"session_destroyed",
  "logged_in":false
}

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

describe('#createUser', () => {
  it('it posts creation of a new user', async() => {
    jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.resolve(fakeNewUser)
    )

    let result
    await act(async () => {
      await createUser(validInput).then(response => {
        result = response
      })
    })

    await expect(result).toBe(fakeNewUser)
  })
})

describe('#createSession', () => {
  it('it posts create of a new session', async() => {
    jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.resolve(fakeNewSession)
    )

    let result
    await act(async () => {
      await createSession(validInput).then(response => {
        result = response
      })
    })

    await expect(result).toBe(fakeNewSession)
  })
})

describe('#destroySession', () => {
  it('it destroys the existing session', async () => {
    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve(fakeDestroyedSession)
    )

    let result
    await act(async () => {
      await destroySession().then(response => {
        result = response
      })
    })

    await expect(result).toBe(fakeDestroyedSession)
  })
})

// actual API pings to test the axios return
//
// const url = 'http://localhost:3001'
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
