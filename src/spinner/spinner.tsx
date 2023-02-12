import * as React from 'react';
import './spinner.css';

// Tested: text, textStyle, sizeStyle,
export interface Props {
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

  return (
    <div
      className={'spinner'}
      data-testid="container"
      style={spinnerSize ? spinnerSize : undefined}
    >
      <span style={textStyleT ? textStyleT : undefined}>{textT}</span>
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