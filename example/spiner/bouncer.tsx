import './bouncer.css';
import * as React from 'react';

interface Props {
  displayText?: string;
  text?: string;
  textStyle?: {};
  containerStyle?: {};
  bouncerStyle?: {};
}

export const Bouncer: React.FC<Props> = ({
  text: text,
  textStyle: textStyle,
  containerStyle: containerStyle,
  bouncerStyle: bouncerStyle,
  displayText: displayText,
}) => {
  // text --------
  const [textT, setTextT] = React.useState<string>('Loading');

  React.useEffect(() => {
    if (text) {
      setTextT(text);
    }
    return () => setTextT('Loading');
  }, [text]);

  // display text -------
  const [displayT, setDisplayT] = React.useState(true);

  React.useEffect(() => {
    if (displayText && displayText !== 'off') {
      console.error(
        'Bouncer component ERROR: If prop displayText set on component it hase to be a sting type and the value "off", or if you like the text to display just remove the displayText prop.'
      );
    }
    if (displayText === 'off') {
      setDisplayT(false);
    }
    return () => setDisplayT(true);
  }, [displayText]);

  // text additional style --------
  const [textStyleT, setTextStyleT] = React.useState({});

  React.useEffect(() => {
    if (textStyle) {
      setTextStyleT(textStyle);
    }
    return () => setTextStyleT({});
  }, [textStyle]);

  // container additional style --------
  const [containerS, setContainerS] = React.useState({});

  React.useEffect(() => {
    if (containerStyle) {
      setContainerS(containerStyle);
    }
    return () => setContainerS({});
  }, [containerStyle]);

  // bouncer additional style --------
  const [bouncerS, setBouncerS] = React.useState({});

  React.useEffect(() => {
    if (bouncerStyle) {
      setBouncerS(bouncerStyle);
    }
    return () => setBouncerS({});
  }, [bouncerStyle]);

  return (
    <div
      className={'container'}
      style={containerS ? containerS : undefined}
      data-testid="container"
    >
      {displayT ? (
        <span
          className={'text'}
          style={textStyleT ? textStyleT : undefined}
          data-testid={'text'}
        >
          {textT}
        </span>
      ) : null}
      <div className={'bouncer'} data-testid={'bouncer'}>
        <div style={bouncerS ? bouncerS : undefined} data-testid={'1'} />
        <div style={bouncerS ? bouncerS : undefined} data-testid={'2'} />
        <div style={bouncerS ? bouncerS : undefined} data-testid={'3'} />
        <div style={bouncerS ? bouncerS : undefined} data-testid={'4'} />
      </div>
    </div>
  );
};
