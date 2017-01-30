import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './prac/Clock';
import LoginControl from './prac/Login';
import Warning from './prac/WarningBanner';
import Reservation from './prac/Reservation';
import WaterBoiling from './prac/WaterBoiling';
import SignUpDialog from './prac/Composition';

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
        <WaterBoiling />
        <SignUpDialog />
      </div>
    );
  }
}

export default App;
