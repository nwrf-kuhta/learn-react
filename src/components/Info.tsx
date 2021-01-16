import React from "react";
import { History, SquareValueType } from "../interface";

interface InfoProps {
    history: History[];
    stepNumber: number;
    xIsNext: boolean;
    isAsc: boolean;
    settlement: {
        isDraw: boolean,
        winner: SquareValueType,
        line: number[] | null
    } | null;
    jumpTo: (step: number) => void;
    toggleAsc: () => void;
}

const Info: React.FC<InfoProps> = ({
    history,
    stepNumber,
    xIsNext,
    isAsc,
    settlement,
    jumpTo,
    toggleAsc
}) => {
    const makeStatus = (
        settlement: {
            isDraw: boolean,
            winner: SquareValueType,
            line: number[] | null
        } | null,
        xIsNext: boolean
    ) => {
        if (!settlement) {
            return 'Next player: ' + (xIsNext ? 'X' : 'O');
        }
        if (settlement.isDraw) {
            return 'Draw';
        }
        return 'Winner: ' + settlement.winner;
    }

    const _history = history.slice(0, history.length);
    const convertedHistory = _history.map((step, move) => {
        return {
            description: move ? 'Move #' + move + '(' + step.col + ', ' + step.row + ')' : 'Game start',
            move: move,
        }
    });
    const moves = isAsc ? convertedHistory : convertedHistory.reverse();

    return (
        <div>
            <div>{makeStatus(settlement, xIsNext)}</div>
            <div>
                <button onClick={() => toggleAsc()}>ASC⇆DESC</button>
            </div>
            <ol>
                {
                    moves.map((history, move) => {
                        return (
                            <li key={move}>
                                <button
                                    onClick={() => jumpTo(history.move)}
                                    className={stepNumber === history.move ? 'bold' : ''}
                                >
                                    {history.description}
                                </button>
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    );
}

export default Info;
