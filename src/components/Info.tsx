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

const Info: React.FC<InfoProps> = (props) => {
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

    const _history = props.history.slice(0, props.history.length);
    const convertedHistory = _history.map((step, move) => {
        return {
            description: move ? 'Move #' + move + '(' + step.col + ', ' + step.row + ')' : 'Game start',
            move: move,
        }
    });
    const moves = props.isAsc ? convertedHistory : convertedHistory.reverse();

    return (
        <div>
            <div>{makeStatus(props.settlement, props.xIsNext)}</div>
            <div>
                <button onClick={() => props.toggleAsc()}>ASC⇆DESC</button>
            </div>
            <ol>
                {
                    moves.map((history, move) => {
                        return (
                            <li key={move}>
                                <button
                                    onClick={() => props.jumpTo(history.move)}
                                    className={props.stepNumber === history.move ? 'bold' : ''}
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
