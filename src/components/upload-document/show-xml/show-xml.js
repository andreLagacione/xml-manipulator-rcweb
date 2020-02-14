import React, { useState, useEffect } from 'react';

function ShowXml({xml}) {


    return (
        <>
            <div className="xml-document">
                <h3 className="title">Documento enviado</h3>

                <div className="content">{xml}</div>
            </div>
        </>
    )
}

export default ShowXml;