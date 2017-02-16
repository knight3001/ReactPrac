import React, { Component } from 'react';

import { getRandomName } from './RandomName';
import Player from './Player';
import '../css/fireworks.css';
import '../css/bootstrap.icon-extra.min.css';

const SquareNumber = 6; //min 5

const cursorStyle = {
    cursor: 'pointer'
}

function Square(props) {
    return (
        <button className={props.className} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends Component {
    renderSquare(i) {
        let className;
        const result = this.props.finalRow;
        if (result[1] && result[1].indexOf(i) > -1) {
            className = "square btn btn-primary";
        }
        else {
            className = "square btn btn-default";
        }
        className = result[0] ? className + " disabled" : className;
        return <Square className={className} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} key={i} />;
    }

    renderRow(i) {
        let buf = [];
        for (let j = 0; j < SquareNumber; j++) {
            buf.push(this.renderSquare(j + i * SquareNumber));
        }
        return (
            <div className="board-row" key={(i + 1) * 100}>
                {buf}
            </div>
        )
    }

    render() {
        let buf = [];
        for (let i = 0; i < SquareNumber; i++) {
            buf.push(this.renderRow(i));
        }

        return (
            <div className="game-board">
                {buf}
            </div>
        );
    }
}

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            (this.playerO.value.length > 0 ? this.playerO.value[0].toUpperCase() + this.playerO.value.slice(1) : this.playerO.value),
            (this.playerX.value.length > 0 ? this.playerX.value[0].toUpperCase() + this.playerX.value.slice(1) : this.playerX.value)
        )
    }

    render() {
        const winner = this.props.winner;
        let classX, classO, disableBit;
        if (winner === 'X') {
            classX = "form-group has-success";
            classO = "form-group";
            disableBit = "disabled";
        }
        else if (winner === 'O') {
            classX = "form-group";
            classO = "form-group has-success";
            disableBit = "disabled";
        }
        else {
            classX = "form-group";
            classO = "form-group";
            disableBit = "";
        }
        return (
            <form className="game-form form-horizontal">
                <fieldset disabled={disableBit}>
                    <div className={classX}>
                        <label htmlFor="playerX" className="col-sm-3 control-label">Player(X)</label>
                        <div className="input-group col-sm-9">
                            <span className="input-group-addon" style={(winner ? null : cursorStyle)} onClick={() => this.props.genderClick('X')} key='XG'>
                                <span className={this.props.playerX.gender===1? "icon-extra icon-boy" : "icon-extra icon-girl"} aria-hidden="true"></span>
                            </span>
                            <input type="text" className="form-control" id="playerX" placeholder="Mike" maxLength="10"
                                value={this.props.playerX.name} ref={(input) => this.playerX = input} onChange={this.handleChange} />
                            <span className="input-group-addon" style={(winner ? null : cursorStyle)} onClick={() => this.props.glyhClick('X')} key='X'>
                                <span className="icon-extra icon-playing-dices" aria-hidden="true"></span>
                            </span>
                        </div>
                    </div>
                    <div className={classO}>
                        <label htmlFor="playerO" className="col-sm-3 control-label">Player(O)</label>
                        <div className="input-group col-sm-9">
                            <span className="input-group-addon" style={(winner ? null : cursorStyle)} onClick={() => this.props.genderClick('O')} key='OG'>
                                <span className={this.props.playerO.gender===1? "icon-extra icon-boy" : "icon-extra icon-girl"} aria-hidden="true"></span>
                            </span>
                            <input type="text" className="form-control" id="playerO" placeholder="Jane" maxLength="10"
                                value={this.props.playerO.name} ref={(input) => this.playerO = input} onChange={this.handleChange} />
                            <span className="input-group-addon" style={(winner ? null : cursorStyle)} onClick={() => this.props.glyhClick('O')} key='O'>
                                <span className="icon-extra icon-playing-dices" aria-hidden="true"></span>
                            </span>
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    }
}

class Fireworks extends Component {
    render() {
        const winner = this.props.winner;
        let className;
        className = (winner ? 'pyro' : 'hidden');
        return (
            <div className={className}>
                <div className="before" />
                <div className="after" />
            </div>
        )
    }
}

