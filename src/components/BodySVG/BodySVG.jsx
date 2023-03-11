import React, { useEffect, useContext, useRef } from 'react'
import { bodyLibObj } from '../svg/bodyLib';
import { Context } from '../context/context';

function BodySVG() {
    const { headURL, setHeadURL, bodyURL, setBodyURL, headXY, setHeadXY, bodyXY, setBodyXY } = useContext(Context);
    const svgRef = useRef();

    function stringURL() {
        const string = `../svg/${bodyURL}.svg`;
        return string;
    }

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
        const bodyXYObj = {
            x1,
            x2,
            y1,
            y2,
            lineLength,
            ratio,
            height
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
    }, [])

    return (
        <>
            <div ref={svgRef} style={
                {
                    // border: 'solid 1px green',
                    // position: 'absolute',
                    // transformOrigin: bodyXY ? `${bodyXY.x1}px ${bodyXY.y1}px` : 'center',
                    // transform: 'scale(0.5)',
                    // left: bodyXY ? 'calc(50vw - 335px)' : 'calc(50vw - 335px)',
                    // top: bodyXY ? '0' : '0',
                    // scale: bodyXY ? `${bodyXY.ratio}` : 1
                }}
                dangerouslySetInnerHTML={{ __html: bodyLibObj[bodyURL] }} />
                {/* {bodyURL && <img src={require(stringURL()).default} alt="" />} */}
        </>
    )
}

export default BodySVG
