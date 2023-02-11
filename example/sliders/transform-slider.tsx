import * as React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
// icons
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FiArrowRightCircle, FiArrowLeftCircle } from 'react-icons/fi';

import * as console from 'console';

export function getMeta(url: string, callback: Function) {
  const img = new Image();
  img.src = url;
  img.onload = function () {
    callback(img.width, img.height);
  };
}

export interface PropIMGQ {
  img_url: string;
  title?: string | null;
  position: number;
}

export interface Prop {
  prop: PropIMGQ[];
  position: number;
  b_color?: string;
  speed?: number;
  arrow?: number;
  arrowDist?: number;
  imgHeight?: number;
  style?: {};
  buttonStyle?: {};
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  titlePosition?: string;
  showTitle?: boolean;
  titleStyle?: {};
}

const Slider = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LeftArrow = styled.div<{ color: string; dist: number }>`
  position: absolute;
  top: 47%;
  left: ${(p) => p.dist}px;
  font-size: 30px;
  color: ${(p) => p.color};
  opacity: 0.75;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
`;

const RightArrow = styled.div<{ color: string; dist: number }>`
  position: absolute;
  top: 47%;
  right: ${(p) => p.dist}px;
  font-size: 30px;
  color: ${(p) => p.color};
  opacity: 0.75;
  z-index: 10;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div<{
  url: string;
  width: number;
  transition: number;
  height: number;
}>`
  backface-visibility: hidden;
  background-image: url('${(p) => p.url}');
  background-repeat: no-repeat;
  background-size: cover;
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
  background-position: center center;
  opacity: 1;
  transition: all ${(p) => p.transition}s 0.2s ease;
  position: relative;
`;

const Title = styled.p`
  text-align: center;
`;

const fadeInTop = keyframes`
0%
{
    opacity: 0;
    transform: translateY(50px);
}
50%
{
    opacity: 0.25;
}
100%
{
    opacity: 1;
    transform: translateY(0px);
}
`;

const fadeInBottom = keyframes`
0%
{
    opacity: 0;
    transform: translateY(-50px);
}
50%
{
    opacity: 0.25;
}
100%
{
    opacity: 1;
    transform: translateY(0px);
}
`;

const TitleContainer = styled.div<{
  transition: number;
  position: string;
}>`
  ${(p) => p.position}: 0;
  animation: ${(p) => (p.position === 'top' ? fadeInTop : fadeInBottom)}
    ${(p) => p.transition / 2}s ease;
  overflow: hidden;
  position: absolute;
  width: 100%;
