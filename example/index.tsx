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

import useImagePreloader from './hooks/preload-image-hook';
import * as console from 'console';

//TODO: find out why the parcel is not working and update the app when componnet chnages...
//TODO: Its rendering from its own folder but not from the other folder

const App = () => {
  //TODO: fix useImagePreloader
  //TODO: fix in all case auto play speed has to be grater than speed!
  /*
    const list: string[] = []
    for(let i of TransformSliderData){
        list.push(i.img_url)
    }

    const { imagesPreloaded } = useImagePreloader(list)

    if (!imagesPreloaded) {
        console.log('Loading')
    }
    if (imagesPreloaded) {
        console.log('Done')
    }

    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (imagesPreloaded) {
            setLoading(true)
        }
        return () => setLoading(false)
    },[imagesPreloaded,setLoading])

  return (
    <div style={{ width: '100%', height: window.innerHeight }}>
        {
            loading ?
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
                        autoPlaySpeed={2}
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
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
