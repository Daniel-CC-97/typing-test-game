"use client";

import { useState, useEffect } from "react";

// Define keyboard rows
const rows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "BACKSPACE"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  ["LSHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "?", "RSHIFT"],
  [" "], // Space row
];

// Function to calculate key colour
const calculateBackgroundColour = (mistakeCount) => {
  const maxMistakes = 10; // Maximum mistakes before full red
  const intensity = Math.min(mistakeCount / maxMistakes, 1); // Scale from 0 to 1
  const red = Math.floor(255 * intensity); // Red channel increases with intensity
  const white = 255 - red; // Subtract red from white for smooth gradient
  return `rgb(255, ${white}, ${white})`; // Gradual white-to-red transition
};

const Keyboard = ({ onKeyPress, onKeyRelease, stats }) => {
  const [activeKey, setActiveKey] = useState(null);

  const handleKeyPress = (event) => {
    let key = null;

    // Map shift keys and other special keys
    if (event.code === "ShiftLeft") {
      key = "LSHIFT";
    } else if (event.code === "ShiftRight") {
      key = "RSHIFT";
    } else if (event.key === " ") {
      key = " "; // Space key
    } else {
      key = event.key.toUpperCase(); // Normalise to uppercase
    }

    setActiveKey(key);
    if (key) onKeyPress(key);
  };

  const handleKeyRelease = (event) => {
    const key = event.key.toUpperCase();
    setActiveKey(null);
    onKeyRelease(key);
  };

  // Attach global key listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
  }, [onKeyPress, onKeyRelease]);

  return (
    <div className="flex flex-col space-y-2 p-2 sm:p-4">
      {rows.map((row, index) => (
        <div
          key={index}
          className="flex justify-center flex-wrap gap-1 sm:gap-2"
        >
          {row.map((key) => (
            <div
              key={key}
              style={{
                backgroundColor: calculateBackgroundColour(stats[key] || 0), // Use stats to calculate colour
              }}
              className={`${
                activeKey === key ? "ring-2 ring-blue-500" : ""
              } text-sm sm:text-lg px-2 py-1 sm:px-4 sm:py-2 rounded-md font-mono cursor-pointer
                ${key === " " ? "w-20 sm:w-32" : ""}
                ${key === "BACKSPACE" ? "w-24 sm:w-36" : ""}
                ${key === "LSHIFT" || key === "RSHIFT" ? "w-20 sm:w-28" : ""}`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
