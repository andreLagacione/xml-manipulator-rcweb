import React from 'react';
import './App.scss';

import Sidebar from './components/sidebar/sidebar';
import Top from './components/top/top'

function App() {
  return (
    <div id="application">
      <div id="sidebar">
        <Sidebar />
      </div>

      <main id="content-app">
        <Top />
      </main>
    </div>
  );
}

export default App;
