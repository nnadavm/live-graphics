import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas/Canvas';
import { svgObj } from './components/svg/svgLib';
import { ContextProvider } from './components/context/context';


function App() {
  const [isHead, setIsHead] = useState(false);
  const [isBody, setIsBody] = useState(false);
  const [headXY, setHeadXY] = useState(null);
  const [bodyXY, setBodyXY] = useState(null);

  function handleOnHeadClick(e) {
    setIsHead(true);
  }

  function handleOnBodyClick(e) {
    setIsBody(true);
  }

  return (
    <ContextProvider value={{isHead, isBody, headXY , setHeadXY , bodyXY, setBodyXY}}>
      <div className="App">
        <div>
          <button onClick={handleOnHeadClick}>Head</button>
          <button onClick={handleOnBodyClick}>Body</button>
        </div>
        <Canvas isHead={isHead} isBody={isBody} headXY={headXY} />
      </div>
    </ContextProvider>
  );
}

export default App;
