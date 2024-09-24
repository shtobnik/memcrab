import React, { useState } from 'react';
import { useMatrix } from '../context/MatrixContext';

const ControlPanel: React.FC = () => {
    const { setMatrix } = useMatrix();
    const [M, setM] = useState<number>(2);
    const [N, setN] = useState<number>(2);

    const generateRandomNumber = () => Math.floor(1 + Math.random() * 30);

    const generateMatrix = (M: number, N: number) => {
        let id = 1;
        return Array.from({ length: M }, () =>
            Array.from({ length: N }, () => ({
                id: id++,
                amount: generateRandomNumber()
            }))
        );
    };

    const handleGenerateMatrix = () => {
        setMatrix(generateMatrix(M, N));
    };

    return (
        <div>
            <label>
                Rows (M):
                <input type="number" value={M} onChange={(e) => setM(Number(e.target.value))} />
            </label>
            <label>
                Columns (N):
                <input type="number" value={N} onChange={(e) => setN(Number(e.target.value))} />
            </label>
            <button onClick={handleGenerateMatrix}>Generate Matrix</button>
        </div>
    );
};

export default ControlPanel;