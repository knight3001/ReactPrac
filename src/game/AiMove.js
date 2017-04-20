export function calculateAiMove(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null){
            return i;
        }
    }
}