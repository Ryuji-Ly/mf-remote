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
            <div style={{ marginBottom: "12px" }}>
                <span style={{ 
                    fontSize: "11px", 
                    padding: "4px 8px", 
                    borderRadius: "4px",
                    backgroundColor: inHost ? "#e0f2fe" : "#fef3c7",
                    color: inHost ? "#0369a1" : "#92400e",
                    fontWeight: 500
                }}>
                </span>
            </div>
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
