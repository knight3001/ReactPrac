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
import { changeDifficult } from './game/AiMove';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cheatMode: false
        };
        this.modeChange = this.modeChange.bind(this);
    }

    modeChange() {
        const cheatMode = !this.state.cheatMode;
        this.setState({
            cheatMode: cheatMode
        });
        changeDifficult();
    }

    render() {
        const cheatMode = this.state.cheatMode;
        return (
            <div className="App">
                <div className="css100">Please Refresh Your Browser</div>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" onClick={() => this.modeChange()} />
                </div>
                <Game
                    cheatMode={cheatMode} />
            </div>
        );
    }
}

export default App;
