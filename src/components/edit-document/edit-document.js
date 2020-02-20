import React, { Component } from 'react';
import axios from 'axios';

import './edit-document.scss';
import AlertModel from '../../commons/alert-modal/alert-modal';

class EditDocument extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tag: {
                name: '',
                value: ''
            },
            oldTagName: '',
            configModal: {
                show: false,
                title: 'Salvar alteração',
                message: 'Você precisa o nome e o valor da tag!'
            }
        };

        this.buildName = this.buildName.bind(this);
        this.getDocumentTag = this.getDocumentTag.bind(this);
        this.sendEdtitedDocument = this.sendEdtitedDocument.bind(this);
        this.getRouteParams = this.getRouteParams.bind(this);
        this.handleOnCloseModal = this.handleOnCloseModal.bind(this);

        this.getDocumentTag();
    }

    buildName = () => {
        const tagNameValue = this.tagName.value;
        this.tagName.value = tagNameValue.replace(/[`~!@#$%^&*()_|+\-=?;:¨'",.<>{}[\]\\/\s]/gi, '');


    }

    getDocumentTag = async () => {
        const _response = await axios.get(`/edited-document/${this.getRouteParams().id}`);
        const tagName = _response.data.customTagName;
        this.state.oldTagName = tagName;
        this.tagName.value = tagName;
    }

    sendEdtitedDocument = async (e) => {
        e.preventDefault();

        const tagNameValue = this.tagName.value;
        const tagValueValue = this.tagValue.value;

        console.log(tagNameValue.length, tagValueValue.length);

        if (tagNameValue.length && tagValueValue.length) {
            this.state.configModal.show = true;
            return false;
        }

        const request = {
            documentId: this.getRouteParams().id,
            oldTagName: this.state.oldTagName,
            newTagName: this.tagName.value,
            tagValue: this.tagValue.value,
            isEdited: this.getRouteParams().isEdited,
        }

        const _response = await axios.post('/edited-document/edit', request);
        console.log(_response);
    }

    getRouteParams = () => {
        const { match: { params } } = this.props;
        return params;
    }

    handleOnCloseModal = () => {
        this.state.configModal.show = false;
    }


    render() {
        return (
            <div id="edit-document">
                <h3 className="title">Adicionar/Editar tag</h3>

                <form onSubmit={this.sendEdtitedDocument}>
                    <div className="box-input">
                        <label htmlFor="tagName">Nome da tag</label>
                        <input
                            type="text"
                            id="tagNameRef"
                            name="tagName"
                            placeholder="ex: pontoReferencia"
                            ref={(tagName) => this.tagName = tagName}
                            onBlur={this.buildName}
                        />
                    </div>

                    <div className="box-input">
                        <label htmlFor="tagValue">Valor da tag</label>
                        <input
                            type="text"
                            id="tagValueRef"
                            name="tagValue"
                            ref={(tagValue) => this.tagValue = tagValue}
                            onBlur={this.buildName} />
                    </div>

                    <div className="box-input">
                        <button type="submit" className="send">Salvar</button>
                    </div>
                </form>

                <small className="alert">* o nome da tag não pode conter caractéres especias e/ou espaço em branco.</small>

                <AlertModel configModal={this.state.configModal} closeModal={this.handleOnCloseModal} confirmAction={this.handleOnCloseModal} />
            </div>
        );
    }
}

export default EditDocument;