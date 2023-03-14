import React, { useContext, useEffect, useRef, useState } from 'react'
import { headLibObj } from '../svg/headLib';
import { Context } from '../context/context';
import srcObj from '../svg/svgSrc';


function HeadSVG() {
    const { headURL, setHeadURL, bodyURL, setBodyURL, legsURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize , setScaledSize   } = useContext(Context);
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
        const aspectRatio = width/height;
        const lineLength = y2 - y1;
        const headXYObj = {
            x1,
            x2,
            y1,
            y2,
            height,
            width,
            aspectRatio,
            lineLength,
        };
        console.log('headXY' , headXYObj);
        setHeadXY(headXYObj);
    }

    useEffect(() => {
        getXY();
    }, [headURL])

    return (
        <>
            <div ref={svgRef} style={
                {
                    display: 'none',
                    // border: 'solid 1px red',
                    // visibility: vis,
                    // position: 'relative',
                    // top: bodyXY && headXY ? `${bodyXY.y1 - headXY.y1}px` : '0',
                    // left: '2px',
                    // transformOrigin: headXY ? `${headXY.x1}px ${headXY.y1}px` : '0 0',
                    scale: bodyXY && headXY ? `${headXY.ratio}` : 1,
                    // scale: bodyXY && headXY ? `${bodyXY.ratio}` : 1,
                }}
                dangerouslySetInnerHTML={{ __html: headLibObj[headURL] }} />

            {headURL && <img src={srcObj[headURL]} style={{
                position: 'relative',
                top: scaledSize ? `${scaledSize.offsetY}px` : 0,
                maxWidth: bodyURL && scaledSize ? `${scaledSize.headFitWidth
                }px` : '100%'
            }} />}
        </>
    )
}

export default HeadSVG
