import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function EditDOcument() {


    return (
        <>
            <h3 className="title">Adicionar/Editar tag</h3>

            <form id="edit-document">
                <div className="box-input">
                    <label htmlFor="tagName">Nome da tag</label>
                    <input type="text" id="tagName" name="tagName" />
                </div>

                <div className="box-input">
                    <label htmlFor="tagValue">Valor da tag</label>
                    <input type="text" id="tagValue" name="tagValue" />
                </div>

                <div className="box-input">
                    <button type="button" className="send">Salvar</button>
                </div>
            </form>
        </>
    );
}

export default EditDOcument;