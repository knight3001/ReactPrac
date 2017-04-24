const SquareNumber = 10; //min 5

// squares: Array(SquareNumber * SquareNumber).fill(null)
export function calculateAiMove(squares) {
    let weightO = {};
    let weightX = {};
    if (squares.indexOf("O") < 0) {
        // first move for AI
        let x = squares.indexOf("X");
        if ((x + SquareNumber) < SquareNumber * SquareNumber) {
            return (x + SquareNumber);
        }
        else {
            return (x - SquareNumber);
        }
    }
    else {
        const lines = generateWinLine(SquareNumber);
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c, d, e] = lines[i];
            const scores = findChance(squares, [a, b, c, d, e]);
            if (scores["O"].length === 4 && scores["null"].length === 1) {
                return scores["null"][0];
            }
            else if (scores["X"].length === 4 && scores["null"].length === 1) {
                return scores["null"][0];
            }
            else {
                if (scores["O"].length === 3 && scores["null"].length === 2) {
                    checkItemInDict(scores["null"], weightO, 10);
                }
                else if (scores["O"].length === 2 && scores["null"].length === 3) {
                    checkItemInDict(scores["null"], weightO, 3);
                }
                else if (scores["O"].length === 1 && scores["null"].length === 4) {
                    checkItemInDict(scores["null"], weightO, 1);
                }

                if (scores["X"].length === 3 && scores["null"].length === 2) {
                    checkItemInDict(scores["null"], weightX, 10);
                }
                else if (scores["X"].length === 2 && scores["null"].length === 3) {
                    checkItemInDict(scores["null"], weightX, 3);
                }
                else if (scores["X"].length === 1 && scores["null"].length === 4) {
                    checkItemInDict(scores["null"], weightX, 1);
                }
            }
        }
        if (findMaxInDict(weightO)[0] !== 0) {
            if (findMaxInDict(weightO)[0] <= findMaxInDict(weightX)[0]) {
                return findMaxInDict(weightX)[1];
            }
            else {
                return findMaxInDict(weightO)[1];
            }
        }
        else {
            for (let i = 0; i < squares.length; i++) {
                if (squares[i] === null) {
                    return i;
                }
            }
        }
    }
}

export function generateWinLine(n) {
    // straight 5 to win
    let lines = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 4; j++) {
            lines.push([j + i * n, j + i * n + 1, j + i * n + 2, j + i * n + 3, j + i * n + 4]);
        }
    }

    for (let i = 0; i < n - 4; i++) {
        for (let j = 0; j < n; j++) {
            lines.push([i * n + j, i * n + j + n, i * n + j + n * 2, i * n + j + n * 3, i * n + j + n * 4]);
        }
    }

    for (let i = 0; i < n - 4; i++) {
        for (let j = 0; j < n - 4; j++) {
            lines.push([i * n + j, i * n + j + n + 1, i * n + j + (n + 1) * 2, i * n + j + (n + 1) * 3, i * n + j + (n + 1) * 4]);
        }
    }

    for (let i = 0; i < n - 4; i++) {
        for (let j = 4; j < n; j++) {
            lines.push([i * n + j, i * n + j + n - 1, i * n + j + (n - 1) * 2, i * n + j + (n - 1) * 3, i * n + j + (n - 1) * 4]);
        }
    }

    return lines;
}

function findChance(squares, list) {
    let result = { "O": [], "X": [], "null": [] };
    for (let i = 0; i < list.length; i++) {
        if (squares[list[i]] === "O") {
            result["O"].push(list[i]);
        }
        else if (squares[list[i]] === "X") {
            result["X"].push(list[i]);
        }
        else {
            result["null"].push(list[i]);
        }
    }
    return result;
}

function findMaxInDict(dict) {
    let maxVal = 0;
    let index = 0;
    for (let key in dict) {
        if (dict[key] > maxVal) {
            maxVal = dict[key];
            index = key;
        }
    }
    return [maxVal, index];
}

function checkItemInDict(list, dict, score) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] in dict) {
            dict[list[i]] += score;
        }
        else {
            dict[list[i]] = score;
        }
    }
}


