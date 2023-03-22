import React, { useState, useEffect } from 'react'
import './App.css';
import Canvas from './components/Canvas/Canvas';
import { ContextProvider } from './components/context/context';
import MyWheelPicker from './components/WheelPicker/WheelPicker';
import { bodyWheel, headWheel, legsWheel } from './components/WheelPicker/WheelData';
import SvgLoader from './components/svg/SvgLoader';
import AnimalNav from './components/AnimalNav/AnimalNav';

function App() {
  const [headURL, setHeadURL] = useState('sheepHead');
  const [bodyURL, setBodyURL] = useState('sheepBody');
  const [legsURL, setLegsURL] = useState('sheepLegs');
  const [headXY, setHeadXY] = useState(null);
  const [bodyXY, setBodyXY] = useState(null);
  const [legsXY, setLegsXY] = useState(null);
  const [scaledSize, setScaledSize] = useState(null);
  const [svgData, setSvgData] = useState(null);
  const [WheelData, setWheelData] = useState(null);

  useEffect(() => {
  }, [])

  return (
    <ContextProvider value={{ headURL, bodyURL, legsURL, setHeadURL, setBodyURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, scaledSize, setScaledSize, setSvgData, svgData, WheelData, setWheelData }}>
      <div className="App">
        <div className='d-flex justify-content-evenly'>
          <SvgLoader />
          {WheelData ?
            <div>
              <AnimalNav/>
              <MyWheelPicker data={WheelData.headObjArr} target={'head'} />
              <MyWheelPicker data={WheelData.bodyObjArr} target={'body'} />
              <MyWheelPicker data={WheelData.legsObjArr} target={'legs'} />
            </div>
            : ''}
        </div>
        {svgData ? <Canvas /> : ''}
      </div>
    </ContextProvider>
  );
}

export default App;
