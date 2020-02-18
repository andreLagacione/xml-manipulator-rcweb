import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './App.scss';

import Sidebar from './components/sidebar/sidebar';
import Top from './components/top/top';
import ListDocuments from './components/list-documents/list-documents';
import UploadDocument from './components/upload-document/upload-document';
import EditDocument from './components/edit-document/edit-document';

function App() {
  return (
    <div id="application">
      <Router>
        <div id="sidebar">
          <Sidebar />
        </div>

        <main id="content-app">
          <Top />

          <div className="center">
            <Switch>
              <Route exact path="/list-documents" component={ListDocuments} />
              <Redirect exact from="/" to="/list-documents" />
              <Route exact path="/upload-document" component={UploadDocument} />
              <Route exact path="/edit-document/:id/:isEdited" component={EditDocument} />
            </Switch>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
