import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import datePipe from '../../commons/pipes/date';
import cpfCnpjPipe from '../../commons/pipes/cpfCnpj';
import randomKey from '../../commons/random-key/random-key';
import AlertModel from '../../commons/alert-modal/alert-modal';

function ListDocuments() {

    const [documents, setDocuments] = useState([]);
    const [configModal, setConfigModal] = useState([]);
    const [idDocumentToRemove, setIdDocumentToRemove] = useState([]);
    const [documentIsEdited, setDocumentIsEdited] = useState([]);
    let history = useHistory();

    useEffect(() => {
        setConfigModal({
            show: false
        });

        loadDocuments();
    }, []);

    async function loadDocuments() {
        const response1 = await axios.get('/document');
        const response2 = await axios.get('/edited-document');
        let documentList = [];

        Promise.all([response1, response2]).then((_response) => {
            _response.forEach(item => {
                item.data.map(subItem => documentList.push(subItem));
            });

            setDocuments(documentList);
        });
    }

    function removeDocument(id, isEdited) {
        setIdDocumentToRemove(id);
        setDocumentIsEdited(isEdited);

        setConfigModal({
            show: true,
            title: 'Remover documento',
            message: 'Você tem certeza que deseja remover este arquivo?',
            needConfirm: true
        });
    }

    function handleOnCloseModal() {
        setConfigModal({
            show: false
        });
    }

    function handleConfirmAction() {
        if (documentIsEdited) {
            deleteEditedDocument();
            return false;
        }

        deleteDocument();
    }

    async function deleteDocument() {
        const response = await axios.delete(`/document/${idDocumentToRemove}`);
        closeModalAndReloadList(response);
    }

    async function deleteEditedDocument() {
        const response = await axios.delete(`/edited-document/${idDocumentToRemove}`);
        closeModalAndReloadList(response);
    }

    function closeModalAndReloadList(response) {
        if (response.status === 200) {
            loadDocuments();
            setConfigModal({
                show: false
            });
        }
    }

    function redirect(id, isEdited) {
        history.push(`edit-document/${id}/${isEdited}`);
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>CNPJ Emissor</th>
                        <th>Cidade Emissor</th>
                        <th>CNPJ Remetente</th>
                        <th>Cidade Remetente</th>
                        <th>CNPJ Destinatario</th>
                        <th>Cidade Destinatario</th>
                        <th>Chave de acesso</th>
                        <th>Data de emissão</th>
                        <th className="col-actions"></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        documents.map(item => (
                            <tr key={randomKey(item.id)}>
                                <td>{cpfCnpjPipe(item.cnpjEmissor)}</td>
                                <td>{item.cidadeEstadoEmissor}</td>
                                <td>{cpfCnpjPipe(item.cnpjRemetente)}</td>
                                <td>{item.cidadeEstadoRemetente}</td>
                                <td>{cpfCnpjPipe(item.cnpjDestinatario)}</td>
                                <td>{item.cidadeEstadoDestinatario}</td>
                                <td>{item.chaveAcesso}</td>
                                <td>{datePipe(item.dataEmissao)}</td>
                                <td className="col-actions">
                                    <button type="button" className="btn-table edit" onClick={() => redirect(item.id, item.edited)}>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </button>
                                    <button type="button" className="btn-table remove" onClick={() => removeDocument(item.id, item.edited)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
            <AlertModel configModal={configModal} closeModal={handleOnCloseModal} confirmAction={handleConfirmAction} />
        </>
    );
}

export default ListDocuments;