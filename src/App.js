import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas/Canvas';
import { svgObj } from './components/svg/svgLib';


function App() {
  const [isHead, setIsHead] = useState(false);
  const [isBody, setIsBody] = useState(false);
  const [headLineXY, setHeadLineXY] = useState(null);

  function getXY(e) {
    setTimeout(() => {
      const path = e.target.parentElement.parentElement.childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes[3];
      console.log(path);
      const x1 = path.x1.baseVal.value;
      const x2 = path.x2.baseVal.value;
      const y1 = path.y1.baseVal.value;
      const y2 = path.y2.baseVal.value;
      const headLineXYObj = {
        x1,
        x2,
        y1,
        y2
      };
      setHeadLineXY(headLineXYObj);
    }, 500);
  }

  function handleOnHeadClick(e) {
    setIsHead(true);
    getXY(e)
  }

  function handleOnBodyClick(e) {
    setIsBody(true);
  }


  return (
    <div className="App">
      <div>
        <button onClick={handleOnHeadClick}>Head</button>
        <button onClick={handleOnBodyClick}>Body</button>
      </div>
      <Canvas isHead={isHead} isBody={isBody} headLineXY={headLineXY} />
    </div>
  );
}

export default App;
