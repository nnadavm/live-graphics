import React, { useEffect, useContext } from 'react'
import { Context } from '../context/context';

function SvgLoader() {
    const { setSvgData, svgData , setWheelData } = useContext(Context);

    function importAll(r) {
        return r.keys().map(r);
    }

    function getSvgXml(urlArr, targetArr , filenameArr) {
        urlArr.forEach((url, i) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send(null);
            if (xhr.status === 200) {
                const parser = new DOMParser();
                const xml = xhr.responseText;
                const doc = parser.parseFromString(xml, 'application/xml');
                targetArr[0] = {
                    ...targetArr[0],
                    [extractName(url)]: {
                        url: url,
                        doc: doc,
                        id: i+1
                    }
                };
                filenameArr.push(extractName(url));
            } else {
                console.error(`Failed to load ${url}`);
            }

        });
    }

    function sortFilenames(arr){
        const bodyArr = arr.filter(string => string.includes("Body"));
        const headArr = arr.filter(string => string.includes("Head"));
        const legsArr = arr.filter(string => string.includes("Legs"));
        const bodyObjArr = bodyArr.map((name , i) => {return {id: i, value: name}});
        const headObjArr = headArr.map((name , i) => {return {id: i, value: name}});
        const legsObjArr = legsArr.map((name , i) => {return {id: i, value: name}});
        const wheelData = {
            bodyObjArr,
            headObjArr,
            legsObjArr
        }
        setWheelData(wheelData);
    }

    function extractName(url) {
        const split1 = url.split('/');
        const split2 = split1[split1.length - 1].split('.');
        return split2[0];
    }

    function getData() {
        const svgFiles = importAll(require.context('/', false, /\.svg$/));
        const svgDataArr = [];
        const filenameArr = []
        getSvgXml(svgFiles, svgDataArr , filenameArr);
        sortFilenames(filenameArr);
        console.log(svgDataArr);
        setSvgData(svgDataArr);
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
        </div>
    )
}

export default SvgLoader