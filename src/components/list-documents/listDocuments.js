import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import datePipe from '../../commons/pipes/date';
import cpfCnpjPipe from '../../commons/pipes/cpfCnpj';
import randomKey from '../../commons/random-key/random-key';

function ListDocuments() {

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        async function loadDocuments() {
            const response1 = await api.get('/document');
            const response2 = await api.get('/edited-document');
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
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default ListDocuments;