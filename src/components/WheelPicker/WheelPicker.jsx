import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context/context';
import WheelPicker from 'react-simple-wheel-picker';
import debounce from 'lodash.debounce';

function MyWheelPicker({ data, target }) {
  const { headURL, bodyURL, legsURL, setHeadURL, setBodyURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize, setScaledSize , svgData} = useContext(Context);

  function handleOnChange(e, bodyPart) {
    const value = e.value;
    let cb;
    if (bodyPart==='head') cb = setHeadURL;
    if (bodyPart==='body') cb = setBodyURL;
    if (bodyPart==='legs') cb = setLegsURL;
    // use debounce to create a debounced version of setAnimal
    const debouncedSetAnimal = debounce(testFunc, 300);
    debouncedSetAnimal(cb, value);
  }

  function testFunc(cb, value) {
    cb(value);
  }

  return (
    <WheelPicker
      data={data}
      onChange={(e) => handleOnChange(e , target)}
      height={150}
      width={200}
      titleText="Enter value same as aria-label"
      itemHeight={60}
      selectedID={data[0].id}
      color="#ccc"
      activeColor="#333"
      backgroundColor="#fff"
      shadowColor='false'
      fontSize='18px'
    />
  )
}

export default MyWheelPicker