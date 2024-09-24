import React from 'react';
import { MatrixProvider } from './context/MatrixContext';
import MatrixTable from './components/MatrixTable';
import ControlPanel from './components/ControlPanel';
import './App.css';

const App: React.FC = () => {
    return (
        <MatrixProvider>
            <div className="App">
                <h1>Matrix Manager</h1>
                <ControlPanel />
                <MatrixTable />
            </div>
        </MatrixProvider>
    );
};

export default App;