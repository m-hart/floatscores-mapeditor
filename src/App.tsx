import React from 'react';
import logo from './logo.svg';
import './App.css';
import BaseMap from './components/Map/BaseMap';

function App() {
  const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const map = token ? (
    <BaseMap
      token={token}
    />
  ) : <div>Set REACT_APP_MAPBOX_ACCESS_TOKEN in .env.local</div>

  return (
    <div className="App">
      <header className="App-header">
        <div className="contents">
          {map}
        </div>
      </header>
    </div>
  );
}

export default App;
