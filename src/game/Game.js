import React, { Component } from 'react';

const SquareNumber = 6; //min 5

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
        if ( result[1] && result[1].indexOf(i) > -1 ){
            className = "square btn btn-primary";
        }
        else{
            className = "square btn btn-default";
        }
        className = result[0] ? className + " disabled" : className;
        return <Square className={className} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} key={i} />;
    }

    renderRow(i){
        let buf = [];
        for(let j = 0; j < SquareNumber; j++){
            buf.push(this.renderSquare(j + i * SquareNumber));
        }
        return (
            <div className="board-row" key={(i+1) * 100}>
                {buf}
            </div>
        )
    }

    render() {
        let buf = [];
        for (let i = 0; i < SquareNumber; i++){
           buf.push(this.renderRow(i));
        }

        return (
            <div>
                {buf}
            </div>
        );
    }
}

class Game extends Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(SquareNumber * SquareNumber).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            currentMove:[]
        };
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

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
            history: this.state.history.slice(0,step + 1),
            currentMove: this.state.currentMove.slice(0,step)
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const finalRow = calculateWinner(current.squares);
        const winner = finalRow[0];      
        const currentMove = this.state.currentMove; 

        const moves = history.map((step, move) => {
            let row = Math.floor(currentMove[move-1] / SquareNumber);
            let line = currentMove[move-1] % SquareNumber;
            const desc = move ?
                'Move #' + move + ' (Row:' + (row + 1).toString() + ' Line:' + (line + 1).toString() + ')' :
                'Game start';
            const className = (this.state.stepNumber === move) ? 'list-group-item active' : 'list-group-item';
            return (
                <a href="#" className={className}  key={move} onClick={() => this.jumpTo(move)}>{desc}</a>
            );
        });

        let status;
        let statusClass;
        if (winner) {
            status = 'Winner: ' + winner;
            statusClass = "alert alert-success";
        } 
        else if(current.squares.indexOf(null) < 0){
            status = 'Deadlock!';
            statusClass = "alert alert-warning";
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            statusClass = "alert alert-info";
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading"><h3 className="panel-title">Tic-Tac-Toe game</h3></div>
                <div className="panel-body">
                    <div className="game row">
                        <div className="game-board col-md-3 col-md-offset-4">
                            <Board
                                finalRow={finalRow}
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                                />
                        </div>
                        <div className="game-info col-md-2">
                            <div className={statusClass}>{status}</div>
                            <div className="list-group">{moves}</div>
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
            return [squares[a], [a,b,c,d]];
        }
    }
    return [null,null];
}

function generateWinLine(n){
    // straight 4 to win
    let lines = [];
    for (let i = 0; i < n; i++){
        for(let j = 0; j < n - 3; j++){
            lines.push([j + i * n, j + i * n + 1, j + i * n + 2, j + i * n + 3]);
        }
    }

    for (let i = 0; i < n - 3; i++){
        for(let j = 0; j < n; j++){
            lines.push([i * n + j , i * n + j + n, i * n + j + n*2, i * n + j + n*3]);
        }
    }

    for (let i = 0; i < n - 3; i++){
        for(let j = 0; j < n - 3; j++){
            lines.push([i * n + j , i * n + j + n + 1, i * n + j + (n + 1) * 2, i * n + j + (n + 1) * 3]);
        }
    }

    for (let i = 0; i < n - 3; i++){
        for(let j = 3; j < n; j++){
            lines.push([i * n + j , i * n + j + n - 1, i * n + j + (n - 1) * 2, i * n + j + (n - 1) * 3]);
        }
    }

    return lines;
}

export default Game;
