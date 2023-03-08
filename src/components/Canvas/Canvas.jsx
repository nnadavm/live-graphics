import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg';
import BodySVG from '../BodySVG/BodySVG';
import svg from '../svg/sheepBody.svg';
import HeadSVG from '../HeadSVG/HeadSVG';
import { Context } from '../context/context';

function Canvas() {
    const {isHead, isBody, headXY , setHeadXY} = useContext(Context);


    return (
        <div style={
            {
                border: 'solid 2px green',
                position: 'absolute'
            }}>
            {isHead && <HeadSVG/>}
            {isBody && <BodySVG isBody={isBody} headLineXY={headXY} />}
        </div>
    )
}

export default Canvas
