import React, { useState, useEffect } from 'react';
import beautify from 'xml-beautifier';
import HTMLTree from 'react-htmltree'

import './show-xml.scss';

function ShowXml({ xml }) {

    const [xmlEnviado, setXmlEnviado] = useState([]);

    useEffect(() => {
        if (xml && xml.length) {
            setXmlEnviado(xml);
        }
    }, [xml]);

    return (
        <>
            <div className="xml-document">
                <h3 className="title">Documento enviado</h3>

                <div className="content">
                    <HTMLTree source={xmlEnviado} />
                </div>
            </div>
        </>
    )
}

export default ShowXml;