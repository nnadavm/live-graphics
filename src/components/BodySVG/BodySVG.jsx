import React, { useEffect, useContext, useRef, useState } from 'react'
import { bodyLibObj } from '../svg/bodyLib';
import { Context } from '../context/context';
import srcObj from '../svg/svgSrc';

function BodySVG() {
    const { headURL, setHeadURL, bodyURL, setBodyURL, legsURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize , setScaledSize  } = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        const linePath = svgRef.current.querySelectorAll('line')[0];
        const svgPath = svgRef.current.querySelectorAll('svg')[0];
        const rect = svgRef.current.querySelectorAll('rect')[0];
        const x1 = linePath.getAttribute('x1');
        const x2 = linePath.getAttribute('x2');
        const y1 = linePath.getAttribute('y1');
        const y2 = linePath.getAttribute('y2');
        const height = svgPath.getAttribute('height');
        const width = svgPath.getAttribute('width');
        const rectX = rect.getAttribute('x');
        const rectY = rect.getAttribute('y');
        const rectWidth = rect.getAttribute('width');
        const rectHeight = rect.getAttribute('height');
        const aspectRatio = width/height;
        const lineLength = y2 - y1;
        const ratio = getRatio(lineLength);
        const bodyXYObj = {
            x1,
            x2,
            y1,
            y2,
            height,
            width,
            aspectRatio,
            lineLength,
            ratio,
            rectX,
            rectY,
            rectHeight,
            rectWidth
        };
        console.log(bodyXYObj);
        setBodyXY(bodyXYObj);
    }

    function getRatio(lineLength) {
        if (headXY) {
            let ratio;
            if (lineLength > headXY.lineLength) {
                ratio = headXY.lineLength / lineLength
            } else {
                ratio = lineLength / headXY.lineLength;
            }
            return ratio;
        } else return;
    }


    useEffect(() => {
        getXY();
    }, [bodyURL])

    return (
        <>
            <div ref={svgRef} style={
                {
                    display: 'none',
                    border: 'solid 1px green',
                    position: 'absolute',
                    transformOrigin: bodyXY ? `${bodyXY.x1}px ${bodyXY.y1}px` : 'center',
                    transform: 'scale(0.5)',
                    left: bodyXY ? 'calc(50vw - 335px)' : 'calc(50vw - 335px)',
                    top: bodyXY ? '0' : '0',
                    scale: bodyXY ? `${bodyXY.ratio}` : 1
                }}
                dangerouslySetInnerHTML={{ __html: bodyLibObj[bodyURL] }} />

                {bodyURL && <img src={srcObj[bodyURL]} style={{
                    width: headURL && scaledSize ? `${scaledSize.bodyFitWidth
                    }px` : '100%',
                    maxHeight: '500px',
                    position: 'relative',
                    left: '-1px'
                }} />}
        </>
    )
}

export default BodySVG
