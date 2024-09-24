import React, { createContext, useState, ReactNode, useContext } from 'react';

type Cell = {
    id: number;
    amount: number;
};

type MatrixContextType = {
    matrix: Cell[][];
    setMatrix: React.Dispatch<React.SetStateAction<Cell[][]>>;
    updateCell: (rowIndex: number, colIndex: number, value: number) => void;
};

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

type MatrixProviderProps = {
    children: ReactNode;
};

const generateRandomNumber = () => Math.floor(1 + Math.random() * 30);

const generateMatrix = (M: number, N: number): Cell[][] => {
    let id = 1;
    return Array.from({ length: M }, () =>
        Array.from({ length: N }, () => ({
            id: id++,
            amount: generateRandomNumber()
        }))
    );
};

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
    const [matrix, setMatrix] = useState<Cell[][]>(generateMatrix(2, 2));

    const updateCell = (rowIndex: number, colIndex: number, value: number) => {
        setMatrix((prevMatrix) =>
            prevMatrix.map((row, rIndex) =>
                row.map((cell, cIndex) => {
                    if (rIndex === rowIndex && cIndex === colIndex) {
                        return { ...cell, amount: value };
                    }
                    return cell;
                })
            )
        );
    };

    return (
        <MatrixContext.Provider value={{ matrix, setMatrix, updateCell }}>
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