class Game extends Component {
    constructor() {
        super();
        let playerInit = Player;
        playerInit = {name:'', gender: 1};
        this.state = {
            history: [{
                squares: Array(SquareNumber * SquareNumber).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            currentMove: [],
            playerX: playerInit,
            playerO: playerInit
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        const currentMove = this.state.currentMove;

        if (calculateWinner(squares)[0] || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            currentMove: currentMove.concat(i)
        });
    }

    handleUserInput(playerO, playerX) {
        this.setState({
            playerO: {
                name: playerO,
                gender: this.state.playerO.gender
            },
            playerX: {
                name: playerX,
                gender: this.state.playerX.gender
            }
        })
    }

    glyhClick(i) {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const finalRow = calculateWinner(current.squares);
        const winner = finalRow[0];

        if(!winner){
            if (i === 'X') {
                this.setState({
                    playerX: {
                        name: getRandomName(this.state.playerX.gender),
                        gender: this.state.playerX.gender
                    }
                })
            }
            else {
                this.setState({
                    playerO: {
                        name: getRandomName(this.state.playerO.gender),
                        gender: this.state.playerO.gender
                    }
                })
            }
        }
    }

    genderClick(i) {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const finalRow = calculateWinner(current.squares);
        const winner = finalRow[0];

        if(!winner){
            if (i === 'X') {
                this.setState({
                    playerX: {
                        name: this.state.playerX.name,
                        gender: (this.state.playerX.gender===1? 0 : 1)
                    }
                })
            }
            else {
                this.setState({
                    playerO: {
                        name: this.state.playerO.name,
                        gender: (this.state.playerO.gender===1? 0 : 1)
                    }
                })
            }
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
            history: this.state.history.slice(0, step + 1),
            currentMove: this.state.currentMove.slice(0, step)
        });
    }

    middleMove() {
        return (
            <a href="#" className="list-group-item disabled" key="-1">......</a>
        );
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const finalRow = calculateWinner(current.squares);
        const winner = finalRow[0];
        const currentMove = this.state.currentMove;
        const playerO = this.state.playerO;
        const playerX = this.state.playerX;

        const moves = history.map((step, move) => {
            let row = Math.floor(currentMove[move - 1] / SquareNumber);
            let line = currentMove[move - 1] % SquareNumber;
            let currentUser = (move % 2 === 0 ? playerO : playerX)
            const desc = move ?
                'Move #' + move + ' ' + currentUser.name + ' (' + (row + 1).toString() + ',' + (line + 1).toString() + ')' :
                'Game start';
            const className = (this.state.stepNumber === move) ? 'list-group-item active' : 'list-group-item';
            return (
                <a href="#" className={className} key={move} onClick={() => this.jumpTo(move)}>{desc}</a>
            );
        });

        let movesList;
        if (moves.length > 10) {
            movesList = moves.slice(0, 5);
            movesList.push(this.middleMove());
            movesList.push(moves.slice(moves.length - 5));
        }
        else {
            movesList = moves;
        }

        let status;
        let statusClass;
        if (winner) {
            status = 'Winner: ' + (winner === 'X' ? playerX.name + '(X)' : playerO.name + '(O)');
            statusClass = "alert alert-success";
        }
        else if (current.squares.indexOf(null) < 0) {
            status = 'Deadlock!';
            statusClass = "alert alert-warning";
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? playerX.name + '(X)' : playerO.name + '(O)');
            statusClass = "alert alert-info";
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading"><h3 className="panel-title">Tic-Tac-Toe game</h3></div>
                <div className="panel-body">
                    <Fireworks winner={winner} />
                    <div className="game row">
                        <div className="col-xs-12 col-sm-6 col-md-4 col-md-offset-3">
                            <UserForm
                                playerX={this.state.playerX}
                                playerO={this.state.playerO}
                                onUserInput={this.handleUserInput}
                                glyhClick={(i) => this.glyhClick(i)}
                                genderClick={(i) => this.genderClick(i)}
                                winner={winner}
                                />
                            <Board
                                finalRow={finalRow}
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                                />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-2">
                            <div className="game-info">
                                <div className={statusClass}>{status}</div>
                                <div className="list-group">{movesList}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = generateWinLine(SquareNumber);
    //console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
            return [squares[a], [a, b, c, d]];
        }
    }
    return [null, null];
}

function generateWinLine(n) {
    // straight 4 to win
    let lines = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 3; j++) {
            lines.push([j + i * n, j + i * n + 1, j + i * n + 2, j + i * n + 3]);
        }
    }

    for (let i = 0; i < n - 3; i++) {
        for (let j = 0; j < n; j++) {
            lines.push([i * n + j, i * n + j + n, i * n + j + n * 2, i * n + j + n * 3]);
        }
    }

    for (let i = 0; i < n - 3; i++) {
        for (let j = 0; j < n - 3; j++) {
            lines.push([i * n + j, i * n + j + n + 1, i * n + j + (n + 1) * 2, i * n + j + (n + 1) * 3]);
        }
    }

    for (let i = 0; i < n - 3; i++) {
        for (let j = 3; j < n; j++) {
            lines.push([i * n + j, i * n + j + n - 1, i * n + j + (n - 1) * 2, i * n + j + (n - 1) * 3]);
        }
    }

    return lines;
}

export default Game;
