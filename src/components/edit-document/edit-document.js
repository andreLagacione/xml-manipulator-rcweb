import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import axios from 'axios';

import './edit-document.scss';

function EditDOcument() {

    const [sendDisabled, setDendDisabled] = useState(true);
    const [oldTagName, setOldTagName] = useState(null);
    const { id, isEdited } = useParams();

    let tagNameXPTO;
    let tagValue;

    useEffect(() => {
        console.log(tagNameXPTO, '1')

        // if (document.readyState === 'complete' && isEdited) {
            verifyInputTagNameIsLoaded();
        // }
    }, []);

    // document.onreadystatechange = () => {
    //     if (document.readyState === 'complete' && isEdited) {
    //         getDocumentTag();
    //     }
    // };

    const checkValues = () => {
        const tagNameValue = tagNameXPTO.current.value;
        const tagValueValue = tagValue.current.value;

        if (tagNameValue.length && tagValueValue.length) {
            setDendDisabled(false);
        }
    }

    const buildName = () => {
        const tagNameValue = tagNameXPTO.current.value;
        tagNameXPTO.current.value = tagNameValue.replace(/[`~!@#$%^&*()_|+\-=?;:¨'",.<>\{\}\[\]\\\/\s]/gi, '');
    }

    const getDocumentTag = async () => {
        const _response = await axios.get(`/edited-document/${id}`);
        setOldTagName(_response.data.customTagName);
        console.log(tagNameXPTO, '2')
        tagNameXPTO = oldTagName;

        // verifyInputTagNameIsLoaded();
    }

    const verifyInputTagNameIsLoaded = () => {
        // console.log(document.readyState)
        // if (document.readyState !== 'complete') {
            setInterval(() => {
                getDocumentTag();
            }, 3000);

            return;
        // }

        getDocumentTag();
    }

    const sendEdtitedDocument = async (e) => {
        e.preventDefault();

        const request = {
            documentId: id,
            oldTagName: oldTagName,
            newTagName: tagNameXPTO.current.value,
            tagValue: tagValue.current.value,
            isEdited: isEdited,
        }

        const _response = await axios.post('/edited-document/edit', request);
        console.log(_response);
    }


    return (
        <div id="edit-document">
            <h3 className="title">Adicionar/Editar tag</h3>

            <form onSubmit={sendEdtitedDocument}>
                <div className="box-input">
                    <label htmlFor="tagName">Nome da tag</label>
                    <input
                        type="text"
                        id="tagName"
                        name="tagName"
                        placeholder="ex: pontoReferencia"
                        value={tagNameXPTO}
                        onChange={checkValues}
                        onBlur={buildName}
                    />
                </div>

                <div className="box-input">
                    <label htmlFor="tagValue">Valor da tag</label>
                    <input type="text" id="tagValue" name="tagValue" value={tagValue} onChange={checkValues} />
                </div>

                <div className="box-input">
                    <button type="submit" className="send" disabled={sendDisabled}>Salvar</button>
                </div>
            </form>

            <small className="alert">* o nome da tag não pode conter caractéres especias e/ou espaço em branco.</small>
        </div>
    );
}

export default EditDOcument;