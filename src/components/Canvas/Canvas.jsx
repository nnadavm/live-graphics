import React, { useState, useEffect, useContext } from 'react'
import BodySVG from '../BodySVG/BodySVG';
import LegsComponent from '../LegsComponent/LegsComponent';
import HeadSVG from '../HeadSVG/HeadSVG';
import { Context } from '../context/context';

function Canvas() {
    const { headXY, bodyXY, legsXY, scaledSize, setScaledSize, svgData } = useContext(Context);
    const [displayWidth, setDisplayWidth] = useState(500);
    const [headCounter, setHeadCounter] = useState(0)

    function combineHead() {

        const ratio = bodyXY.lineLength / headXY.lineLength;
        const newHeadheight = headXY.height * ratio;
        // const newBodyheight = bodyXY.height * ratio;
        const newHeadWidth = headXY.aspectRatio * newHeadheight;
        const totalWidth = newHeadWidth + bodyXY.width;
        const fitRatio =  displayWidth / totalWidth;
        const bodyFitWidth = bodyXY.width * fitRatio;
        const headFitWidth = newHeadWidth * fitRatio;
        const alignOrigin = (- bodyFitWidth / bodyXY.aspectRatio) + (headFitWidth / headXY.aspectRatio);
        // const alignOrigin = 0;
        const offsetYNoOrigin = (bodyXY.y1 - (headXY.y1 * ratio)) * fitRatio;
        const offsetY = alignOrigin + offsetYNoOrigin;

        const res = {
            ...scaledSize,
            bodyFitWidth,
            headFitWidth,
            offsetY,
            fitRatio
        }
        console.log(bodyFitWidth * bodyXY.aspectRatio);
        console.log('combineHead' , res)
        setHeadCounter(headCounter + 1);
        setScaledSize(res)
    }

    function combineLegs() {
        const currentBodyRectWidth = bodyXY.legsLineLength * scaledSize.fitRatio;
        const legsRatio = legsXY.lineLength > currentBodyRectWidth ? currentBodyRectWidth / legsXY.lineLength : legsXY.lineLength / currentBodyRectWidth;
        const newLegsWidth = legsXY.width > currentBodyRectWidth ? legsXY.width * legsRatio : legsXY.width / legsRatio;
        const offsetMargin = (legsXY.width - legsXY.x2) * legsRatio;
        const offsetX = ((bodyXY.width - (bodyXY.legsLineX1 + bodyXY.legsLineLength)) * scaledSize.fitRatio) - offsetMargin;
        const res = {
            ...scaledSize,
            currentBodyRectWidth,
            offsetX,
            newLegsWidth
        }
        console.log('combineLegs' , res)
        // console.log(offsetMargin)
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
        <> {svgData ?
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '100vw', height: '80vh' }}>
                <div className='d-flex flex-column align-items-end border'>
                    <div className='d-flex align-items-end' style={{ width: `${displayWidth}px` }}>
                        <HeadSVG />
                        <BodySVG />
                    </div>
                    <LegsComponent />
                </div>
            </div>
            : ''}
        </>
    )
}

export default Canvas
