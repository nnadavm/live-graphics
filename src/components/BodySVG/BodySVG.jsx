import React, { useEffect, useContext, useRef, useState } from 'react'
// import { bodyLibObj } from '../svg/bodyLib';
import { Context } from '../context/context';
// import srcObj from '../svg/svgSrc';

function BodySVG() {
    const { headURL, bodyURL, legsURL, setHeadURL, setBodyURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize, setScaledSize, svgData } = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        const doc = svgData[0][bodyURL].doc;
        const headLine = doc.querySelectorAll('line')[0].getAttribute('stroke-dasharray') ? doc.querySelectorAll('line')[1] : doc.querySelectorAll('line')[0];
        const svgPath = doc.querySelectorAll('svg')[0];
        const legsLine = doc.querySelectorAll('line')[0].getAttribute('stroke-dasharray') ? doc.querySelectorAll('line')[0] : doc.querySelectorAll('line')[1];
        const x1 = headLine.getAttribute('x1') ? Number(headLine.getAttribute('x1')) : 0;
        const x2 = headLine.getAttribute('x2') ? Number(headLine.getAttribute('x2')) : 0;
        const y1 = headLine.getAttribute('y1') ? Number(headLine.getAttribute('y1')) : 0;
        const y2 = Number(headLine.getAttribute('y2'));
        const height = Number(svgPath.getAttribute('height'));
        const width = Number(svgPath.getAttribute('width'));
        const legsLineX1 = legsLine.getAttribute('x1') ? Number(legsLine.getAttribute('x1')) : 0;
        const legsLineY1 = Number(legsLine.getAttribute('y1'));
        const legsLineX2 = legsLine.getAttribute('x2') ? Number(legsLine.getAttribute('x2')): 0;
        const legsLineLength = legsLineX2 - legsLineX1;
        // const legsLineHeight = Number(legsLine.getAttribute('height'));
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
            legsLineX1,
            legsLineY1,
            // legsLineHeight,
            legsLineX2,
            legsLineLength
        };
        console.log('bodyXY' , bodyXYObj);
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
            {/* <div ref={svgRef} style={{display: 'none'}} dangerouslySetInnerHTML={{ __html: bodyLibObj[bodyURL] }} /> */}

                <img src={svgData[0][bodyURL].url} style={{
                    width: scaledSize ? `${scaledSize.bodyFitWidth
                    }px` : '10%',
                    // maxHeight: '500px',
                    position: 'relative',
                    // left: '-1px',
                    // border: 'solid 1px blue'
                }} />
        </>
    )
}

export default BodySVG
