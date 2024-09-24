import {FC} from 'react';
import { MatrixProvider } from './context/MatrixContext';
import MatrixTable from './components/MatrixTable';
import ControlPanel from './components/ControlPanel';
import './App.scss';

const App: FC = () => {
    return (
        <MatrixProvider>
            <div className="matrix-app">
                <h1>Matrix Generator</h1>
                <ControlPanel />
                <MatrixTable />
            </div>
        </MatrixProvider>
    );
};

export default App;