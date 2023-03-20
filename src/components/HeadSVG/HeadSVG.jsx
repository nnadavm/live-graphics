import React, { useContext, useEffect, useRef, useState } from 'react'
import { headLibObj } from '../svg/headLib';
import { Context } from '../context/context';
import srcObj from '../svg/svgSrc';


function HeadSVG() {
    const { headURL, setHeadXY, scaledSize, setScaledSize, svgData } = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        // const doc = svgData.find(object => object.filename === headURL);
        // const linePath = doc.doc.querySelectorAll('line')[0];
        const linePath = svgRef.current.querySelectorAll('line')[0];
        const svgPath = svgRef.current.querySelectorAll('svg')[0];
        const x1 = Number(linePath.getAttribute('x1'));
        const x2 = Number(linePath.getAttribute('x2'));
        const y1 = Number(linePath.getAttribute('y1'));
        const y2 = Number(linePath.getAttribute('y2'));
        const height = Number(svgPath.getAttribute('height'));
        const width = Number(svgPath.getAttribute('width'));
        const aspectRatio = width / height;
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
        // console.log('headXY' , headXYObj);
        setHeadXY(headXYObj);
    }

    useEffect(() => {
        getXY();
    }, [headURL])

    return (
        <>
            <div ref={svgRef} style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: headLibObj[headURL] }} />

            <img src={srcObj[headURL]} style={{
                position: 'relative',
                top: scaledSize ? `${scaledSize.offsetY}px` : 0,
                maxWidth: scaledSize ? `${scaledSize.headFitWidth
                    }px` : '100%',
                // border: 'solid 2px orange'
            }} />
        </>
    )
}

export default HeadSVG
