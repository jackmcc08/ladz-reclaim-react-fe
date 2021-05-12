import { render, screen } from '@testing-library/react';
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

test('renders button to Add Stamps', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Add Stamp/i);
  expect(buttonElement).toBeInTheDocument();
});

describe('#AddStamp', () => {
  it('renders a button which can add stamps', () => {
    render(<AddStamp />);
    const buttonElement = screen.getByText(/Add Stamp/i);
    expect(buttonElement).toBeInTheDocument();
  });
})

describe('#StampCounter', () => {
  it('renders a button which can add stamps', () => {
    render(<StampCounter />);
    const counterElement = screen.getByText("Stamps:");
    expect(counterElement).toBeInTheDocument();
  });
})

describe('#RewardScreen', () => {
  it('renders an element which displays the reward', () => {
    render(<RewardScreen />);
    const rewardElement = screen.getByText(/Here's 10% off of some milk!/i);
    expect(rewardElement).toBeInTheDocument();
  });
})
