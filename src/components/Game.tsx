import React, { useState } from "react";
import Board from './Board';
import { History, SquareValueType } from '../interface';

const Game: React.FC = () => {
    const [history, setHistory] = useState<History[]>([{
        squares: Array(9).fill(null),
        col: null,
        row: null,
    }]);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [isAsc, setIsAsc] = useState<boolean>(true);

    const handleClick = (i: number) => {
        const _history = history.slice(0, stepNumber + 1);
        const current = _history[_history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(_history.concat({
            squares: squares,
            col: (i % 3) + 1,
            row: Math.floor(i / 3) + 1,
        }));
        setStepNumber(_history.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step: number) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const toggleAsc = () => {
        setIsAsc(!isAsc);
    }

    const calculateWinner = (squares: SquareValueType[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    isDraw: false,
                    winner: squares[a],
                    line: [a, b, c],
                };
            }
        }

        if (squares.filter((e) => !e).length === 0) {
            return {
                isDraw: true,
                winner: null,
                line: [],
            }
        }

        return null;
    }

    const current = history[stepNumber];
    const settlement = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
        const desc = move ? 'Move #' + move + '(' + step.col + ', ' + step.row + ')' : 'Game start';
        return (
            <li key={move}>
                <button
                    onClick={() => jumpTo(move)}
                    className={stepNumber === move ? 'bold' : ''}
                >
                    {desc}
                </button>
            </li>
        );
    });

    let status;
    if (settlement) {
        if (settlement.isDraw) {
            status = 'Draw';
        } else {
            status = 'Winner: ' + settlement.winner;
        }
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                    highlightCells={settlement ? settlement.line : []}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <div>
                    <button onClick={() => toggleAsc()}>ASC⇆DESC</button>
                </div>
                <ol>{isAsc ? moves : moves.reverse()}</ol>
            </div>
        </div>
    );
}

export default Game;
