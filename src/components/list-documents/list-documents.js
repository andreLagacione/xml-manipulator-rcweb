import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import datePipe from '../../commons/pipes/date';
import cpfCnpjPipe from '../../commons/pipes/cpfCnpj';
import randomKey from '../../commons/random-key/random-key';

function ListDocuments() {

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
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

        loadDocuments();
    }, []);


    return (
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
                                <button type="button" className="btn-table edit">
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                                <button type="button" className="btn-table remove">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default ListDocuments;