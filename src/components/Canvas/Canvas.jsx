import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg';
import BodySVG from '../BodySVG/BodySVG';
import svg from '../svg/sheepBody.svg';
import HeadSVG from '../HeadSVG/HeadSVG';
import { Context } from '../context/context';
import sheepHead from "../svg/sheepHead.svg"
import sheepBody from "../svg/sheepBody.svg"
import sheep from "../svg/sheep.svg"

function Canvas() {
    const { headURL, setHeadURL, bodyURL, setBodyURL, headXY, setHeadXY, bodyXY, setBodyXY, counter, setCounter } = useContext(Context);
    const [canvasWidth , setCanvasWidth] = useState(500);

    function handleClear() {
        setHeadURL(null);
        setBodyURL(null);
        setHeadXY(null);
        setBodyXY(null);
        setCounter(0);
    }

    // maxWidth = 500px;
    // headheight(headWidth * 1.14) * 0.27 = bodyHeight (bodyWidth / 1.7)
    // headWidth + bodyWidth = 500px;

    // (headWidth * 1.14) * 0.27 = (bodyWidth / 1.7)
    // headWidth + bodyWidth = 500px;

    // bodyWidth = 500px - headWidth
    // (headWidth * 1.14) * 0.27 = (500px - headWidth) / 1.7


    // body width="454" height="267"
    // bodyaspcet ratio = 1.7

    // head width="291" height="334
    // head aspcet ration 
    return (
        <div className='d-flex justify-content-center align-items-center' onClick={handleClear} style={
            {
                // border: 'solid 5px green',
                width: '100vw',
                height: '100vh',
                // position: 'absolute',

            }}>
            <div className='d-flex' style={{
                width: '500px',
                border: 'solid 2px blue',
                // position: 'relative',
                // left: bodyXY && headXY ? `${(headXY.x1 - (headXY.ratio * headXY.x1)) / -2}px` : 1,
                // top: bodyXY && headXY ? `${headXY.y1 / 2}px` : 0,

            }}>
                {headURL && <HeadSVG />}
                {bodyURL && <BodySVG />}
            </div>
        </div>
    )
}

export default Canvas
