import * as React from 'react';
import {
  render,
  screen,
  //waitFor,
  //logRoles,
  //prettyDOM,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Bouncer } from '../spiner/bouncer';

describe('Bouncer', () => {
  test('Render the bouncer with the Loading text inside', async () => {
    render(<Bouncer />);
    const loading = await screen.findAllByText('Loading');
    expect(loading[0]).toBeInTheDocument();
  });
});

describe('Class names', () => {
  test('Container class', async () => {
    render(<Bouncer />);
    const container = await screen.findByTestId('container');
    expect(container.className).toBe('container');
  });
  test('Span class', async () => {
    render(<Bouncer />);
    const span = await screen.findByTestId('text');
    expect(span.className).toBe('text');
  });
  test('Bouncer container class', async () => {
    render(<Bouncer />);
    const div = await screen.findByTestId('bouncer');
    expect(div.className).toBe('bouncer');
  });
});

describe('Props', () => {
  test('Text prop', async () => {
    render(<Bouncer text={'Test'} />);
    const text = await screen.findByText('Test');
    expect(text).toBeInTheDocument();
  });
  test('displayText=off', async () => {
    render(<Bouncer displayText={'off'} />);
    const span = await screen.queryByText('Loading');
    expect(span).toBeNull();
  });
  test('textStyle set', async () => {
    render(<Bouncer textStyle={{ fontWeight: 'bold', color: 'white' }} />);
    const span = await screen.findByTestId('text');
    expect(span.style.fontWeight).toBe('bold');
    expect(span.style.color).toBe('white');
  });
  test('containerStyle set', async () => {
    render(<Bouncer containerStyle={{ backgroundColor: 'black' }} />);
    const container = await screen.findByTestId('container');
    expect(container.style.backgroundColor).toBe('black');
  });
  test('bouncerStyle set', async () => {
    render(
      <Bouncer
        bouncerStyle={{ backgroundColor: 'white', borderRadius: '0%' }}
      />
    );
    const f = await screen.findByTestId('1');
    const t = await screen.findByTestId('2');
    const th = await screen.findByTestId('3');
    const fo = await screen.findByTestId('4');
    expect(f).toBeInTheDocument();
    expect(t).toBeInTheDocument();
    expect(th).toBeInTheDocument();
    expect(fo).toBeInTheDocument();
    expect(f.style.backgroundColor).toBe('white');
    expect(t.style.backgroundColor).toBe('white');
    expect(th.style.backgroundColor).toBe('white');
    expect(fo.style.backgroundColor).toBe('white');
  });
});
