import React, { useState, useEffect, useRef } from "react";
import Dot from "./Dot";
import Line from "./Line";
import toast from "react-hot-toast";

const DrawingArea = () => {
    const [currentDots, setCurrentDots] = useState([]);
    const [squares, setSquares] = useState([]);
    const [recentSquareIndex, setRecentSquareIndex] = useState(null);
    const containerRef = useRef(null);

    const handleClick = (e) => {
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const newDot = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        const updatedDots = [...currentDots, newDot];

        if (updatedDots.length === 4) {
            const updatedSquares = [...squares, updatedDots];
            setSquares(updatedSquares);
            setCurrentDots([]);
            setRecentSquareIndex(updatedSquares.length - 1);

            toast.success("Square completed!");

            setTimeout(() => setRecentSquareIndex(null), 1500);
        } else {
            setCurrentDots(updatedDots);
        }
    };

    const renderLines = (dots, color = "gray") => {
        const lines = [];
        for (let i = 0; i < dots.length - 1; i++) {
            lines.push(
                <Line
                    key={`line-${i}`}
                    x1={dots[i].x}
                    y1={dots[i].y}
                    x2={dots[i + 1].x}
                    y2={dots[i + 1].y}
                    stroke={color}
                />
            );
        }
        if (dots.length === 4) {
            lines.push(
                <Line
                    key="closing-line"
                    x1={dots[3].x}
                    y1={dots[3].y}
                    x2={dots[0].x}
                    y2={dots[0].y}
                    stroke={color}
                />
            );
        }
        return lines;
    };

    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                toast.error("Click inside the drawing area!");
            }
        };

        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[80vh] border-2 border-gray-400 rounded-lg overflow-hidden shadow-lg"
        >
            <svg className="w-full h-full cursor-crosshair" onClick={handleClick}>
                {/* Completed Squares */}
                {squares.map((square, index) => (
                    <g
                        key={index}
                        className={index === recentSquareIndex ? "animate-pulse" : ""}
                    >
                        {square.map((dot, i) => (
                            <Dot key={i} x={dot.x} y={dot.y} />
                        ))}
                        {renderLines(square)}
                    </g>
                ))}

                {/* In-progress Dots and Lines */}
                {currentDots.map((dot, index) => (
                    <Dot key={`current-${index}`} x={dot.x} y={dot.y} fill="orange" />
                ))}
                {renderLines(currentDots, "orange")}
            </svg>

            <button
                className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 active:scale-95 transition"
                onClick={() => {
                    setCurrentDots([]);
                    setSquares([]);
                    setRecentSquareIndex(null);
                }}
            >
                Reset All
            </button>
        </div>
    );
};

export default DrawingArea;
