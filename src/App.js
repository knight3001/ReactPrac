import React, { Component } from 'react';
//import logo from './logo.svg';
import logo from '../public/icon.png';
import './App.css';
/*import Clock from './prac/Clock';
import LoginControl from './prac/Login';
import Warning from './prac/WarningBanner';
import Reservation from './prac/Reservation';
import WaterBoiling from './prac/WaterBoiling';
import SignUpDialog from './prac/Composition';*/
//import JsxType from './prac/JsxType';
//import CustomTextInput from './prac/RefDom';
//import FilterableProductTable from './searchBox/FilterProduct';
import Game from './game/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
