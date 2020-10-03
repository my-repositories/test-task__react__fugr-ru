import React from 'react';
import Button from '@material-ui/core/Button';

import logo from './logo.svg';
import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        <Button variant="contained" color="primary">
          Learn React
        </Button>
      </a>
    </header>
  </div>
);

export default App;
