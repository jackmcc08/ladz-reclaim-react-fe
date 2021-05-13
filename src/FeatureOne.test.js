import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";


import axios from 'axios';
import App, { AddStamp, StampCounter, ClaimReward, UseReward, RewardScreen } from './App';


let container = null
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

describe('Feature One - using add stamp button', () => {
  it('When user clicks on add stamp button, one stamp is added', async () => {
    const fakeData = {
    "data": [
        {
            "id": 780,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T14:06:09.983Z",
            "updated_at": "2021-05-13T14:06:09.983Z"
        },
        {
            "id": 779,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T14:06:09.152Z",
            "updated_at": "2021-05-13T14:06:09.152Z"
        },
        {
            "id": 778,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T13:43:54.940Z",
            "updated_at": "2021-05-13T13:43:54.940Z"
        },
        {
            "id": 777,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T13:28:31.426Z",
            "updated_at": "2021-05-13T13:28:31.426Z"
        },
        {
            "id": 776,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T13:27:41.554Z",
            "updated_at": "2021-05-13T13:27:41.554Z"
        },
        {
            "id": 8,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-12T15:25:42.002Z",
            "updated_at": "2021-05-12T16:34:16.286Z"
        },
        {
            "id": 7,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-12T15:25:29.007Z",
            "updated_at": "2021-05-12T16:34:16.293Z"
        },
        {
            "id": 5,
            "user_id": "10",
            "business_id": "10",
            "redeemed": false,
            "created_at": "2021-05-12T14:21:58.495Z",
            "updated_at": "2021-05-12T14:21:58.495Z"
        },
        {
            "id": 4,
            "user_id": "10",
            "business_id": "10",
            "redeemed": false,
            "created_at": "2021-05-12T14:21:14.887Z",
            "updated_at": "2021-05-12T14:21:14.887Z"
        },
        {
            "id": 3,
            "user_id": "1",
            "business_id": "1",
            "redeemed": false,
            "created_at": "2021-05-12T14:18:47.916Z",
            "updated_at": "2021-05-12T14:18:47.916Z"
        },
        {
            "id": 2,
            "user_id": "1",
            "business_id": "1",
            "redeemed": true,
            "created_at": "2021-05-12T14:17:28.273Z",
            "updated_at": "2021-05-12T15:59:06.300Z"
        },
        {
            "id": 1,
            "user_id": "666",
            "business_id": "666",
            "redeemed": false,
            "created_at": "2021-05-12T13:00:43.670Z",
            "updated_at": "2021-05-12T13:00:43.670Z"
        }
    ]};

    const fakeDataTwo = {
    "data": [
        {
            "id": 781,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T15:06:09.983Z",
            "updated_at": "2021-05-13T15:06:09.983Z"
        },
        {
            "id": 780,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T14:06:09.983Z",
            "updated_at": "2021-05-13T14:06:09.983Z"
        },
        {
            "id": 779,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T14:06:09.152Z",
            "updated_at": "2021-05-13T14:06:09.152Z"
        },
        {
            "id": 778,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T13:43:54.940Z",
            "updated_at": "2021-05-13T13:43:54.940Z"
        },
        {
            "id": 777,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T13:28:31.426Z",
            "updated_at": "2021-05-13T13:28:31.426Z"
        },
        {
            "id": 776,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T13:27:41.554Z",
            "updated_at": "2021-05-13T13:27:41.554Z"
        },
        {
            "id": 8,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-12T15:25:42.002Z",
            "updated_at": "2021-05-12T16:34:16.286Z"
        },
        {
            "id": 7,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-12T15:25:29.007Z",
            "updated_at": "2021-05-12T16:34:16.293Z"
        },
        {
            "id": 5,
            "user_id": "10",
            "business_id": "10",
            "redeemed": false,
            "created_at": "2021-05-12T14:21:58.495Z",
            "updated_at": "2021-05-12T14:21:58.495Z"
        },
        {
            "id": 4,
            "user_id": "10",
            "business_id": "10",
            "redeemed": false,
            "created_at": "2021-05-12T14:21:14.887Z",
            "updated_at": "2021-05-12T14:21:14.887Z"
        },
        {
            "id": 3,
            "user_id": "1",
            "business_id": "1",
            "redeemed": false,
            "created_at": "2021-05-12T14:18:47.916Z",
            "updated_at": "2021-05-12T14:18:47.916Z"
        },
        {
            "id": 2,
            "user_id": "1",
            "business_id": "1",
            "redeemed": true,
            "created_at": "2021-05-12T14:17:28.273Z",
            "updated_at": "2021-05-12T15:59:06.300Z"
        },
        {
            "id": 1,
            "user_id": "666",
            "business_id": "666",
            "redeemed": false,
            "created_at": "2021-05-12T13:00:43.670Z",
            "updated_at": "2021-05-12T13:00:43.670Z"
        }
    ]};

    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve(fakeData)
    ).mockImplementationOnce(() =>
      Promise.resolve(fakeDataTwo)
    );

    await act(async () => {
      await render(<App />);
    });

    jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.resolve());

    const buttonElement = screen.getByText(/Add Stamp/i);
    expect(buttonElement).toBeInTheDocument();

    const numStamps = screen.getByText(/5/i);
    expect(numStamps).toBeInTheDocument();

    const button = screen.getByText("Add Stamp")

    await act(async () => {
      await fireEvent.click(button)
      // button.click(new MouseEvent("click"))
    });

    const numStamps2 = screen.getByText(/Stamps: 6/i);
    expect(numStamps2).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(axios.post).toHaveBeenCalledTimes(1)

    axios.get.mockRestore();
    axios.post.mockRestore();
  })
})
