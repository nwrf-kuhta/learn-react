import React from "react";
import Square from './Square';
import { SquareValueType } from "../interface";

interface BoardProps {
    squares: SquareValueType[];
    onClick: (i: number) => void;
    highlightCells: number[];
}

const Board: React.FC<BoardProps> = (props) => {
    return (
        <div>
            {
                Array(3).fill(0).map((row, i) => {
                    return (
                        <div className="board-row" key={i}>
                            {
                                Array(3).fill(0).map((col, j) => {
                                    const key = i * 3 + j;
                                    return (
                                        <Square
                                            key={key}
                                            value={props.squares[key]}
                                            onClick={() => props.onClick(key)}
                                            isHighlight={props.highlightCells.indexOf(key) !== -1}
                                        />
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
