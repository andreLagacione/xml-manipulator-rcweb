import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUpload } from "@fortawesome/free-solid-svg-icons";

function UploadDocument() {
    return (
        <>
            <form onSubmit="" id="document-upload">
                <input type="file" name="fileInput" id="fileInput" />
                <label htmlFor="fileInput" className="file-name">
                    <span className="btn-select">Selecione</span>
                </label>

                <div className="row-button">
                    <button className="btn-submit">
                        <FontAwesomeIcon icon={faUpload} /> Enviar
                </button>
                </div>
            </form>

            <div className="xml-document">
                <h3 className="title">Documento enviado</h3>
            </div>
        </>
    );
}

export default UploadDocument;