import React from "react";
import Counter from "./Counter";
import "./App.css";

const App: React.FC = () => {
    return (
        <div className="app">
            <h1>Dummy Remote - Module Federation Demo</h1>
            <Counter />
        </div>
    );
};

export default App;
