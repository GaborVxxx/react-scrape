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

### Output

![Spinner gif 1](./assests/Spinner%201.gif)

---

## Customize the component

You can use parameters to send additional style in to the component.

- textStyle={ }
- text={ }
- sizeStyle={ }
- firstSectionStyle={ }
- secondSectionStyle={ }
- thirdSectionStyle={ }

NOTE: If you like to change a color of a specific use the following combination.

- firstSectionStyle={{ borderTopColor: ' ' }} <-- the first segment you see is the "borderTopColor" css property.
- secondSectionStyle={{ borderLeftColor: ' ' }} <-- the second segment you see is the "borderLeftColor" css property.
- thirdSectionStyle={{ borderRightColor: ' ' }} <-- the third segment you see is the "borderRightColor" css property.

---

## Example

```javascript
// costumize the component with parameters
function App() {
  return (
    <div>
      <SpinnerMultiColor
        textStyle={{ fontSize: '1rem', fontFamily: 'Times New Roman' }}
        text={'foo'}
        sizeStyle={{ height: '110px', width: '110px' }}
        firstSectionStyle={{ borderTopColor: 'purple' }}
        secondSectionStyle={{ borderLeftColor: 'yellow' }}
        thirdSectionStyle={{ borderRightColor: 'black' }}
      />
    </div>
  );
}
```

You can essentially push any additional css to the component and override its default css. Except the keyframe.

### Output

![Spinner gif 2](./assests/Spinner%202.gif)

---

## Contributing

Info coming soon on how to contribute and what rules will be set. So please stay tuned.

---

## License

[MIT](https://choosealicense.com/licenses/mit/)

## You can find me

[https://www.thriveoncode.co.uk/](https://www.thriveoncode.co.uk/)

[LinkedIn](https://www.linkedin.com/in/gabor-vaszi-329b54212/)
