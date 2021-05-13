import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import axios from 'axios';
import { createStamp, getCurrentNumStamps, patchRedeemedStamps } from './api/StampsApiInterface.js';
import App, { AddStamp, StampCounter, ClaimReward, UseReward, RewardScreen } from './App';

// key code for testing from https://reactjs.org/docs/testing-recipes.html
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

describe('App', () => {
  const fakeData = {
  "data": [
      {
          "id": 780,
          "user_id": "8",
          "business_id": "8",
          "redeemed": false,
          "created_at": "2021-05-13T14:06:09.983Z",
          "updated_at": "2021-05-13T14:06:09.983Z"
      }]};

  test('renders button to Add Stamps', async () => {

    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve(fakeData)
    )

    await act(async () => {
      await render(<App />);
    });

    const buttonElement = screen.getByText(/Add Stamp/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders App header', async () => {

    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve(fakeData)
    )

    await act(async () => {
      await render(<App />);
    });

    const headerElement = screen.getByText("RECLAIM!");
    expect(headerElement).toBeInTheDocument();
  });

  test('renders App counter', async () => {

    jest.spyOn(axios, 'get').mockImplementationOnce(() =>
      Promise.resolve(fakeData)
    )

    // 
    // jest.spyOn(getCurrentNumStamps).mockImplementationOnce(() => {
    //   return 1
    // })

    await act(async () => {
      await render(<App />);
    });

    const counterAppElement = screen.getByText(/Stamps: 1/i);
    expect(counterAppElement).toBeInTheDocument();
  })
})

describe('#AddStamp', () => {
  it('renders a button which can add stamps', () => {
    render(<AddStamp />);
    const buttonElement = screen.getByText(/Add Stamp/i);
    expect(buttonElement).toBeInTheDocument();
  });
})

describe('#StampCounter', () => {
  it('renders a stamp counter which tracks number of stamps', () => {
    render(<StampCounter numStamps={0}/>);
    // const counterElement = screen.getByText("Stamps: 2");
    const counterElementTwo = screen.getByText(/Stamps: 0/);
    // expect(counterElement).toBeInTheDocument();
    expect(counterElementTwo).toBeInTheDocument();
  });
})

describe('#ClaimReward', () => {
  it('renders a button which can claim rewards', () => {
    render(<ClaimReward />);
    const claimElement = screen.getByText(/Claim reward!/i);
    expect(claimElement).toBeInTheDocument();
  });
})

describe('#UseReward', () => {
  it('renders a button which can add stamps', () => {
    render(<UseReward />);
    const useRewardElement = screen.getByText(/Use reward!/i);
    expect(useRewardElement).toBeInTheDocument();
  });
})

describe('#RewardScreen', () => {
  it('renders an element which displays the reward', () => {
    render(<RewardScreen />);
    const rewardElement = screen.getByText(/Here's 10% off of some milk!/i);
    expect(rewardElement).toBeInTheDocument();
  });
})
