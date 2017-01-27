import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './Clock';
import LoginControl from './Login';
import Warning from './WarningBanner';
import Reservation from './Reservation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Warning />
        <Clock />
        <LoginControl />
        <Reservation />
      </div>
    );
  }
}

export default App;
