import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUpload } from '@fortawesome/free-solid-svg-icons';

import './upload-document.scss';
import { sendFileRequest } from './service/upload-document-service';
import ShowXml from '../show-xml/show-xml';
import AlertModel from '../../commons/alert-modal/alert-modal';
import removeSpecialChars from '../../commons/formatter/remove-special-chars';

function UploadDocument() {

    const [fileName, setFileName] = useState([]);
    const [file, setFile] = useState([]);
    const [xmlEnviado, setXmlEnviado] = useState([]);
    const [showUploadResponse, setShowUploadResponse] = useState([]);
    const [configModal, setConfigModal] = useState([]);
    let tagNameValue;
    let tagValueValue;

    let fileInputRef = React.createRef();

    const fileAdded = (event) => {
        let fileInput = event.target.files[0];
        let _filename = fileInput.name;
        setFile(fileInput);
        setFileName(_filename);
    }

    const sendFile = async (event) =>  {
        event.preventDefault();

        if (file instanceof Array && !file.length) {
            setConfigModal({
                show: true,
                title: 'Enviar documento',
                message: 'Você precisa selecionar um arquivo para enviar!'
            });
            return false;
        }

        const tagName = tagNameValue.value;
        const tagValue = tagValueValue.value;

        if (tagName.length && tagValue.length) {
            addNewEditedFile(tagName, tagValue);
            return false;
        }

        addNewFile();
        
    }

    const addNewFile = async () => {
        mapResponse(await sendFileRequest('/document', file));
    }

    const addNewEditedFile = async (tagName, tagValue) => {
        const bodyParams = {
            tagName: tagName,
            tagValue: tagValue
        }
        mapResponse(await sendFileRequest('/edited-document/create', file, bodyParams));
    }

    const mapResponse = (_response) => {
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

    const handleOnCloseModal = () => {
        setConfigModal({
            show: false
        });
    }

    const buildName = () => {
        tagNameValue.value = removeSpecialChars(tagNameValue.value);
    }

    return (
        <>
            <form onSubmit={sendFile} id="document-upload">
                <input type="file" name="fileInput" id="fileInput" accept=".xml" ref={fileInputRef} hidden onChange={fileAdded} />

                <label htmlFor="fileInput" className="file-name">
                    {fileName}
                    <span className="btn-select">Selecione</span>
                </label>

                <code className="alert-text">* O documento tem que estar dentro das tags "&lt;xml&gt;&lt;/xml&gt;"</code>

                <div className={'row-add-tag ' + (!fileName.length ? 'hidden' : '')}>
                    <div className="box-input">
                        <label htmlFor="tagName">Nome da tag</label>
                        <input
                            type="text"
                            id="tagNameRef"
                            name="tagName"
                            placeholder="ex: pontoReferencia"
                            ref={(tagName) => tagNameValue = tagName}
                            onBlur={buildName}
                        />
                    </div>

                    <div className="box-input">
                        <label htmlFor="tagValue">Valor da tag</label>
                        <input
                            type="text"
                            id="tagValueRef"
                            name="tagValue"
                            ref={(tagValue) => tagValueValue = tagValue}
                            onBlur={buildName} />
                    </div>
                </div>

                <code className={'alert-text ' + (!fileName.length ? 'hidden' : '')}>
                    Se desejar você pode adicionar uma tag para o destinatário,
                    o nome dessa tag não pode conter caractéres especias e/ou espaço em branco.
                </code>

                <div className="row-button">
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