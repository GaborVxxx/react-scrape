import * as React from 'react';
import styled from 'styled-components';
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
  title: string;
  desc: string | null;
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
}

const Slider = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
`;

export const TransformSlider: React.FC<Prop> = ({
  prop: prop,
  position: position,
  b_color: b_color,
  speed: transition,
  arrow: arrowNum,
  arrowDist: arrowDistance,
  imgHeight: imgHeight,
}) => {
  // error if img prop list is missing just in case:)
  React.useEffect(() => {
    if (!prop) {
      console.error(
        'TransformSlider component require a array of objects in order to display anything, but this array is missing.'
      );
    }
  }, [prop]);

  // error if position arg is missing just in case:)
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

  // image height and ratio
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

  // set arrow distance
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

  // set arrow option
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

  // button colour
  const [color, setColor] = React.useState('#7bcb7e');

  React.useEffect(() => {
    if (b_color) {
      setColor(b_color);
    }
    return () => setColor('#7bcb7e');
  }, [b_color]);

  // transition speed
  const [trans, setTrans] = React.useState(1);
  const speedLimit = [
    0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2,
    2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3,
  ];

  React.useEffect(() => {
    if (transition && speedLimit.includes(transition)) {
      setTrans(transition);
    }
    if (transition && !speedLimit.includes(transition)) {
      console.error(
        'TransformSlider component speed limit is excited. The range is 0.5 - 3. Please change the value to a number from this range.'
      );
    }
    return () => setTrans(1);
  }, [transition]);

  React.useEffect(() => {
    console.log(next);
  }, [next]);

  //size image
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

  const nextSlide = React.useCallback(() => {
    setNext(next === length - 1 ? 0 : next + 1);
    return () => {
      setNext(0);
      setUpdated(false);
    };
  }, [next, length]);

  const prevSlide = React.useCallback(() => {
    setNext(next === 0 ? length - 1 : next - 1);
    return () => {
      setNext(0);
      setUpdated(false);
    };
  }, [next, length]);

  return (
    <>
      {updated ? (
        <>
          <Slider>
            <LeftArrow onClick={prevSlide} color={color} dist={arrowD}>
              {leftArrow}
            </LeftArrow>
            <RightArrow onClick={nextSlide} color={color} dist={arrowD}>
              {rightArrow}
            </RightArrow>
            {loaded ? (
              <ImageContainer
                url={prop[next].img_url}
                width={w / ratio}
                transition={trans}
                height={height}
              />
            ) : null}
          </Slider>
        </>
      ) : (
        <>
          <h2>ERROR! Can not display the images please reload the page.</h2>
        </>
      )}
    </>
  );
};