`;

export const TransformSlider: React.FC<Prop> = ({
  prop: prop,
  position: position,
  b_color: b_color,
  speed: transition,
  arrow: arrowNum,
  arrowDist: arrowDistance,
  imgHeight: imgHeight,
  style: style,
  buttonStyle: buttonStyle,
  autoPlay: autoPlay,
  autoPlaySpeed: autoPlaySpeed,
  titlePosition: titlePosition,
  showTitle: showTitle,
  titleStyle: titleStyle,
}) => {
  // error if img prop list is missing just in case:) ----------
  React.useEffect(() => {
    if (!prop) {
      console.error(
        'TransformSlider component require a array of objects in order to display anything, but this array is missing.'
      );
    }
  }, [prop]);

  // error if position arg is missing just in case:) ----------
  React.useEffect(() => {
    // check if the value provided is in the range
    if (position === 0 || position) {
      console.log(prop.length);
      if (position > prop.length - 1 || position < 0) {
        console.error(
          `TransformSlider component position argument out of range. Value has to be greater than 0 and not greater than the length of the prop array: ${
            prop.length - 1
          }.`
        );
      }
    } else if (!position) {
      console.error(
        'TransformSlider component require a position argument, please provide one or set it to 0 by default.'
      );
    }
  }, [position]);

  // show title ---------
  const [showTitleState, setShowTitleState] = React.useState(false);

  React.useEffect(() => {
    if (showTitle) {
      setShowTitleState(showTitle);
    }
    return () => setShowTitleState(false);
  }, [showTitle]);

  // title position ----------
  const [titlePositionState, setTitlePositionState] = React.useState('top');
  const titlePositionOptions = ['top', 'bottom'];

  React.useEffect(() => {
    console.log(titlePosition);
  }, [titlePosition]);

  React.useEffect(() => {
    if (titlePosition && titlePositionOptions.includes(titlePosition)) {
      setTitlePositionState(titlePosition);
    }
    if (titlePosition && !titlePositionOptions.includes(titlePosition)) {
      console.error(
        `TransformSlider component "titlePosition" prop options: ${titlePositionOptions}. Please select a valid value or your input will be ignored.`
      );
    }
  }, [titlePosition]);

  // auto play images ----------
  const [auto, setAuto] = React.useState(false);
  const [turnOffAuto, setTurnOffAuto] = React.useState(false);
  const [autoPlaySpeedState, setAutoPlaySpeedState] = React.useState(3);
  const autoPlaySpeedRange = [
    1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5,
    2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1,
    4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5,
  ];

  React.useEffect(() => {
    if (autoPlaySpeed && autoPlaySpeedRange.includes(autoPlaySpeed)) {
      setAutoPlaySpeedState(autoPlaySpeed);
    }
    if (autoPlaySpeed && !autoPlaySpeedRange.includes(autoPlaySpeed)) {
      console.error(
        `TransformSlider component "autoPlaySpeed" prop has a limited range of numbers available. The options are:${autoPlaySpeedRange}. Every other value will be ignored and set the timer to its default of 3`
      );
    }
  }, [autoPlaySpeed]);

  React.useEffect(() => {
    // if we have the "autoPlay" prop=true we set the state "auto"
    if (autoPlay) {
      setAuto(autoPlay);
    } else {
      setAuto(false);
    }
    return () => setAuto(false);
  }, [autoPlay]);

  // additional style for title ----------
  const [t_style, setT_style] = React.useState({});

  React.useEffect(() => {
    if (titleStyle) {
      setT_style(titleStyle);
    }
    return () => setT_style({});
  }, [titleStyle]);

  // additional style for buttons ----------
  const [b_style, setB_style] = React.useState({});

  React.useEffect(() => {
    if (buttonStyle) {
      setB_style(buttonStyle);
    }
    return () => setB_style({});
  }, [buttonStyle]);

  // additional style for image, height and width can not be edited true this prop, will be removed from object! ----------
  const [imgStyle, setImgStyle] = React.useState({});

  React.useEffect(() => {
    if (style) {
      if ('height' in style || 'width' in style) {
        console.error(
          'TransformSlider component image height and width property can not be edited with inline style. To edit the image height and ratio please use the imgHeight parameter.'
        );
        if ('height' in style) {
          delete style['height'];
        }
        if ('width' in style) {
          delete style['width'];
        }
        setImgStyle(style);
      } else {
        setImgStyle(style);
      }
    }
    return () => setImgStyle({});
  }, [style]);

  // image height and ratio ----------
  const [height, setHeight] = React.useState(500);

  React.useEffect(() => {
    if (imgHeight) {
      setHeight(imgHeight);
    }
    return () => setHeight(500);
  }, [imgHeight]);

  const [next, setNext] = React.useState(0);
  const [updated, setUpdated] = React.useState(false);
  const length = prop.length;

  // auto play image IF!!! Listening to the "next" img state is what re trigger this useEffect!
  React.useEffect(() => {
    /*
    if a=f + to=f = arrow
    if a=t + to=f = auto  <-- only time its auto play if autoPay prop set true and user didnt press any buttons
    if a=t + to=t = arrow
    if a=f + to=t = arrow
     */
    let next;
    if (auto && !turnOffAuto) {
      next = setInterval(autoNext, autoPlaySpeedState * 1000);
    } else {
      if (next) {
        clearInterval(next);
      }
    }
    return () => clearInterval(next);
  }, [auto, setAuto, turnOffAuto, next, autoPlaySpeedState]);

  // set arrow distance ----------
  const [arrowD, setArrowD] = React.useState(25);
  const arrowDistanceList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  React.useEffect(() => {
    if (arrowDistance && arrowDistanceList.includes(arrowDistance)) {
      setArrowD(arrowDistance);
    }
    if (arrowDistance && !arrowDistanceList.includes(arrowDistance)) {
      console.error(
        `TransformSlider component has a limited amount of options for editing the arrow distance form the edge of the container. The options are: ${arrowDistanceList}`
      );
    }
    return () => setArrowD(25);
  }, [arrowDistance]);

  // set arrow option ----------
  const [arrow, setArrow] = React.useState(0);
  const arrowList = [0, 1, 2, 3];
  const [leftArrow, setLeftArrow] = React.useState(<FaArrowAltCircleLeft />);
  const [rightArrow, setRightArrow] = React.useState(<FaArrowAltCircleRight />);

  React.useEffect(() => {
    if (arrowNum && arrowList.includes(arrowNum)) {
      setArrow(arrowNum);
    }
    if (arrowNum && !arrowList.includes(arrowNum)) {
      console.error(
        `TransformSlider component has a limited amount of options to pick from ${arrowList}. But the number selected is not in this list.`
      );
    }
    return () => setArrow(0);
  }, [arrowNum]);

  React.useEffect(() => {
    if (arrow === 0) {
      setLeftArrow(<FaArrowAltCircleLeft />);
      setRightArrow(<FaArrowAltCircleRight />);
    } else if (arrow === 1) {
      setLeftArrow(<FaArrowCircleLeft />);
      setRightArrow(<FaArrowCircleRight />);
    } else if (arrow === 2) {
      setLeftArrow(<FiArrowLeft />);
      setRightArrow(<FiArrowRight />);
    } else if (arrow === 3) {
      setLeftArrow(<FiArrowLeftCircle />);
      setRightArrow(<FiArrowRightCircle />);
    }
  }, [arrow]);

  // button colour ----------
  const [color, setColor] = React.useState('#7bcb7e');

  React.useEffect(() => {
    if (b_color) {
      setColor(b_color);
    }
    return () => setColor('#7bcb7e');
  }, [b_color]);

  // transition speed ----------
  const [trans, setTrans] = React.useState(1);
  const speedLimit = [
    0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8,
    1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3,
  ];

  React.useEffect(() => {
    if (transition && speedLimit.includes(transition)) {
      setTrans(transition);
    }
    if (transition && !speedLimit.includes(transition)) {
      console.error(
        `TransformSlider component speed limit is excited. The range is ${speedLimit}. Please change the value to a number from this range.`
      );
    }
    return () => setTrans(1);
  }, [transition]);

  React.useEffect(() => {
    //console.log(next);
  }, [next]);

  // disable button while transition is animating. Use the "trans" state to time how long the button get disabled! ----------
  const [buttonDisable, setButtonDisable] = React.useState(true);

  const ResetButtonDisable = () => {
    setButtonDisable(true);
  };

  //size image ----------
  const [w, setW] = React.useState(0);
  const [h, setH] = React.useState(0);
  const [ratio, setRatio] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    for (let i of prop) {
      if (i.position === next) {
        getMeta(prop[next].img_url, (width: number, height: number) => {
          setW(width);
          setH(height);
        });
      }
    }
  }, [next, prop]);

  React.useEffect(() => {
    //console.log(w,h)
    setRatio(h / height);
  }, [w, h]);

  React.useEffect(() => {
    //console.log(w/ratio)
    if (ratio !== 0) {
      setLoaded(true);
    }
    return () => setLoaded(false);
  }, [ratio]);

  React.useEffect(() => {
    setNext(position);
    setUpdated(true);
    return () => {
      setNext(0);
      setUpdated(false);
    };
  }, [position]);

  // functions for slide image ----------
  const nextSlide = React.useCallback(
    (tranTime: number) => {
      // turn of auto play if not off
      if (!turnOffAuto) {
        setTurnOffAuto(true);
      }
      // disable button
      setButtonDisable(false);
      // make a slide
      setNext(next === length - 1 ? 0 : next + 1);
      // the time out extended with 2 m sec to make sure the button can not be pressed just when the transition is ended!
      const buttonTimeout = setTimeout(ResetButtonDisable, tranTime * 1300);
      return () => {
        setNext(0);
        setUpdated(false);
        clearTimeout(buttonTimeout);
      };
    },
    [next, length, turnOffAuto, setTurnOffAuto]
  );

  const prevSlide = React.useCallback(
    (tranTime: number) => {
      // turn of auto play if not off
      if (!turnOffAuto) {
        setTurnOffAuto(true);
      }
      // disable button
      setButtonDisable(false);
      // make a slide
      setNext(next === 0 ? length - 1 : next - 1);
      // the time out extended with 2 m sec to make sure the button can not be pressed just when the transition is ended!
      const buttonTimeout = setTimeout(ResetButtonDisable, tranTime * 1300);
      return () => {
        setNext(0);
        setUpdated(false);
        clearTimeout(buttonTimeout);
      };
    },
    [next, length, turnOffAuto, setTurnOffAuto]
  );

  const autoNext = React.useCallback(() => {
    // make a slide
    setNext(next === length - 1 ? 0 : next + 1);
    return () => {
      setNext(0);
      setUpdated(false);
    };
  }, [next, length]);

  // braking error state --------
  const [breakingError, setBreakingError] = React.useState('');

  // not allow the "autoPlaySpeed" to be faster or equal to the transition time of the image ---------
  // 2^3 = 8 There are 8 possible combination
  //-----------------------------------------
  // 1: !!! speed + autoPlay + autoPlaySpeed = All value set. But IF autoPlaySpeed is not greater than speed with minimum of 0.5s the animation will break. Show ERROR and require correcting action.
  // 2: !!! speed + autoPlay = Value set on animation speed and autoPlay is on. In this case the speed hase to be lower than the default autoplay speed with 0.5s or we need to set greater autoPlaySpeed then the speed specified.
  // 3: speed + autoPlaySpeed = Value set on speed and autoPlaySpeed. Speed value is used in animation and button ignore but other value is not used at all as long as the autoPlay is OFF.
  // 4: !!! autoPlay + autoPlaySpeed = Value set, auto play on and auto play speed set too but IF autoPlaySpeed is not greater than the default transition speed with 0.6 sec it will break transition animation. So we show ERROR and require correcting action.
  // 5: autoPlay = Value set and auto play ON and use default value for speed and auto play speed
  // 6: speed = Value set and used for image transition + button disable
  // 7: autoPlaySpeed = Value set but never used...
  // 8: none = Default value
  //------------------------------------------
  React.useEffect(() => {
    if (transition && autoPlaySpeed && autoPlay) {
      // 1 Can be breaking condition
      if (autoPlaySpeed <= transition + 0.5) {
        setBreakingError(
          'BREAKING ERROR! If speed, autoPlay, autoPlaySpeed set as prop. autoPlaySpeed hase to be greater than speed with minimum of 0.6s or animation will break.'
        );
        console.error(
          `TransformSlider component : BREAKING ERROR! If speed, autoPlay, autoPlaySpeed set as prop. autoPlaySpeed hase to be greater than speed with minimum of 0.6s or animation will break.`
        );
      }
    } else if (transition && autoPlay) {
      // 2 Can be breaking condition
      if (transition + 0.5 >= autoPlaySpeedState) {
        setBreakingError(
          'BREAKING ERROR! If speed and autoPlay set as prop. The speed can not be greater then the autoPlay default value (3s). It needs a 0.5s gap so speed has to be 0.6s slower the the default autoPlaySpeed, or set an autoPaySpeed as a prop and make sure its value is minimum 0.6s greater then the speed set.'
        );
        console.error(
          `TransformSlider component : BREAKING ERROR! If speed and autoPlay set as prop. The speed can not be greater then the autoPlay default value (3s). It needs a 0.5s gap so speed has to be 0.6s slower the the default autoPlaySpeed, or set an autoPaySpeed as a prop and make sure its value is minimum 0.6s greater then the speed set.`
        );
      }
    } else if (autoPlay && autoPlaySpeed) {
      // 4 Can be breaking condition
      if (autoPlaySpeed <= trans + 0.5) {
        setBreakingError(
          'BREAKING ERROR! If autoPlay and autoPlaySpeed set. But autoPaySpeed is not greater than the default speed (1s), the animation will be broken. Please change the autoPlaySpeed to minimum of 1.6s or add a speed prop to the component. That is minimum 0.6s greater than the autoPlaySpeed.'
        );
        console.error(
          `TransformSlider component : BREAKING ERROR! If autoPlay and autoPlaySpeed set. But autoPaySpeed is not greater than the default speed (1s), the animation will be broken. Please change the autoPlaySpeed to minimum of 1.6s or add a speed prop to the component. That is minimum 0.6s greater than the autoPlaySpeed.`
        );
      }
    }
  }, [transition, autoPlaySpeed, trans, autoPlay, autoPlaySpeedState]);

  return (
    <>
      {breakingError ? (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'red' }}>{breakingError}</span>
          </div>
        </>
      ) : (
        <>
          {updated ? (
            <>
              <Slider>
                {buttonDisable ? (
                  <>
                    <LeftArrow
                      onClick={() => prevSlide(trans)}
                      color={color}
                      dist={arrowD}
                      style={b_style}
                    >
                      {leftArrow}
                    </LeftArrow>
                    <RightArrow
                      onClick={() => nextSlide(trans)}
                      color={color}
                      dist={arrowD}
                      style={b_style}
                    >
                      {rightArrow}
                    </RightArrow>
                  </>
                ) : (
                  <>
                    <LeftArrow color={color} dist={arrowD} style={b_style}>
                      {leftArrow}
                    </LeftArrow>
                    <RightArrow color={color} dist={arrowD} style={b_style}>
                      {rightArrow}
                    </RightArrow>
                  </>
                )}
                {loaded ? (
                  <ImageContainer
                    url={prop[next].img_url}
                    width={w / ratio}
                    transition={trans}
                    height={height}
                    style={imgStyle}
                  >
                    {showTitleState ? (
                      <>
                        <TitleContainer
                          key={prop[next].title ? prop[next].title : null}
                          transition={trans}
                          position={titlePositionState}
                        >
                          <Title style={t_style}>
                            {prop[next].title ? prop[next].title : null}
                          </Title>
                        </TitleContainer>
                      </>
                    ) : null}
                  </ImageContainer>
                ) : null}
              </Slider>
            </>
          ) : (
            <>
              <h2 style={{ textAlign: 'center' }}>
                ERROR! Can not display the images.
              </h2>
            </>
          )}
        </>
      )}
    </>
  );
};
