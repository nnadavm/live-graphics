import React, { useContext, useEffect, useRef, useState } from 'react';
import { legsLibObj } from '../svg/legsLib';
import { Context } from '../context/context';
import srcObj from '../svg/svgSrc';

function LegsComponent() {
    const { headURL, bodyURL, legsURL, setHeadURL, setBodyURL, setLegsURL, headXY, setHeadXY, bodyXY, setBodyXY, legsXY, setLegsXY, counter, setCounter, scaledSize, setScaledSize } = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        const linePath = svgRef.current.querySelectorAll('line')[0];
        const svgPath = svgRef.current.querySelectorAll('svg')[0];
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
        // console.log(legsXYObj);
        setLegsXY(legsXYObj);
    }

    useEffect(() => {
        getXY();
    }, [legsURL])

    return (
        <>
            <div ref={svgRef} style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: legsLibObj[legsURL] }} />

            <img src={srcObj[legsURL]}
                style={{
                    width: scaledSize ? `${scaledSize.newLegsWidth
                        }px` : '10%',
                    position: 'relative',
                    right: scaledSize && `${scaledSize.offsetX}px`,
                    top: '-1px',
                    // border: 'solid 2px purple'
                }} />
        </>

    )
}

export default LegsComponent