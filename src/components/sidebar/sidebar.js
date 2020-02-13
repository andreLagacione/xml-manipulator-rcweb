import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faUpload } from '@fortawesome/free-solid-svg-icons';

import './sidebar.scss';

function Sidebar() {
    return (
        <div className="sidebar">
            <header className="top">
                <Link to="/list-documents">
                    <button className="home">
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                </Link>
            </header>

            <nav className="menu">
                <ul>
                    <li>
                        <Link to="/list-documents" title="Documentos salvos">
                            <FontAwesomeIcon className="icon" icon={faFile} />
                            <span className="text">Documentos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/upload-document" title="Upload de documentos">
                            <FontAwesomeIcon className="icon" icon={faUpload} />
                            <span className="text">Upload</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;