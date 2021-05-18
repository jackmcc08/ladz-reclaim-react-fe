import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import axios from 'axios';
import { createStamp, getCurrentNumStamps, patchRedeemedStamps, getStampRecords } from './StampsApiInterface.js';

let container = null

let testUserID = 8

const fakeResponse = {
"data": [
    {
        "id": 780,
        "user_id": "8",
        "business_id": "8",
        "redeemed": false,
        "created_at": "2021-05-13T14:06:09.983Z",
        "updated_at": "2021-05-13T14:06:09.983Z"
    }]};

const fakeResponseTwo = {
"data": [
    {
        "id": 780,
        "user_id": "8",
        "business_id": "8",
        "redeemed": true,
        "created_at": "2021-05-13T14:06:09.983Z",
        "updated_at": "2021-05-13T14:06:09.983Z"
    }]};

const fakeNewStamp = {
  "id": 1,
  "user_id": "8",
  "business_id": "8",
  "redeemed": false,
  "created_at": "2021-05-13T14:06:09.983Z",
  "updated_at": "2021-05-13T14:06:09.983Z"
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

describe('#createStamp', () => {
  it('it posts creation of a new stamp', async () => {
    jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.resolve(fakeNewStamp)
    )

    let result
    await act(async () => {
      await createStamp(testUserID).then(response => {
        result = response
      })
    })

    await expect(result).toBe(fakeNewStamp)
  })
})

describe('#getStampRecords', () => {
  it('it gets all stamp records from the database', async () => {
    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve(fakeResponse)
    )

    let result
    await act(async () => {
      await getStampRecords().then(response => {
        result = response
      })
    })

    await expect(result).toBe(fakeResponse.data)
  })
})

describe('#getCurrentNumStamps', () => {
  it('it reviews the stamp records and calculated the number of unredeemedStamps', async () => {
    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve(fakeResponse)
    )

    let result
    await act(async () => {
      await getCurrentNumStamps(testUserID).then(response => {
        result = response
      })
    })

    await expect(result).toBe(1)
  })
})

describe('#patchRedeemedStamps', () => {
  it('it updates the stamps to redeemed', async () => {
    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve(fakeResponse)
    ).mockImplementationOnce(() =>
      Promise.resolve(fakeResponseTwo)
    )

    jest.spyOn(axios, 'patch')

    let result
    await act(async () => {
      await patchRedeemedStamps(testUserID).then(response => {
        result = response
      })
    })

    await expect(result).toBe(undefined)
    await expect(axios.patch).toHaveBeenCalledTimes(1)
  })
})
