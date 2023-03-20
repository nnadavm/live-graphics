import React, { useState, useEffect, useContext } from 'react'
import BodySVG from '../BodySVG/BodySVG';
import LegsComponent from '../LegsComponent/LegsComponent';
import HeadSVG from '../HeadSVG/HeadSVG';
import { Context } from '../context/context';

function Canvas() {
    const { headXY, bodyXY, legsXY, scaledSize, setScaledSize } = useContext(Context);
    const [displayWidth, setDisplayWidth] = useState(500);
    const [headCounter, setHeadCounter] = useState(0)

    function combineHead() {
        // console.log('combineHead')
        const ratio = bodyXY.lineLength / headXY.lineLength;
        const newHeadheight = headXY.height * ratio;
        const newHeadWidth = headXY.aspectRatio * newHeadheight;
        const totalWidth = newHeadWidth + bodyXY.width;
        const fitRatio = displayWidth / totalWidth;
        const bodyFitWidth = bodyXY.width * fitRatio;
        const headFitWidth = newHeadWidth * fitRatio;
        const alignOrigin = (- bodyXY.height + headXY.height * ratio) * fitRatio;
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
        // console.log('combineLegs')
        const currentBodyRectWidth = bodyXY.rectWidth * scaledSize.fitRatio;
        const legsRatio = legsXY.lineLength > currentBodyRectWidth ? currentBodyRectWidth / legsXY.lineLength : legsXY.lineLength / currentBodyRectWidth;
        const newLegsWidth = legsXY.width > currentBodyRectWidth ? legsXY.width * legsRatio : legsXY.width / legsRatio;
        const offsetMargin = (legsXY.width - legsXY.x2) * legsRatio;
        const offsetX = ((bodyXY.width - (bodyXY.rectX + bodyXY.rectWidth)) * scaledSize.fitRatio) - offsetMargin;
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
    }, [bodyXY, headXY, legsXY])

    useEffect(() => {
        if (headXY) {
            combineLegs();
        }
    }, [headCounter])

    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '100vw', height: '80vh' }}>
                <div className='d-flex flex-column align-items-end'>
                    <div className='d-flex align-items-end' style={{ width: `${displayWidth}px` }}>
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
