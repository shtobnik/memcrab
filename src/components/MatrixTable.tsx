import React from 'react';
import { useMatrix } from '../context/MatrixContext';

const MatrixTable: React.FC = () => {
    const { matrix, updateCell } = useMatrix();

    const calculateRowSum = (row: any[]) => row.reduce((sum, cell) => sum + cell.amount, 0);

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        const cell = matrix[rowIndex][colIndex];
        updateCell(rowIndex, colIndex, cell.amount + 1);
    };

    return (
        <table className="matrix-table">
            <thead>
            <tr>
                <th>Cell Value</th>
                {matrix[0].map((_, colIndex) => (
                    <th key={colIndex}>Column {colIndex + 1}</th>
                ))}
                <th>Sum</th>
            </tr>
            </thead>
            <tbody>
            {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    <td>Cell Value M = {rowIndex + 1}</td>
                    {row.map((cell, colIndex) => (
                        <td key={cell.id} onClick={() => handleCellClick(rowIndex, colIndex)} style={{ cursor: 'pointer' }}>
                            {cell.amount}
                        </td>
                    ))}
                    <td>{calculateRowSum(row)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default MatrixTable;