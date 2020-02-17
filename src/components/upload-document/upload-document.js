import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUpload } from '@fortawesome/free-solid-svg-icons';

import './upload-document.scss';
import { sendFileRequest } from './service/upload-document-service'
import ShowXml from './show-xml/show-xml';
import AlertModel from '../../commons/alert-modal/alert-modal';

function UploadDocument() {

    const [fileName, setFileName] = useState([]);
    const [file, setFile] = useState([]);
    const [xmlEnviado, setXmlEnviado] = useState([]);
    const [showUploadResponse, setShowUploadResponse] = useState([]);
    const [configModal, setConfigModal] = useState([]);

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
            setConfigModal({
                show: true,
                title: 'Enviar documento',
                message: 'Você precisa selecionar um arquivo para enviar!'
            });
            return false;
        }

        const _response = await sendFileRequest('/document', file);

        if (_response.status === 200) {
            setXmlEnviado(_response.data.content);
            setShowUploadResponse(true);
        }
    }

    useEffect(() => {
        setShowUploadResponse(false);

        setConfigModal({
            show: false
        });
    }, []);

    function handleOnCloseModal() {
        setConfigModal({
            show: false
        });
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

            <div className={!showUploadResponse ? 'hidden' : ''}>
                <ShowXml xml={xmlEnviado} />
            </div>

            <AlertModel configModal={configModal} closeModal={handleOnCloseModal} confirmAction={handleOnCloseModal} />
        </>
    );
}

export default UploadDocument;