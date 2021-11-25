import React from 'react';
import logo from './logo.svg';
import './App.css';
import BaseMap from './components/Map/BaseMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="contents">
          <BaseMap
            token={'token'}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
