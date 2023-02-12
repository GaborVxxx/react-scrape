import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
//import {Thing} from "../src/";

//TransformSlider
import { TransformSlider } from './sliders/transform-slider';
import {
  TransformSliderData,
  TransformSliderData2,
} from './sliders/placeholder-data';

import { SpinnerMultiColor } from './spiner/spiners';

import useImagePreloader from './hooks/preload-image-hook';
import * as console from 'console';

const App = () => {
  const list: string[] = [];
  for (let i of TransformSliderData) {
    list.push(i.img_url);
  }

  const { imagesPreloaded } = useImagePreloader(list);

  if (!imagesPreloaded) {
    //console.log('Loading')
  }
  if (imagesPreloaded) {
    //console.log('Done')
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          height: window.innerHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SpinnerMultiColor
          textStyle={{ fontSize: '1rem' }}
          text={'Test'}
          sizeStyle={{ height: '110px', width: '110px' }}
          firstSectionStyle={{ borderTopColor: 'gray' }}
          secondSectionStyle={{ borderLeftColor: 'yellow' }}
          thirdSectionStyle={{ borderRightColor: 'black' }}
        />
      </div>
    </>
  );

  /*---------------------------------------------------------------------------
    // TransformSlider with preloading images
  return (
    <div style={{ width: '100%', height: window.innerHeight }}>
        {
            imagesPreloaded ?
                <>
                    <TransformSlider
                        prop={TransformSliderData}
                        position={0}
                        b_color={'red'}
                        speed={2}
                        arrow={2}
                        arrowDist={20}
                        imgHeight={500}
                        style={{ borderRadius: '10px' }}
                        buttonStyle={{ opacity: 0.5 }}
                        autoPlay={true}
                        autoPlaySpeed={2.6}
                        titlePosition={'bottom'}
                        showTitle={true}
                        titleStyle={{color:'red', fontSize:25}}
                    />
                </>
                :
                <>
                    Loading...
                </>
        }
    </div>
  );

     */

  /*-------------------------------------------------------------------------
    // TransformSlider with no loading
  return (
    <div style={{ width: '100%', height: window.innerHeight }}>
      <TransformSlider
        prop={TransformSliderData}
        position={0}
        b_color={'red'}
        speed={2}
        arrow={2}
        arrowDist={20}
        imgHeight={500}
        style={{ borderRadius: '10px' }}
        buttonStyle={{ opacity: 0.5 }}
        autoPlay={true}
        autoPlaySpeed={2.6}
        titlePosition={'bottom'}
        showTitle={true}
        titleStyle={{ color: 'red', fontSize: 25 }}
      />
    </div>
  );

     */
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
