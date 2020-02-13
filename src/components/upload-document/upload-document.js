import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUpload } from '@fortawesome/free-solid-svg-icons';

import api from '../../services/api';

import './upload-document.scss';

function UploadDocument() {

    const [fileName, setFileName] = useState([]);
    const [file, setFile] = useState([]);

    function fileAdded() {
        let fileInput = document.getElementById('fileInput');   
        let _filename = fileInput.files[0].name;
        setFile(fileInput);
        setFileName(_filename);
    }

    async function sendFile(event) {
        event.preventDefault();

        if (!file) {
            alert('Selecione um arquivo');
            return false;
        }
        
        const data = new FormData();
        data.append('file', file);

        const xmlSalved = await api.post('/document', data);
        console.log(xmlSalved);
    }


    return (
        <>
            <form onSubmit={sendFile} id="document-upload">
                <input type="file" name="fileInput" id="fileInput" accept=".xml" hidden onChange={fileAdded} />
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