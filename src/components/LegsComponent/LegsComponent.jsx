import React, { useContext, useEffect, useRef, useState } from 'react';
// import { legsLibObj } from '../svg/legsLib';
import { Context } from '../context/context';
// import srcObj from '../svg/svgSrc';

function LegsComponent() {
    const { headURL, bodyURL, legsURL, setHeadURL, setBodyURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize, setScaledSize , svgData } = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        const doc = svgData[0][legsURL].doc;
        const linePath = doc.querySelectorAll('line')[0];
        const svgPath = doc.querySelectorAll('svg')[0];
        const x1 = Number(linePath.getAttribute('x1'));
        const x2 = Number(linePath.getAttribute('x2'));
        const y1 = Number(linePath.getAttribute('y1'));
        const y2 = Number(linePath.getAttribute('y2'));
        const height = Number(svgPath.getAttribute('height'));
        const width = Number(svgPath.getAttribute('width'));
        const aspectRatio = width / height;
        const lineLength = x2 - x1;
        const legsXYObj = {
            x1,
            x2,
            y1,
            y2,
            height,
            width,
            aspectRatio,
            lineLength,
        };
        console.log('legsXY' , legsXYObj);
        setLegsXY(legsXYObj);
    }

    useEffect(() => {
        getXY();
    }, [legsURL])

    return (
        <>
            {/* <div ref={svgRef} style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: legsLibObj[legsURL] }} /> */}

            <img src={svgData[0][legsURL].url}
                style={{
                    width: scaledSize ? `${scaledSize.newLegsWidth
                        }px` : '10%',
                    position: 'relative',
                    right: scaledSize && `${scaledSize.offsetX}px`,
                    // top: '-1px',
                    // border: 'solid 1px purple'
                }} />
        </>

    )
}

export default LegsComponent