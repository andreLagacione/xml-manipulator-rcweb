import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUpload } from '@fortawesome/free-solid-svg-icons';

import './upload-document.scss';
import { sendFileRequest } from './upload-document-service'

function UploadDocument() {

    const [fileName, setFileName] = useState([]);
    const [file, setFile] = useState([]);
    let fileInputRef = React.createRef();

    function fileAdded(event) {
        let fileInput = event.target.files[0];
        let _filename = fileInput.name;
        setFile(fileInput);
        setFileName(_filename);
    }

    async function sendFile(event) {
        event.preventDefault();

        if (file instanceof Array && !file.length) {
            alert('Selecione um arquivo');
            return false;
        }

        sendFileRequest('/document', file);
    }


    return (
        <>
            <form onSubmit={sendFile} id="document-upload">
                <input type="file" name="fileInput" id="fileInput" accept=".xml" ref={fileInputRef} hidden onChange={fileAdded} />


                <label htmlFor="fileInput" className="file-name">
                    {fileName}
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