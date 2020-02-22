import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './alert-modal.scss';

function AlertModel({ configModal, closeModal, confirmAction }) {

    function close() {
        closeModal();
    }

    function confirm() {
        confirmAction();
    }


    return (
        <div id="alert-modal" className={configModal.show ? '' : 'hidden'}>
            <div className="modal">
                <header className="header">
                    <strong className="title">{configModal.title}</strong>
                    <span className="btn-close" onClick={close}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </header>

                <div className="content">
                    <p className="text">{configModal.message}</p>

                    <div className="row-btns">
                        <button type="button" className={'btn confirm ' + (configModal.needConfirm ? '' : 'hidden')} onClick={confirm}>Confirmar</button>
                        <button type="button" className={'btn cancel ' + (configModal.needConfirm ? '' : 'hidden')} onClick={close}>Cancelar</button>
                        <button type="button" className={'btn cancel ok ' + (configModal.needConfirm ? 'hidden' : '')} onClick={close}>OK</button>
                    </div>
                </div>
                {/* / content */}
            </div>
            {/* / modal */}
        </div>
    );

}

export default AlertModel;