import React, { useContext, useState , useEffect} from 'react'
import { Context } from '../context/context'

function AnimalNav() {
    const { WheelData , setHeadURL , setBodyURL, setLegsURL } = useContext(Context);
    const [headPos, setHeadPos] = useState(0);

    function handleOnClick(bodyPart) {
        const value = WheelData.headObjArr[headPos + 1].value;
        let cb;
        if (bodyPart === 'head') cb = setHeadURL;
        if (bodyPart === 'body') cb = setBodyURL;
        if (bodyPart === 'legs') cb = setLegsURL;

        cb(value);
        setHeadPos(headPos + 1)
    }

    useEffect(() => {
      setHeadURL(WheelData.headObjArr[headPos].value)
    }, [])
    

    return (
        <div>
            <div>
                <h4>{WheelData.headObjArr[headPos].value}</h4>
                <button onClick={() => handleOnClick('head')}>back</button>
                <button onClick={() => handleOnClick('head')}>next</button>
            </div>
        </div>
    )
}

export default AnimalNav