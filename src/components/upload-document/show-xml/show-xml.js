import React, { useState, useEffect } from 'react';
import beautify from 'xml-beautifier';
import './show-xml.scss';

function ShowXml({ xml }) {

    const [xmlEnviado, setXmlEnviado] = useState([]);

    useEffect(() => {
        if (!xml instanceof Array) {
            setXmlEnviado(beautify(xml));
        }
    }, []);

    return (
        <>
            <div className="xml-document">
                <h3 className="title">Documento enviado</h3>

                <div className="content">{xmlEnviado}</div>
            </div>
        </>
    )
}

export default ShowXml;