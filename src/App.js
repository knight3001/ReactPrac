import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/*import Clock from './prac/Clock';
import LoginControl from './prac/Login';
import Warning from './prac/WarningBanner';
import Reservation from './prac/Reservation';
import WaterBoiling from './prac/WaterBoiling';
import SignUpDialog from './prac/Composition';*/

import FilterableProductTable from './searchBox/FilterProduct';

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
       <FilterableProductTable products={PRODUCTS} />,
      </div>
    );
  }
}

export default App;
