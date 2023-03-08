import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas/Canvas';
import { svgObj } from './components/svg/headLib';
import { ContextProvider } from './components/context/context';


function App() {
  const [isHead, setIsHead] = useState(false);
  const [isBody, setIsBody] = useState(false);
  const [headXY, setHeadXY] = useState(null);
  const [bodyXY, setBodyXY] = useState(null);

  function handleOnHeadClick(e) {
    setIsHead(e.target.innerText);
  }

  function handleOnBodyClick(e) {
    setIsBody(e.target.innerText);
  }

  return (
    <ContextProvider value={{ isHead, isBody, headXY, setHeadXY, bodyXY, setBodyXY }}>
      <div className="App">
        <div className='d-flex justify-content-between'>
          <div>
            <button onClick={handleOnHeadClick}>sheepHead</button>
            <button onClick={handleOnHeadClick}>foxHead</button>
          </div>
          <div>
            <button onClick={handleOnBodyClick}>sheepBody</button>
            <button onClick={handleOnBodyClick}>foxBody</button>
          </div>
        </div>
        <Canvas />
      </div>
    </ContextProvider>
  );
}

export default App;
