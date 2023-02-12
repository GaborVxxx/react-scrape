import * as React from 'react';
//import * as ReactDOM from 'react-dom';
import {
  render,
  screen,
  //waitFor,
  //logRoles,
  //prettyDOM,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SpinnerMultiColor } from '../spiner/spiners';

describe('SpinnerMultiColor', () => {
  test('Render first div for SpinnerMultiColor with the Loading text inside', async () => {
    render(<SpinnerMultiColor />);
    const loading = await screen.findAllByText('Loading');
    expect(loading[0]).toBeInTheDocument();
  });
});

describe('Class names', () => {
  test('Spinner class name', async () => {
    render(<SpinnerMultiColor />);
    const loading = await screen.findByTestId('container');
    expect(loading.className).toBe('spinner');
  });
  test('Spinner first child class name', async () => {
    render(<SpinnerMultiColor />);
    const first = await screen.findByTestId('first');
    expect(first.className).toBe('spinner-sector-one');
  });
  test('Spinner second child class name', async () => {
    render(<SpinnerMultiColor />);
    const first = await screen.findByTestId('second');
    expect(first.className).toBe('spinner-sector-two');
  });
  test('Spinner third child class name', async () => {
    render(<SpinnerMultiColor />);
    const first = await screen.findByTestId('third');
    expect(first.className).toBe('spinner-sector-three');
  });
});

describe('Text prop', () => {
  test('Change text style', async () => {
    render(<SpinnerMultiColor text={'Test'} />);
    const container = await screen.findByTestId('container');
    expect(container.textContent).toBe('Test');
  });
  test('Text additional style', async () => {
    render(<SpinnerMultiColor textStyle={{ fontSize: '0.5rem' }} />);
    const textStyle = await screen.findByText('Loading');
    expect(textStyle).toBeInTheDocument();
    //console.debug(textStyle.style)
    expect(textStyle.style.fontSize).toBe('0.5rem');
  });
});

describe('Spinner container additional style', () => {
  test('Set different with and height', async () => {
    render(
      <SpinnerMultiColor sizeStyle={{ height: '100px', width: '100px' }} />
    );
    const container = await screen.findByTestId('container');
    expect(container).toBeInTheDocument();
    expect(container.style.height).toBe('100px');
    expect(container.style.width).toBe('100px');
  });
});

describe('Adding additional style for all segments', () => {
  test('Set different color for first segment', async () => {
    render(
      <SpinnerMultiColor
        firstSectionStyle={{
          borderTopColor: 'gray',
        }}
      />
    );
    const first = await screen.findByTestId('first');
    expect(first).toBeInTheDocument();
    expect(first.style.borderTopColor).toBe('gray');
  });
  test('Set different color for second segment', async () => {
    render(
      <SpinnerMultiColor
        secondSectionStyle={{
          borderLeftColor: 'yellow',
        }}
      />
    );
    const se = await screen.findByTestId('second');
    expect(se).toBeInTheDocument();
    expect(se.style.borderLeftColor).toBe('yellow');
  });
  test('Set different color for third segment', async () => {
    render(
      <SpinnerMultiColor thirdSectionStyle={{ borderRightColor: 'black' }} />
    );
    const th = await screen.findByTestId('third');
    expect(th).toBeInTheDocument();
    expect(th.style.borderRightColor).toBe('black');
  });
});
