import React, {useCallback, useEffect, useState} from 'react';
import { useMatrix } from '../context/MatrixContext';

const ControlPanel: React.FC = () => {
    const { setMatrix } = useMatrix();
    const [M, setM] = useState<number>(5);
    const [N, setN] = useState<number>(5);

    const generateRandomNumber = () => Math.floor(1 + Math.random() * 30);

    const generateMatrix = useCallback((M: number, N: number) => {
        let id = 1;
        return Array.from({ length: M }, () =>
            Array.from({ length: N }, () => ({
                id: id++,
                amount: generateRandomNumber()
            }))
        );
    }, []);

    useEffect(() => {
        let NVal = N <= 0 ? 1 : N;
        let MVal = M <= 0 ? 1 : M;

        setN(NVal);
        setM(MVal);

        setMatrix(generateMatrix(MVal, NVal));
    }, [M, N, setMatrix, generateMatrix]);

    return (
        <section className="control-panel">
            <label>
                <span className="control-title">Rows (M):</span>
                <input type="number" value={M} onChange={(e) => setM(Number(e.target.value))} />
            </label>
            <label>
                <span className="control-title">Columns (N):</span>
                <input type="number" value={N} onChange={(e) => setN(Number(e.target.value))} />
            </label>
        </section>
    );
};

export default ControlPanel;