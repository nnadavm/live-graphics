import React, { useEffect, useContext, useRef } from 'react'
import { bodyLibObj } from '../svg/bodyLib';
import { Context } from '../context/context';

function BodySVG() {
    const { isBody, headXY, bodyXY, setBodyXY } = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        console.log(bodyLibObj)
        // const path = svgRef.current.childNodes[1].childNodes[1].childNodes[3];
        const path = bodyLibObj[isBody].XY;
        const x1 = path.x1;
        const x2 = path.x2;
        const y1 = path.y1;
        const y2 = path.y2;
        const lineLength = y2 - y1;
        const ratio = getRatio(lineLength);
        const bodyXYObj = {
            x1,
            x2,
            y1,
            y2,
            lineLength,
            ratio
        };
        console.log(bodyXYObj);
        setBodyXY(bodyXYObj);
    }

    function getRatio(lineLength) {
        if (headXY) {
            let ratio;
            if (lineLength < headXY.lineLength) {
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
                    // border: 'solid 2px blue',
                    position: 'absolute',
                    // transform: 'scale(0.5)',
                    // transformOrigin: bodyXY ? `${bodyXY.x1}px ${bodyXY.y1}px` : 'center',
                    left: bodyXY ? 'calc(50vw - 335px)' : 'calc(50vw - 335px)',
                    top: bodyXY ? '0' : '0',
                    // scale: bodyXY ? `${bodyXY.ratio}` : 1
                }}
                dangerouslySetInnerHTML={{ __html: bodyLibObj[isBody].data }} />
        </>
    )
}

export default BodySVG
