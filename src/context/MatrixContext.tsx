import {FC, createContext, useState, ReactNode, useContext} from 'react';
import {CellType, CellPercentageType, MatrixContextType} from "../types/matrix";

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

type MatrixProviderProps = {
    children: ReactNode;
};

const generateRandomNumber = () => Math.floor(10 + Math.random() * 30);

const generateMatrix = (M: number, N: number): CellType[][] => {
    let id = 1;

    return Array.from({ length: M }, () =>
        Array.from({ length: N }, () => ({
            id: id++,
            amount: generateRandomNumber()
        }))
    );
};

export const MatrixProvider: FC<MatrixProviderProps> = ({ children }) => {
    const [matrix, setMatrix] = useState<CellType[][]>(generateMatrix(5, 5));
    const [highlightedCells, setHighlightedCells] = useState<Set<number>>(new Set());
    const [rowPercentages, setRowPercentages] = useState<CellPercentageType[][]>([]);

    const updateCell = (rowIndex: number, colIndex: number, value: number) => {
        setMatrix((prevMatrix) =>
            prevMatrix.map((row, rIndex) => {
                    return row.map((cell, cIndex) => {
                        if (rIndex === rowIndex && cIndex === colIndex) {
                            return {...cell, amount: value};
                        }
                        return cell;
                    })
                }
            )
        );
    };

    return (
        <MatrixContext.Provider
            value={{
                matrix,
                setMatrix,
                updateCell,
                highlightedCells,
                setHighlightedCells,
                rowPercentages,
                setRowPercentages
            }}
        >
            {children}
        </MatrixContext.Provider>
    );
};

export const useMatrix = () => {
    const context = useContext(MatrixContext);

    if (!context) {
        throw new Error('useMatrix must be used within a MatrixProvider');
    }

    return context;
};