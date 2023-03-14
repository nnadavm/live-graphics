import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg';
import BodySVG from '../BodySVG/BodySVG';
import LegsComponent from '../LegsComponent/LegsComponent';
import svg from '../svg/sheepBody.svg';
import HeadSVG from '../HeadSVG/HeadSVG';
import { Context } from '../context/context';
import sheepHead from "../svg/sheepHead.svg"
import sheepBody from "../svg/sheepBody.svg"
import sheep from "../svg/sheep.svg"

function Canvas() {
    const { headURL, setHeadURL, bodyURL, setBodyURL, legsURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize, setScaledSize } = useContext(Context);
    const [displayWidth, setDisplayWidth] = useState(500);
    const [headCounter, setHeadCounter] = useState(0)

    function handleClear() {
        setHeadURL(null);
        setBodyURL(null);
        setHeadXY(null);
        setBodyXY(null);
        setLegsURL(null);
        setLegsXY(null);
        setCounter(0);
    }

    function calcCombineHead() {
        console.log('calcCombineHead')
        const ratio = bodyXY.lineLength / headXY.lineLength;
        const newHeadheight = headXY.height * ratio;
        const newHeadWidth = headXY.aspectRatio * newHeadheight;
        const totalWidth = newHeadWidth + Number(bodyXY.width);
        const fitRatio = displayWidth / totalWidth;
        const bodyFitWidth = bodyXY.width * fitRatio;
        const headFitWidth = newHeadWidth * fitRatio;
        const alignOrigin = (- Number(bodyXY.height) + Number(headXY.height * ratio)) * fitRatio;
        const offsetYNoOrigin = (bodyXY.y1 - (headXY.y1 * ratio)) * fitRatio;
        const offsetY = alignOrigin + offsetYNoOrigin;

        const res = {
            ...scaledSize,
            bodyFitWidth,
            headFitWidth,
            offsetY,
            fitRatio
        }
        setHeadCounter(headCounter + 1);
        setScaledSize(res)
    }

    function calcCombineLegs() {
        console.log('calcCombineLegs')
        const ratio = bodyXY.rectWidth > legsXY.lineLength ? legsXY.lineLength / bodyXY.rectWidth : bodyXY.rectWidth / legsXY.lineLength;
        const bodyRatio = displayWidth / bodyXY.width;
        // const newLegsWidth = bodyXY.rectWidth * bodyRatio;
        const newLegsWidth = legsXY.lineLength * ratio;
        const offsetX = bodyXY.rectX * ratio;
        const res = {
            ...scaledSize,
            newLegsWidth,
            offsetX
        }

        setScaledSize(res);
    }

    function calcCombineLegsWithHead() {
        console.log('calcCombineLegsWithHead')
        const scaledRectWidth = bodyXY.rectWidth * scaledSize.fitRatio;
        const newLegsWidth = scaledRectWidth;
        const offsetX = (bodyXY.rectX * scaledSize.fitRatio) + scaledSize.headFitWidth;
        const res = {
            ...scaledSize,
            newLegsWidth,
            offsetX
        }
        setScaledSize(res)
    }

    function clearObj() {
        setScaledSize({});
    }

    useEffect(() => {
        if (legsXY && !headXY) {
            clearObj();
            calcCombineLegs();
        }
        if (headXY && !legsXY) {
            clearObj();
            calcCombineHead()
        }
        if (legsXY && headXY) {
            clearObj();
            calcCombineHead()
            calcCombineLegsWithHead();
        }
    }, [bodyXY])

    useEffect(() => {
        if (bodyXY && !legsXY) {
            calcCombineHead()
        }
        if (bodyXY && legsXY) {
            calcCombineHead()
        }
    }, [headXY])

    useEffect(() => {
        if (bodyXY && legsXY) {
            console.log('counter');
            calcCombineLegsWithHead();
        }
    }, [headCounter])

    useEffect(() => {
        if (bodyXY && !headXY) {
            calcCombineLegs();
        }
        if (bodyXY && headXY) {
            calcCombineLegsWithHead();
        }
    }, [legsXY])

    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center' onClick={handleClear} style={
                {
                    width: '100vw',
                    height: '100vh',
                }}>
                <div className='d-flex flex-column' style={{}}>
                    <div className='d-flex align-items-end' style={{
                        width: `${displayWidth}px`,
                        // border: 'solid 2px blue',
                    }}>
                        {headURL && <HeadSVG />}
                        {bodyURL && <BodySVG />}
                    </div>
                    {legsURL && <LegsComponent />}
                </div>
            </div>
        </>
    )
}

export default Canvas
