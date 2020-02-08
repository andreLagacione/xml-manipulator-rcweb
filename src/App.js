import React from 'react';
import './App.scss';

import Sidebar from './components/sidebar/sidebar';

function App() {
  return (
    <>
      <div id="sidebar">
        <Sidebar />
      </div>

      <main id="content-app"></main>
    </>
  );
}

export default App;
