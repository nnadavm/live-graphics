import React, { useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg';
import SingleSVG from '../SingleSVG/SingleSVG';
import svg from '../svg/sheepBody.svg';
import SvgHead from '../SvgHead/SvgHead';

function Canvas({ isHead, isBody , headLineXY}) {
    const [headXY, setHeadXY] = useState('')

    // useEffect(() => {
    //   console.log(headLineXY);
    // }, [])


    return (
        <div style={
            {
                border: 'solid 2px green',
                position: 'absolute'
            }}>
            {isHead && <SvgHead isHead={isHead} />}
            {isBody && <SingleSVG isBody={isBody} headLineXY={headLineXY} />}
        </div>
    )
}

export default Canvas