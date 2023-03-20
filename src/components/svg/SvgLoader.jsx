import React, { useEffect, useContext } from 'react'
import { Context } from '../context/context';

function SvgLoader() {
    const { setSvgData, svgData } = useContext(Context);

    function importAll(r) {
        return r.keys().map(r);
    }

    function getSvgXml(urlArr, targetArr) {
        for (const url of urlArr) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send(null);
            if (xhr.status === 200) {
              const parser = new DOMParser();
              const xml = xhr.responseText;
              const doc = parser.parseFromString(xml, 'application/xml');
              targetArr.push({
                filename: extractName(url),
                url: url,
                doc: doc
            });
            } else {
              console.error(`Failed to load ${url}`);
            }
          }
    }

    function extractName(url) {
        const split1 = url.split('/');
        const split2 =split1[split1.length - 1].split('.');
        return split2[0];
    }

    function getData() {
        const svgFiles = importAll(require.context('/', false, /\.svg$/));
        const svgDataArr = [];
        getSvgXml(svgFiles, svgDataArr);
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