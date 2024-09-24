import {Dispatch, SetStateAction} from "react";

export type CellType = {
    id: number;
    amount: number;
};

export type CellPercentageType = {
    percent: number;
    maxPercent: number;
};

export type MatrixContextType = {
    matrix: CellType[][];
    setMatrix: Dispatch<SetStateAction<CellType[][]>>;
    updateCell: (rowIndex: number, colIndex: number, value: number) => void;
    highlightedCells: Set<number>;
    setHighlightedCells: Dispatch<SetStateAction<Set<number>>>;
    rowPercentages: CellPercentageType[][];
    setRowPercentages: Dispatch<SetStateAction<CellPercentageType[][]>>;
};