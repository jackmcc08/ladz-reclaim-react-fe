import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from "react-dom";

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
  it('When user clicks on add stamp button, one stamp is added', () => {
    render(<RewardScreen />);
    const rewardElement = screen.getByText(/Here's 10% off of some milk!/i);
    expect(rewardElement).toBeInTheDocument();
  })
})
