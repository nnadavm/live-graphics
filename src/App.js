import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas/Canvas';
import { svgObj } from './components/svg/headLib';
import { ContextProvider } from './components/context/context';


function App() {
  const [headURL, setHeadURL] = useState(null);
  const [bodyURL, setBodyURL] = useState(null);
  const [legsURL, setLegsURL] = useState(null);
  const [headXY, setHeadXY] = useState(null);
  const [bodyXY, setBodyXY] = useState(null);
  const [legsXY, setLegsXY] = useState(null);
  const [counter, setCounter] = useState(0);

  function handleOnHeadClick(e) {
    setHeadURL(e.target.innerText);
    setCounter(counter + 1);
  }

  function handleOnBodyClick(e) {
    setBodyURL(e.target.innerText);
    setCounter(counter + 1);
  }

  function handleOnLegsClick(e) {
    setLegsURL(e.target.innerText);
    setCounter(counter + 1);
  }

  return (
    <ContextProvider value={{ headURL, setHeadURL, bodyURL, setBodyURL, legsURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter }}>
      <div className="App">
        <div className='d-flex justify-content-between'>
          <div>
            <button onClick={handleOnHeadClick}>sheepHead</button>
            <button onClick={handleOnHeadClick}>foxHead</button>
            <button onClick={handleOnHeadClick}>pingHead</button>
            <button onClick={handleOnHeadClick}>sharkHead</button>
          </div>
          <div>
            <button onClick={handleOnBodyClick}>sheepBody</button>
            <button onClick={handleOnBodyClick}>foxBody</button>
            <button onClick={handleOnBodyClick}>pingBody</button>
            <button onClick={handleOnBodyClick}>sharkBody</button>
          </div>
          <div>
            <button onClick={handleOnLegsClick}>sheepLegs</button>
          </div>
        </div>
        <Canvas />
      </div>
    </ContextProvider>
  );
}

export default App;
