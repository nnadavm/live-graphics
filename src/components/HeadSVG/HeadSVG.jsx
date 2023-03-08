import React , {useContext, useEffect, useRef} from 'react'
import { svgObj } from '../svg/svgLib';
import { Context } from '../context/context';

function HeadSVG() {
    const {isHead, isBody, headXY , setHeadXY} = useContext(Context);
    const svgRef = useRef();

    function getXY() {
        console.log(svgRef.current.childNodes)
          const path = svgRef.current.childNodes[1].childNodes[1].childNodes[3];
          const x1 = path.x1.baseVal.value;
          const x2 = path.x2.baseVal.value;
          const y1 = path.y1.baseVal.value;
          const y2 = path.y2.baseVal.value;
          const lineLength = y2 - y1;
          const headXYObj = {
            x1,
            x2,
            y1,
            y2,
            lineLength
          };
          console.log(headXYObj);
          setHeadXY(headXYObj);
        }


    useEffect(() => {
        getXY();
    }, [])

    return (
        <div ref={svgRef} style={
            {
                border: 'solid 2px red',
                position: 'absolute',
            }}
            dangerouslySetInnerHTML={{ __html: svgObj.sheepHead }} />
    )
}

export default HeadSVG
