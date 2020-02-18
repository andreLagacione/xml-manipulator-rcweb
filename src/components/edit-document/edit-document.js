import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './edit-document.scss';

function EditDOcument() {


    return (
        <div id="edit-document">
            <h3 className="title">Adicionar/Editar tag</h3>

            <form>
                <div className="box-input">
                    <label htmlFor="tagName">Nome da tag</label>
                    <input type="text" id="tagName" name="tagName" placeholder="ex: pontoReferencia" />
                </div>

                <div className="box-input">
                    <label htmlFor="tagValue">Valor da tag</label>
                    <input type="text" id="tagValue" name="tagValue" />
                </div>

                <div className="box-input">
                    <button type="button" className="send">Salvar</button>
                </div>
            </form>

            <small className="alert">* o nome da tag não pode conter caractéres especias e/ou espaço em branco.</small>
        </div>
    );
}

export default EditDOcument;