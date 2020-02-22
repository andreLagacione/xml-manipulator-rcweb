import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    useParams
} from 'react-router-dom';

import './edit-document.scss';
import AlertModel from '../../commons/alert-modal/alert-modal';
import ShowXml from '../show-xml/show-xml';
import removeSpecialChars from '../../commons/formatter/remove-special-chars';

function EditDocument() {

    let tagNameValue;
    let tagValueValue;
    let oldTagValue;

    const { id, isEdited } = useParams();
    const [configModal, setConfigModal] = useState([]);
    const [showUploadResponse, setShowUploadResponse] = useState([]);
    const [xmlEnviado, setXmlEnviado] = useState([]);

    useEffect(() => {
        setShowUploadResponse(false);
        setConfigModal({
            show: false
        });

        getDocumentTag();
    }, [document]);

    const buildName = () => {
        tagNameValue.value = removeSpecialChars(tagNameValue.value);
    }

    const getDocumentTag = async () => {
        const input = tagNameValue;
        const old = oldTagValue;
        const _response = await axios.get(`/edited-document/${id}`);
        const tagName = _response.data.customTagName;
        input.value = tagName;
        old.value = tagName;
    }

    const sendEdtitedDocument = async (e) => {
        e.preventDefault();

        const tagName = tagNameValue.value;
        const tagValue = tagValueValue.value;

        if (!tagName.length || !tagValue.length) {
            setConfigModal({
                show: true,
                title: 'Editar documento',
                message: 'O nome da tag e o valor precisam ser informados!'
            });
            return false;
        }

        const request = {
            documentId: id,
            oldTagName: oldTagValue.value,
            newTagName: tagName,
            tagValue: tagValue,
            isEdited: isEdited,
        }

        const _response = await axios.post('/edited-document/edit', request);

        if (_response.status === 200) {
            setXmlEnviado(_response.data.content);
            setShowUploadResponse(true);
        }
    }

    function handleOnCloseModal() {
        setConfigModal({
            show: false
        });
    }


    return (
        <div id="edit-document">
            <h3 className="title">Adicionar/Editar tag</h3>

            <form onSubmit={sendEdtitedDocument}>
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

                <div className="box-input">
                    <input
                        type="hidden"
                        id="oldTag"
                        name="oldTag"
                        ref={(oldTag) => oldTagValue = oldTag} />
                </div>

                <div className="box-input">
                    <button type="submit" className="send">Salvar</button>
                </div>
            </form>

            <small className="alert">* o nome da tag não pode conter caractéres especias e/ou espaço em branco.</small>

            <div className={!showUploadResponse ? 'hidden' : ''}>
                <ShowXml xml={xmlEnviado} />
            </div>

            <AlertModel configModal={configModal} closeModal={handleOnCloseModal} confirmAction={handleOnCloseModal} />
        </div>
    );
}

export default EditDocument;