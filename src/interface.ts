export type SquareValueType = 'X' | 'O' | null;
export interface History {
    squares: SquareValueType[];
    col: number | null;
    row: number | null;
}
