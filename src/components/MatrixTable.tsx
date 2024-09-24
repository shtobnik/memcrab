import React from 'react';
import { useMatrix } from '../context/MatrixContext';

const MatrixTable: React.FC = () => {
    const { matrix, updateCell, highlightedCells, setHighlightedCells, rowPercentages, setRowPercentages } = useMatrix();

    const calculateRowSum = (row: any[]) => row.reduce((sum, cell) => sum + cell.amount, 0);

    const calculateHalfSum = (values: number[]): number => {
        const sum = values.reduce((total, value) => total + value, 0);
        return sum / 2;
    };

    const columnPercentiles = Array.from({ length: matrix[0].length }, (_, colIndex) => {
        const columnValues = matrix.map((row) => row[colIndex].amount);
        return calculateHalfSum(columnValues);
    });

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        const cell = matrix[rowIndex][colIndex];
        updateCell(rowIndex, colIndex, cell.amount + 1);
    };

    const calculateNearestCells = (cellValue: number, x: number) => {
        const flatMatrix = matrix.flat();
        const sortedByDistance = flatMatrix
            .map((cell) => ({ ...cell, distance: Math.abs(cell.amount - cellValue) }))
            .sort((a, b) => a.distance - b.distance);
        return new Set(sortedByDistance.slice(0, x).map((cell) => cell.id));
    };

    const handleCellMouseOver = (cellAmount: number, x: number) => {
        setHighlightedCells(calculateNearestCells(cellAmount, x));
    };

    const handleRowSumHover = (rowIndex: number) => {
        const row = matrix[rowIndex];
        const total = calculateRowSum(row);
        const maxValue = Math.max(...row.map((cell) => cell.amount));

        setRowPercentages(() => {
            return matrix.map((_, idx) =>
                idx === rowIndex ? row.map((cell) => (
                    {
                        percent: (cell.amount / total) * 100,
                        maxPercent: (cell.amount / maxValue) * 100
                    }
                )) : []
            );
        });
    };

    const resetRowPercentages = () => {
        setRowPercentages([]);
    };

    const getHeatmapClass = (percent: number, rowIndex:any, colIndex:any) => {
        if (percent >= 90) return 'percent-100';
        if (percent >= 80) return 'percent-90';
        if (percent >= 70) return 'percent-80';
        if (percent >= 60) return 'percent-70';
        if (percent >= 50) return 'percent-60';
        if (percent >= 40) return 'percent-50';
        if (percent >= 30) return 'percent-40';
        if (percent >= 20) return 'percent-30';
        if (percent >= 10) return 'percent-20';
        return 'percent-10';
    };

    return (
        <table className="matrix-table">
            <thead>
            <tr>
                <th>Cell Value</th>
                {matrix[0].map((_, colIndex) => (
                    <th key={colIndex}>Cell values N = {colIndex + 1}</th>
                ))}
                <th>Sum</th>
            </tr>
            </thead>
            <tbody>
            {matrix.map((row, rowIndex) => (
                <tr key={`matrixRow-${rowIndex}`}>
                    <td>Cell Value M = {rowIndex + 1}</td>
                    {row.map((cell, colIndex) => (
                        <td
                            key={`matrix-cell-${cell.id}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            onMouseOver={() => handleCellMouseOver(cell.amount, 5)}
                            className={`
                              ${highlightedCells.has(cell.id) ? 'highlighted' : ''} 
                              ${rowPercentages[rowIndex]?.length > 0 ? 'percentage-mode' : ''}
                              ${rowPercentages[rowIndex]?.length > 0 ? getHeatmapClass(rowPercentages[rowIndex][colIndex].maxPercent, rowIndex, colIndex) : ''}
                            `}
                        >
                            <div className="percentage-text">
                                {rowPercentages[rowIndex]?.length > 0
                                    ? `${rowPercentages[rowIndex][colIndex]?.percent.toFixed(1)}%`
                                    : cell.amount}
                            </div>
                        </td>
                    ))}
                    <td
                        onMouseOver={() => handleRowSumHover(rowIndex)}
                        onMouseLeave={resetRowPercentages}
                    >
                        {calculateRowSum(row)}
                    </td>
                </tr>
            ))}
            <tr>
                <td>50th Percentile</td>
                {columnPercentiles.map((percentile, colIndex) => (
                    <td key={`matrixPercentCell-${colIndex}`}>{percentile.toFixed(1)}</td>
                ))}
                <td></td>
            </tr>
            </tbody>
        </table>
    );
};

export default MatrixTable;