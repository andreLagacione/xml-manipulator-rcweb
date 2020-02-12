import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUpload } from '@fortawesome/free-solid-svg-icons';

import './upload-document.scss';

function UploadDocument() {
    return (
        <>
            <form onSubmit="" id="document-upload">
                <input type="file" name="fileInput" id="fileInput" accept=".xml" hidden />
                <label htmlFor="fileInput" className="file-name">
                    xtpo.xml
                    <span className="btn-select">Selecione</span>
                </label>

                <div className="row-button">
                    <code className="alert-text">* O documento tem que estar dentro das tags "&lt;xml&gt;&lt;/xml&gt;"</code>
                    <button type="submit" className="btn-submit">
                        <FontAwesomeIcon icon={faUpload} /> Enviar
                    </button>
                </div>
            </form>

            <div className="xml-document">
                <h3 className="title">Documento enviado</h3>

                <div className="content"></div>
            </div>
        </>
    );
}

export default UploadDocument;