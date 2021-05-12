import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from "react-dom";

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
  test('renders button to Add Stamps', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Add Stamp/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders App header', () => {
    render(<App />);
    const headerElement = screen.getByText("RECLAIM!");
    expect(headerElement).toBeInTheDocument();
  });

  test('renders App counter', () => {
    render(<App />);
    const counterAppElement = screen.getByText("Stamps: 0");
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
    const counterElement = screen.getByText("Stamps: 0");
    const counterElementTwo = screen.getByText(/Stamps:/);
    expect(counterElement).toBeInTheDocument();
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
