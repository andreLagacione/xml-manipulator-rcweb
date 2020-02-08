import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './sidebar.scss';

import { faHome } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {


    return (
        <div className="sidebar">
            <header className="top">
                <h1 className="logo">XML Manipulator</h1>
                <button className="home">
                    <FontAwesomeIcon icon={ faHome } />
                </button>
            </header>

            <nav className="menu">
                <ul>
                    <li><a href="#" title="">Item</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;