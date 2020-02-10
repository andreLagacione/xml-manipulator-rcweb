import React from 'react';
import './App.scss';

import Sidebar from './components/sidebar/sidebar';
import Top from './components/top/top';
import ListDocuments from './components/list-documents/listDocuments';

function App() {
  return (
    <div id="application">
      <div id="sidebar">
        <Sidebar />
      </div>

      <main id="content-app">
        <Top />

        <div className="center">
          <ListDocuments />
        </div>
      </main>
    </div>
  );
}

export default App;
