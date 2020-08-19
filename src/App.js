import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Editor from './Editor';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Editor />
      </div>
    </BrowserRouter>
  );
}

export default App;
