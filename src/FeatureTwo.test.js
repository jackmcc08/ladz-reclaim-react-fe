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

describe('Feature Two - using rewards button', () => {
  it('When user clicks on add stamp button, one stamp is added', async () => {
    const fakeData = {
    "data": [
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
    ]};

    const fakeDataTwo = {
    "data": [
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
            "id": 776,
            "user_id": "7",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T13:27:41.554Z",
            "updated_at": "2021-05-13T13:27:41.554Z"
        }
    ]};

    const fakeDataThree = {
    "data": [
        {
            "id": 779,
            "user_id": "8",
            "business_id": "8",
            "redeemed": false,
            "created_at": "2021-05-13T14:06:09.152Z",
            "updated_at": "2021-05-13T14:06:09.152Z"
        },
        {
            "id": 779,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T14:06:09.152Z",
            "updated_at": "2021-05-13T14:06:09.152Z"
        },
        {
            "id": 778,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T13:43:54.940Z",
            "updated_at": "2021-05-13T13:43:54.940Z"
        },
        {
            "id": 777,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T13:28:31.426Z",
            "updated_at": "2021-05-13T13:28:31.426Z"
        },
        {
            "id": 776,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T13:27:41.554Z",
            "updated_at": "2021-05-13T13:27:41.554Z"
        },
        {
            "id": 781,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T15:06:09.983Z",
            "updated_at": "2021-05-13T15:06:09.983Z"
        },
        {
            "id": 780,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T14:06:09.983Z",
            "updated_at": "2021-05-13T14:06:09.983Z"
        },
        {
            "id": 779,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T14:06:09.152Z",
            "updated_at": "2021-05-13T14:06:09.152Z"
        },
        {
            "id": 778,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T13:43:54.940Z",
            "updated_at": "2021-05-13T13:43:54.940Z"
        },
        {
            "id": 777,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T13:28:31.426Z",
            "updated_at": "2021-05-13T13:28:31.426Z"
        },
        {
            "id": 776,
            "user_id": "8",
            "business_id": "8",
            "redeemed": true,
            "created_at": "2021-05-13T13:27:41.554Z",
            "updated_at": "2021-05-13T13:27:41.554Z"
        }
    ]};

    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve(fakeData)
    ).mockImplementationOnce(() =>
      Promise.resolve(fakeDataTwo)
    ).mockImplementationOnce(() =>
      Promise.resolve(fakeDataTwo)
    ).mockImplementationOnce(() =>
      Promise.resolve(fakeDataThree)
    );

    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve());

    jest.spyOn(axios, 'patch').mockImplementation(() => Promise.resolve());

    await act(async () => {
      await render(<App />);
    });

    const buttonElement = screen.getByText(/Add Stamp/i);
    expect(buttonElement).toBeInTheDocument();

    const numStamps = screen.getByText(/9/i);
    expect(numStamps).toBeInTheDocument();

    const buttonAddStamp = screen.getByText("Add Stamp")

    await act(async () => {
      await fireEvent.click(buttonAddStamp)
      // button.click(new MouseEvent("click"))
    });

    const numStamps2 = screen.getByText(/Stamps: 10/i);
    expect(numStamps2).toBeInTheDocument();

    const buttonClaimReward = screen.getByText("Claim reward!")

    await act(async () => {
      await fireEvent.click(buttonClaimReward)
      // button.click(new MouseEvent("click"))
    });

    const buttonElementUR = screen.getByText(/Use Reward/i);
    expect(buttonElementUR).toBeInTheDocument();

    const rewardElement = screen.getByText(/Here's 10% off of some milk!/i);
    expect(rewardElement).toBeInTheDocument();

    const buttonUseReward = screen.getByText("Use reward!")

    await act(async () => {
      await fireEvent.click(buttonUseReward)
      // button.click(new MouseEvent("click"))
    });

    const numStamps3 = screen.getByText(/Stamps: 0/i);
    expect(numStamps3).toBeInTheDocument();

    const buttonAddStamp2 = screen.getByText("Add Stamp")

    await act(async () => {
      await fireEvent.click(buttonAddStamp2)
      // button.click(new MouseEvent("click"))
    });

    const numStamps4 = screen.getByText(/Stamps: 1/i);
    expect(numStamps4).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledTimes(4)
    expect(axios.post).toHaveBeenCalledTimes(2)

    axios.get.mockRestore();
    axios.post.mockRestore();
    axios.patch.mockRestore();
  })
})
