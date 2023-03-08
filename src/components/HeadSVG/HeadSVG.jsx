import React , {useContext, useEffect, useRef} from 'react'
import { headLibObj } from '../svg/headLib';
import { Context } from '../context/context';

function HeadSVG() {
    const {isHead, isBody, headXY , setHeadXY, bodyXY} = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        console.log(svgRef.current.childNodes)
          const path = svgRef.current.childNodes[1].childNodes[1].childNodes[3];
          const x1 = path.x1.baseVal.value;
          const x2 = path.x2.baseVal.value;
          const y1 = path.y1.baseVal.value;
          const y2 = path.y2.baseVal.value;
          const lineLength = y2 - y1;
          const ratio = getRatio(lineLength);
          const headXYObj = {
            x1,
            x2,
            y1,
            y2,
            lineLength,
            ratio
          };
          console.log(headXYObj);
          setHeadXY(headXYObj);
        }

        function getRatio(lineLength) {
            if (bodyXY) {
                let ratio;
                if (lineLength < bodyXY.lineLength) {
                    ratio = bodyXY.lineLength / lineLength
                } else {
                    ratio = lineLength / bodyXY.lineLength;
                }
                return ratio;
            } else return;
        }


    useEffect(() => {
        getXY();
    }, [])

    return (
        <div ref={svgRef} style={
            {
                border: 'solid 2px red',
                position: 'absolute',
                // transformOrigin: headXY && bodyXY ? `${headXY.x1}px ${headXY.y1}px` : 1,
                // left: bodyXY && headXY ? `calc(50vw - 335px + ${bodyXY.x1})` : '0',
                left: bodyXY && headXY ? `calc(50vw - 335px + ${bodyXY.x1}px - ${headXY.x1}px)` : '0',

                // transform: 'scale(0.5)'
            }}
            dangerouslySetInnerHTML={{ __html: headLibObj[isHead] }} />
    )
}

export default HeadSVG
