import React from 'react';
import ReactDOM from 'react-dom';
import './assets/fonts/fonts.css';
import './assets/index.scss';
import './assets/table.scss';
import './assets/reset.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
