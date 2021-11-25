import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from './components/Map/Editor';

function App() {
  const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const editor = token ? (
    <Editor
      token={token}
    />
  ) : <div>Set REACT_APP_MAPBOX_ACCESS_TOKEN in .env.local</div>

  return (
    <div className="App">
      <header className="App-header">
        {editor}
      </header>
    </div>
  );
}

export default App;
