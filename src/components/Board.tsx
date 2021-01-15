import React from "react";
import Square from './Square';
import { SquareValueType } from "../interface";

interface BoardProps {
    squares: SquareValueType[];
    onClick: (i: number) => void;
    highlightCells: number[];
}

const Board: React.FC<BoardProps> = (props) => {
    const renderSquare = (i: number, isHighlight: boolean = false) => {
        return (
            <Square
                key={i}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
                isHighlight={isHighlight}
            />
        );
    }

    return (
        <div>
            {
                Array(3).fill(0).map((row, i) => {
                    return (
                        <div className="board-row" key={i}>
                            {
                                Array(3).fill(0).map((col, j) => {
                                    return (
                                        renderSquare(i * 3 + j, props.highlightCells.indexOf(i * 3 + j) !== -1)
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Board;
