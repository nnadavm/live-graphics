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
    const { animal, setAnimal, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize, setScaledSize } = useContext(Context);
    const [displayWidth, setDisplayWidth] = useState(500);
    const [headCounter, setHeadCounter] = useState(0)

    function combineHead() {
        console.log('combineHead')
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

    function combineLegs() {
        const currentBodyRectWidth = bodyXY.rectWidth * scaledSize.fitRatio;
        const legsRatio = legsXY.lineLength > currentBodyRectWidth ? currentBodyRectWidth / legsXY.lineLength : legsXY.lineLength / currentBodyRectWidth;
        const newLegsWidth = legsXY.width > currentBodyRectWidth ? legsXY.width * legsRatio : legsXY.width / legsRatio ;
        const offsetMargin = (legsXY.width - legsXY.x2) * legsRatio;
        const offsetX = ((bodyXY.width - (bodyXY.rectX + bodyXY.rectWidth)) * scaledSize.fitRatio) - offsetMargin;
        // const offsetX = (bodyXY.rectX * scaledSize.fitRatio) + scaledSize.headFitWidth - legsXY.x1;
        const res = {
            ...scaledSize,
            currentBodyRectWidth,
            offsetX,
            newLegsWidth
        }
        setScaledSize(res)
    }

    useEffect(() => {
        if (bodyXY) {
            combineHead();
        }
    }, [bodyXY])

    useEffect(() => {
        if (headXY) {
            combineLegs();
        }
    }, [headCounter])

    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center'
                style={{
                    width: '100vw',
                    height: '80vh',
                }}>
                <div className='d-flex flex-column align-items-end'>
                    <div className='d-flex align-items-end' style={{
                        width: `${displayWidth}px`,
                        // border: 'solid 2px blue',
                    }}>
                        <HeadSVG />
                        <BodySVG />
                    </div>
                    <LegsComponent />
                </div>
            </div>
        </>
    )
}

export default Canvas
