import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './sidebar.scss';

import { faHome } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    return (
        <div className="sidebar">
            <header className="top">
                <h1 className="logo">XML Manipulator</h1>
                <Link to="/list-documents">
                    <button className="home">
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                </Link>
            </header>

            <nav className="menu">
                <ul>
                    <li><Link to="/list-documents" title="Documentos salvos">Documentos</Link></li>
                    <li><Link to="/upload-document" title="Upload de documentos">Upload</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;