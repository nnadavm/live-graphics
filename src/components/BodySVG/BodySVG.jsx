import React, { useEffect, useContext, useRef, useState } from 'react'
import { bodyLibObj } from '../svg/bodyLib';
import { Context } from '../context/context';
import srcObj from '../svg/svgSrc';

function BodySVG() {
    const { headURL, bodyURL, legsURL, setHeadURL, setBodyURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize, setScaledSize } = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        const linePath = svgRef.current.querySelectorAll('line')[0];
        const svgPath = svgRef.current.querySelectorAll('svg')[0];
        const rect = svgRef.current.querySelectorAll('rect')[0];
        const x1 = Number(linePath.getAttribute('x1'));
        const x2 = Number(linePath.getAttribute('x2'));
        const y1 = Number(linePath.getAttribute('y1'));
        const y2 = Number(linePath.getAttribute('y2'));
        const height = Number(svgPath.getAttribute('height'));
        const width = Number(svgPath.getAttribute('width'));
        const rectX = Number(rect.getAttribute('x'));
        const rectY = Number(rect.getAttribute('y'));
        const rectWidth = Number(rect.getAttribute('width'));
        const rectHeight = Number(rect.getAttribute('height'));
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
        // console.log(bodyXYObj);
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
            <div ref={svgRef} style={{display: 'none'}} dangerouslySetInnerHTML={{ __html: bodyLibObj[bodyURL] }} />

                <img src={srcObj[bodyURL]} style={{
                    width: scaledSize ? `${scaledSize.bodyFitWidth
                    }px` : '100%',
                    maxHeight: '500px',
                    position: 'relative',
                    left: '-1px'
                }} />
        </>
    )
}

export default BodySVG
