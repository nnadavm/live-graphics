import React, { useContext, useEffect, useRef, useState } from 'react';
import { legsLibObj } from '../svg/legsLib';
import { Context } from '../context/context';
import srcObj from '../svg/svgSrc';

function LegsComponent() {
    const { headURL, setHeadURL, bodyURL, setBodyURL, legsURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize, setScaledSize } = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        const linePath = svgRef.current.querySelectorAll('line')[0];
        const svgPath = svgRef.current.querySelectorAll('svg')[0];
        const x1 = linePath.getAttribute('x1');
        const x2 = linePath.getAttribute('x2');
        const y1 = linePath.getAttribute('y1');
        const y2 = linePath.getAttribute('y2');
        const height = svgPath.getAttribute('height');
        const width = svgPath.getAttribute('width');
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
        console.log(legsXYObj);
        setLegsXY(legsXYObj);
    }

    useEffect(() => {
        getXY();
    }, [legsURL])

    return (
        <>
            <div ref={svgRef} style={{display: 'none',}}
                dangerouslySetInnerHTML={{ __html: legsLibObj[legsURL] }} />

            {legsURL && <img src={srcObj[legsURL]} 
            style={{
                maxWidth: legsURL && scaledSize ? `${scaledSize.newLegsWidth
                }px` : '10%',
                position: 'relative',
                left: scaledSize && `${scaledSize.offsetX}px`,
                top: '-1px'
                }} />}
        </>

    )
}

export default LegsComponent