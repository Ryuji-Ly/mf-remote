import React, { useState } from "react";
import "./Counter.css";

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div className="counter-container">
            <div className="counter-display">
                <span className="counter-label">Count:</span>
                <span className="counter-value">{count}</span>
            </div>
            <button className="counter-button" onClick={increment}>
                Increment
            </button>
        </div>
    );
};

export default Counter;
