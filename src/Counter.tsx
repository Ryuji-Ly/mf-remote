import React, { useState } from "react";
import "./Counter.css";

// Function to detect if running in host
function isRunningInHost(): boolean {
    return typeof window !== 'undefined' && !!(window as any).__SHARED_KEYCLOAK__;
}

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);
    const inHost = isRunningInHost();

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div className={inHost ? "counter-container counter-host" : "counter-container"}>
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
