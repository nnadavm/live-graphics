import React, { useEffect, useContext, useRef } from 'react'
import { ReactSVG } from 'react-svg';
// import svg from '../svg/sheepBody.svg';
import { svgObj } from '../svg/svgLib';
import { Context } from '../context/context';

function BodySVG() {
    const { headXY, bodyXY, setBodyXY } = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        console.log(svgRef.current)
        const path = svgRef.current.childNodes[0].childNodes[1].childNodes[3];
        const x1 = path.x1.baseVal.value;
        const x2 = path.x2.baseVal.value;
        const y1 = path.y1.baseVal.value;
        const y2 = path.y2.baseVal.value;
        const lineLength = y2 - y1;
        let ratio;
        if (lineLength < headXY.lineLength) ratio = headXY.lineLength / lineLength
        else ratio = lineLength / headXY.lineLength;
        const bodyXYObj = {
            x1,
            x2,
            y1,
            y2,
            ratio
        };
        console.log(bodyXYObj);
        setBodyXY(bodyXYObj);
    }


    useEffect(() => {
        getXY();
    }, [])

    return (
        <>
            <div ref={svgRef} style={
                {
                    border: 'solid 2px blue',
                    position: 'absolute',
                    left: bodyXY ? `${headXY.x1 - bodyXY.x1}px` : '0',
                    top: bodyXY ? `${headXY.y1 - bodyXY.y1}px` : '0',
                    transformOrigin: bodyXY ? `${bodyXY.x1}px ${bodyXY.y1}px` : 1,
                    scale: bodyXY ? `${bodyXY.ratio}` : 1
                }}
                dangerouslySetInnerHTML={{ __html: svgObj.sheepBody }} />
        </>
    )
}

export default BodySVG
