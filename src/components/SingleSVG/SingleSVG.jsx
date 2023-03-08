import React, { useEffect } from 'react'
import { ReactSVG } from 'react-svg';
// import svg from '../svg/sheepBody.svg';
import { svgObj } from '../svg/svgLib';


function SingleSVG({ isHead, isBody, headLineXY }) {
    return (
        <div style={
            {
                border: 'solid 2px blue',
                position: 'absolute',
                left: `${headLineXY.x1 - 108}px`,
                top: `${headLineXY.y1 - 201}px`,
                transformOrigin: '108px 201px',
                scale: '1.6543'
            }}>
            {/* <button onClick={() => { console.log(headLineXY) }}>test</button> */}
            <div dangerouslySetInnerHTML={{ __html: svgObj.sheepBody }} />
        </div>
    )
}

export default SingleSVG