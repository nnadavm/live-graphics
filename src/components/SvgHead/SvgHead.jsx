import React from 'react'
import { svgObj } from '../svg/svgLib';

function SvgHead() {
    return (
        <div style={
            {
                border: 'solid 2px red',
                position: 'absolute',
            }}
            dangerouslySetInnerHTML={{ __html: svgObj.sheepHead }} />
    )
}

export default SvgHead