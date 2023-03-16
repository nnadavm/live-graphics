import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas/Canvas';
import { svgObj } from './components/svg/headLib';
import { ContextProvider } from './components/context/context';
import MyWheelPicker from './components/WheelPicker/WheelPicker';
import { bodyWheel , headWheel , legsWheel }from './components/WheelPicker/WheelData';

function App() {
  const [animal , setAnimal] = useState({
    body: 'sheepBody',
    head: 'sheepHead',
    legs: 'sheepLegs'
  })
  // const [headURL, setHeadURL] = useState('sheepHead');
  // const [bodyURL, setBodyURL] = useState('sheepBody');
  // const [legsURL, setLegsURL] = useState('sheepLegs');
  const [headXY, setHeadXY] = useState(null);
  const [bodyXY, setBodyXY] = useState(null);
  const [legsXY, setLegsXY] = useState(null);
  const [scaledSize, setScaledSize] = useState(null);
  const [counter, setCounter] = useState(0);

  function handleOnClick(e , bodyPart) {
    setAnimal({
      ...animal,
      [bodyPart]: e.target.innerText
    });
  }

  return (
    <ContextProvider value={{ animal, setAnimal , headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize , setScaledSize }}>
      <div className="App">
        <div className='d-flex justify-content-evenly'>
          <MyWheelPicker style={{overflow: 'scroll'}} data={headWheel} target={'head'}/>
          <MyWheelPicker data={bodyWheel} target={'body'}/>
          <MyWheelPicker data={legsWheel} target={'legs'}/>
        </div>
        <Canvas />
      </div>
    </ContextProvider>
  );
}

export default App;
