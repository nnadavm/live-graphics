import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg';
import BodySVG from '../BodySVG/BodySVG';
import svg from '../svg/sheepBody.svg';
import HeadSVG from '../HeadSVG/HeadSVG';
import { Context } from '../context/context';

function Canvas() {
    const { isHead, isBody, headXY, setHeadXY } = useContext(Context);


    return (
            <div style={
                {
                    border: 'solid 5px green',
                    position: 'absolute',
                    width: '100vw',
                    height: '100vh'
                    // transform: 'translate(500px,500px)'
                }}>
                {isHead && <HeadSVG />}
                {isBody && <BodySVG />}
            </div>
    )
}

export default Canvas
