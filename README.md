# React-scrape

## Re-usable react Typescript components and functions.

###This project is still in its early days and in development.

But we have a first re-usable component for you. 🥳

---

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install react-scrape.

```bash
npm i react-scrape
```

---

## Basic Usage

###SpinnerMultiColor

This is a customisable loading spinner. Zero config out of the box. But flexible and easy to customize.

#### Use case

As all spinner it`s a placeholder while data is in the process or user need to wait for any action.
Mainly loading or fetching data.

```javascript
// import the component and the css file provide the style.
import { SpinnerMultiColor } from 'react-scrape'; //<-- the componenet
import 'react-scrape/dist/react-scrape.cjs.development.css'; //<-- the css provide the default style

// pluge it in anywhere you need a loading spinner.
function App() {
  return (
    <div>
      <SpinnerMultiColor />
    </div>
  );
}
```

---

## Customize the component
