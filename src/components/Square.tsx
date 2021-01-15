import React from "react";
import { SquareValueType } from "../interface";

interface SquareProps {
    value: SquareValueType;
    onClick: () => void;
    isHighlight: boolean;
}

const Square: React.FC<SquareProps> = (props) => {
    return (
        <button
            className={`square ${props.isHighlight ? 'highlight' : ''}`}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;
