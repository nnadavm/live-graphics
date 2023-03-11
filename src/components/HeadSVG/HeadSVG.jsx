import React, { useContext, useEffect, useRef, useState } from 'react'
import { headLibObj } from '../svg/headLib';
import { Context } from '../context/context';

function HeadSVG() {
    const { headURL, bodyURL, headXY, setHeadXY, bodyXY, counter } = useContext(Context);
    const svgRef = useRef();
    const [vis , setVis] = useState('hidden')

    function getXY() {
        const linePath = svgRef.current.querySelectorAll('line')[0];
        const svgPath = svgRef.current.querySelectorAll('svg')[0];
        const x1 = linePath.getAttribute('x1');
        const x2 = linePath.getAttribute('x2');
        const y1 = linePath.getAttribute('y1');
        const y2 = linePath.getAttribute('y2');
        const height = svgPath.getAttribute('height');
        const lineLength = y2 - y1;
        const ratio = getRatio(lineLength);
        const headXYObj = {
            x1,
            x2,
            y1,
            y2,
            lineLength,
            ratio,
            height
        };
        console.log(headXYObj);
        setHeadXY(headXYObj);
    }

    function getRatio(lineLength) {
        let ratio;
        if (bodyXY) {
            if (lineLength > bodyXY.lineLength) {
                ratio = bodyXY.lineLength / lineLength
            } else {
                ratio = lineLength / bodyXY.lineLength;
            }
            return ratio;
        } else return;
    }


    useEffect(() => {
        getXY();
        setTimeout(() => {
            setVis('visible');
        }, 1);
    }, [])

    return (
        <div ref={svgRef} style={
            {
                // border: 'solid 1px red',
                visibility: vis,
                // position: 'relative',
                // top: bodyXY && headXY ? `${bodyXY.y1 - headXY.y1}px` : '0',
                // left: '2px',
                // transformOrigin: headXY ? `${headXY.x1}px ${headXY.y1}px` : '0 0',
                scale: bodyXY && headXY ? `${headXY.ratio}` : 1,
                // scale: bodyXY && headXY ? `${bodyXY.ratio}` : 1,
            }}
            dangerouslySetInnerHTML={{ __html: headLibObj[headURL] }} />
    )
}

export default HeadSVG
