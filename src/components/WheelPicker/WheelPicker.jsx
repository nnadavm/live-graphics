import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context/context';
import WheelPicker from 'react-simple-wheel-picker';
import debounce from 'lodash.debounce';

function MyWheelPicker({ data, target }) {
  const { animal, setAnimal } = useContext(Context);

  // function handleOnChange(e, bodyPart) {
  //   setAnimal({
  //     ...animal,
  //     [bodyPart]: e.value
  //   });
  // }
  function handleOnChange(e, bodyPart) {
    const value = e.value;
    console.log(value);
    // use debounce to create a debounced version of setAnimal
    const debouncedSetAnimal = debounce(setAnimal, 500);
    debouncedSetAnimal({
      ...animal,
      [bodyPart]: value
    });
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