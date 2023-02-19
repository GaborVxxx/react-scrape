import * as React from 'react';
import './spinner.css';

/*
import styled from "styled-components";
import {keyframes} from "styled-components";

export const Spinner = styled.div`
  box-sizing: border-box;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6rem;
  overflow: hidden;
  position: relative;
  animation: text 2s ease infinite;
`

export const Spinner_Sector_One = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 0.5rem solid transparent;
  border-top-color: red;
  animation: rotate 2s ease-in-out infinite;
  opacity: 0.5;
`

export const Spinner_Sector_Two = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 0.5rem solid transparent;
  border-left-color: blue;
  animation: rotate 1.5s ease-in-out infinite;
  opacity: 0.5;
`

export const Spinner_Sector_Three = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 0.5rem solid transparent;
  border-right-color: green;
  animation: rotate 2.5s ease-in-out infinite;
  opacity: 0.5;
`

export const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const text = keyframes`
  0%,
  100% {
    color: rgba(0, 0, 0, 1);
  }
  25%,
  75% {
    color: rgba(0, 0, 0, 0.5);
  }
  50% {
    color: rgba(0, 0, 0, 0.1);
  }
`

 */

// Tested: text, textStyle, sizeStyle,
interface Props {
  text?: string;
  textStyle?: {};
  firstSectionStyle?: {};
  secondSectionStyle?: {};
  thirdSectionStyle?: {};
  sizeStyle?: {
    width: undefined | string;
    height: undefined | string;
  };
}

export const SpinnerMultiColor: React.FC<Props> = ({
  text: text,
  textStyle: textStyle,
  firstSectionStyle: firstSectionStyle,
  secondSectionStyle: secondSectionStyle,
  thirdSectionStyle: thirdSectionStyle,
  sizeStyle: sizeStyle,
}) => {
  // text --------
  const [textT, setTextT] = React.useState('Loading');

  React.useEffect(() => {
    if (text) {
      setTextT(text);
    }
    return () => setTextT('Loading');
  }, [text]);

  // text additional style --------
  const [textStyleT, setTextStyleT] = React.useState({});

  React.useEffect(() => {
    if (textStyle) {
      setTextStyleT(textStyle);
    }
    return () => setTextStyleT({});
  }, [textStyle]);

  // additional style for spinner container ---------
  const [spinnerSize, setSpinnerSize] = React.useState({});

  React.useEffect(() => {
    // check for width and height equality
    if (sizeStyle) {
      if (
        sizeStyle.hasOwnProperty('width') &&
        sizeStyle.hasOwnProperty('height')
      ) {
        if (sizeStyle['width'] !== sizeStyle['height']) {
          console.error(
            'SpinnerMultiColor error: If spinner height and width set as property the value has to be the equal!'
          );
        } else {
          setSpinnerSize(sizeStyle);
        }
      } else if (
        sizeStyle.hasOwnProperty('width') &&
        !sizeStyle.hasOwnProperty('height')
      ) {
        console.error(
          'SpinnerMultiColor error: If width set on spinner height need to be set too and it has to be equal value.'
        );
      } else if (
        sizeStyle.hasOwnProperty('height') &&
        !sizeStyle.hasOwnProperty('width')
      ) {
        console.error(
          'SpinnerMultiColor error: If height set on spinner width need to be set too and it has to be equal value.'
        );
      } else {
        setSpinnerSize(sizeStyle);
      }
    }
    return () => setSpinnerSize({});
  }, [sizeStyle, setSpinnerSize]);

  // additional style for sections --------
  //TOP -----
  const [first, setFirst] = React.useState({
    borderTopColor: 'red',
  });

  React.useEffect(() => {
    if (firstSectionStyle) {
      setFirst({
        ...first,
        ...firstSectionStyle,
      });
    }
    return () =>
      setFirst({
        borderTopColor: 'red',
      });
  }, [setFirst, firstSectionStyle]);

  //LEFT -----
  const [leftS, setSecond] = React.useState({
    borderLeftColor: 'blue',
  });

  React.useEffect(() => {
    if (secondSectionStyle) {
      setSecond({
        ...leftS,
        ...secondSectionStyle,
      });
    }
    return () =>
      setSecond({
        borderLeftColor: 'blue',
      });
  }, [setSecond, secondSectionStyle]);

  //RIGHT -----
  const [rightS, setRightS] = React.useState({
    borderRightColor: 'green',
  });

  React.useEffect(() => {
    if (thirdSectionStyle) {
      setRightS({
        ...rightS,
        ...thirdSectionStyle,
      });
    }
    return () =>
      setRightS({
        borderRightColor: 'green',
      });
  }, [thirdSectionStyle, setRightS]);

  /*
  return (
      <Spinner
          data-testid="container"
          style={spinnerSize ? spinnerSize : undefined}
      >
        <span style={textStyleT ? textStyleT : undefined}>{textT}</span>
        <Spinner_Sector_One
            data-testid="first"
            style={first}
        />
        <Spinner_Sector_Two
            data-testid="second"
            style={leftS}
        />
        <Spinner_Sector_Three
            data-testid="third"
            style={rightS}
        />
      </Spinner>
  );

   */

  return (
    <div
      className={'spinner'}
      data-testid="container"
      style={spinnerSize ? spinnerSize : undefined}
    >
      <span
        style={textStyleT ? textStyleT : undefined}
        className={'spinner-span'}
      >
        {textT}
      </span>
      <div className={'spinner-sector-one'} data-testid="first" style={first} />
      <div
        className={'spinner-sector-two'}
        data-testid="second"
        style={leftS}
      />
      <div
        className={'spinner-sector-three'}
        data-testid="third"
        style={rightS}
      />
    </div>
  );
};
