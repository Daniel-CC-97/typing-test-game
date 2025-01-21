"use client";

import { useState, useEffect } from "react";

const rows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "BACKSPACE"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  ["LSHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "?", "RSHIFT"],
  [" "],
];

const Keyboard = ({ onKeyPress, onKeyRelease }) => {
  const [activeKey, setActiveKey] = useState(null);

  const handleKeyPress = (event) => {
    let key = null;
    if (event.code === "ShiftLeft") {
      key = "LSHIFT";
    } else if (event.code === "ShiftRight") {
      key = "RSHIFT";
    } else {
      key = event.key.toUpperCase();
    }
    setActiveKey(key);
    if (key) {
      onKeyPress(key);
    }
  };

  const handleKeyRelease = (event) => {
    const key = event.key.toUpperCase();
    setActiveKey(null);
    onKeyRelease(key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
  }, [onKeyPress, onKeyRelease]);

  return (
    <div className="flex flex-col space-y-2 p-4">
      {rows.map((row, index) => (
        <div key={index} className="flex justify-center space-x-2">
          {row.map((key) => (
            <div
              key={key}
              className={`${
                activeKey === key ? "bg-blue-500 text-white" : "bg-gray-300"
              } px-4 py-2 rounded-md text-lg cursor-pointer
                ${key === " " ? "w-32" : ""}
                ${key === "BACKSPACE" ? "w-36" : ""}
                ${key === "LSHIFT" || key === "RSHIFT" ? "w-28" : ""}`}
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
