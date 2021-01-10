import React from "react";
import Square from './Square';

class Board extends React.Component {
    renderSquare(i, isHighlight = false) {
        return (
            <Square
                isHighlight={isHighlight}
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                {
                    Array(3).fill(0).map((row, i) => {
                        return (
                            <div className="board-row" key={i}>
                                {
                                    Array(3).fill(0).map((col, j) => {
                                        return (
                                            this.renderSquare(i * 3 + j, this.props.highlightCells.indexOf(i * 3 + j) !== -1)
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
}

export default Board;
