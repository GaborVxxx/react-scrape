import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
//import {Thing} from "../src/";

//TransformSlider
import { TransformSlider } from './sliders/transform-slider';
import { TransformSliderData } from './sliders/placeholder-data';

//TODO:  find out why the parcel is not working and update the app when componnet chnages...
//TODO: Its rendering from its own folder but not from the other folder

const App = () => {
  return (
    <div style={{ width: '100%', height: window.innerHeight }}>
      <TransformSlider
        prop={TransformSliderData}
        position={0}
        b_color={'blue'}
        speed={1}
        arrow={1}
        arrowDist={20}
        imgHeight={500}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
