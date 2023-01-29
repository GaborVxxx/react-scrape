import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Thing } from '../src';
import { render, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import useToggle from "../src";

const App = () => {
  const [value, toggle] = useToggle();

  React.useEffect(() => {
    toggle()
  },[]);

  if(value) {
    return <div>yes!</div>
  }
  return null
}

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<Thing />);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('toggle', () => {
  test('toggle with hook', async () => {
    render(<App />);
    await waitFor(async () => {
          const yes = await screen.findAllByText('yes!');
          expect(yes[0]).toBeInTheDocument();
    })
  });
});
